"use client"

import { useState } from "react"
import aiLogo from "../../assets/images/ai-logo.png"
import cancel from "../../assets/images/cancel-circle.png"
import send from "../../assets/images/send.png"
import bot from "../../assets/images/bot.png"
import user from "../../assets/images/user.png"
import lock from "../../assets/images/lock.png"
import { useNavigate } from "react-router-dom"
import authApiInstance from "../../utils/privateApiInstance"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false) // Modal state
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! What's in your kitchen today?",
      timestamp: "12:30",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [chatId, setChatId] = useState(null) // Store chat_id here

  // Function to handle message sending
  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage = createMessage("user", message)
      setMessages((prevMessages) => [...prevMessages, userMessage])
      setMessage("") // Clear input field

      setIsLoading(true) // Start loading for bot response

      try {
        let response
        if (!chatId) {
          response = await sendMessageToApi(message)
          const newChatId = response.data.chat_id
          setChatId(newChatId) // Store the new chat_id for future use
        } else {
          response = await sendMessageToApi(message, chatId)
        }

        handleBotResponse(response)
      } catch (error) {
        console.error("Error sending message:", error)
      } finally {
        setIsLoading(false) // Stop loading after receiving bot response
      }
    }
  }

  // Function to handle message sending to the API
  const sendMessageToApi = async (message, chatId = null) => {
    return await authApiInstance.post("/chats/send_message/", {
      message: message,
      chat_id: chatId,
    })
  }

  // Function to handle bot response
  const handleBotResponse = (response) => {
    const responseType = response.data?.response_type

    if (responseType === "conversation") {
      const botReply = response.data?.conversation_details?.response
      if (botReply) {
        addBotMessage(botReply)
      } else {
        console.error("Bot reply not found in API response")
      }
    } else if (responseType === "recipe") {
      const recipe = response.data?.recipe_details
      if (recipe) {
        const recipeMessage = formatRecipeMessage(recipe)
        setMessages((prevMessages) => [...prevMessages, recipeMessage])
      }
    } else if (responseType === "error") {
      const errorMessage = formatErrorMessage(response.data?.error_details)
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } else {
      console.error("Unknown response type")
    }
  }

  // Function to format recipe message
  const formatRecipeMessage = (recipe) => {
    return {
      id: messages.length + 2,
      type: "bot",
      text: `${recipe.title}\n\n${recipe.overview}\n\nRating: ${recipe.rating}\n\nIngredients:\n${recipe.ingredients.join(
        "\n",
      )}\n\nInstructions:\n${recipe.instructions}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  // Function to format error message
  const formatErrorMessage = (errorDetails) => {
    return {
      id: messages.length + 2,
      type: "bot",
      text: `${errorDetails?.title}: ${errorDetails?.overview}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  // Function to add bot message to the messages list
  const addBotMessage = (text) => {
    const botMessage = createMessage("bot", text)
    setMessages((prevMessages) => [...prevMessages, botMessage])
  }

  // Helper function to create message object
  const createMessage = (type, text) => {
    return {
      id: messages.length + 1,
      type: type,
      text: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  // Function to handle key press (for sending messages on "Enter")
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Handle subscription
  const handleSubscription = () => {
    navigate("/subscription")
  }

  const renderMessageContent = (msg) => {
    // Check if this is a recipe message by looking for recipe structure
    if (msg.text.includes("Rating:") && msg.text.includes("Ingredients:") && msg.text.includes("Instructions:")) {
      const lines = msg.text.split("\n")
      const title = lines[0]
      const overview = lines[2]
      const ratingLine = lines[4]
      const rating = ratingLine.replace("Rating: ", "")

      // Extract ingredients (between "Ingredients:" and "Instructions:")
      const ingredientsStartIndex = lines.findIndex((line) => line === "Ingredients:")
      const instructionsStartIndex = lines.findIndex((line) => line === "Instructions:")
      const ingredients = lines.slice(ingredientsStartIndex + 1, instructionsStartIndex)
      const instructions = lines.slice(instructionsStartIndex + 1).join("\n")

      return (
        <div className="bg-card rounded-lg p-4 shadow-md border border-border max-w-md">
          <h3 className="font-bold text-lg text-card-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{overview}</p>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-primary font-semibold">Rating:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < Number.parseFloat(rating) ? "text-primary" : "text-muted"}`}>
                  ★
                </span>
              ))}
              <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-card-foreground mb-2">Ingredients:</h4>
            <ul className="space-y-1">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm text-card-foreground flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-2">Instructions:</h4>
            <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-line">{instructions}</p>
          </div>
        </div>
      )
    }

    // Check if this is an error message by looking for error structure
    if (
      msg.text.includes(":") &&
      (msg.text.toLowerCase().includes("error") ||
        msg.text.toLowerCase().includes("invalid") ||
        msg.text.toLowerCase().includes("sorry"))
    ) {
      const [title, ...descriptionParts] = msg.text.split(":")
      const description = descriptionParts.join(":").trim()

      return (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-md">
          <div className="flex items-start gap-2">
            <span className="text-destructive text-lg">⚠️</span>
            <div>
              <h4 className="font-semibold text-destructive mb-1">{title}</h4>
              <p className="text-sm text-destructive/80">{description}</p>
            </div>
          </div>
        </div>
      )
    }

    // Regular conversation message
    return <p className="text-sm leading-relaxed">{msg.text}</p>
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#E4572E] text-white py-5 px-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={aiLogo || "/placeholder.svg"} alt="AI Logo" />
          <div>
            <h3 className="font-bold text-2xl">AI Chief</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#87FF70] rounded-full"></div>
              <p className="text-[#87FF70] text-xs">Online</p>
            </div>
          </div>
        </div>
        <button className="p-1">
          <img src={cancel || "/placeholder.svg"} alt="Cancel Icon" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="min-h-screen overflow-y-auto p-4 space-y-4 bg-[#FFFBEE]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className="w-10 h-10 flex items-center justify-center mr-4 self-end">
              <img src={msg.type === "bot" ? bot : user} alt="Avatar" />
            </div>
            <div className="relative max-w-xs">
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  msg.type === "bot"
                    ? "bg-[#FC8A07] text-white rounded-xl"
                    : "bg-[#F8EFE6] text-[#2E2E2E] rounded-xl border"
                }`}
              >
                {renderMessageContent(msg)}
                <div
                  className={`flex items-center text-xs justify-end mt-1 space-x-1 ${
                    msg.type === "user" ? "text-gray-400" : "text-white"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                </div>
              </div>
              <div
                className={`absolute left-[-12px] bottom-2 w-0 h-0 border-t-[8px] border-t-transparent ${
                  msg.type === "bot"
                    ? "border-r-[12px] shadow-xl border-r-[#FC8A07]"
                    : "border-r-[12px] shadow-xl border-r-[#F8EFE6]"
                } border-b-[10px] border-b-transparent`}
              ></div>
            </div>
          </div>
        ))}

        {/* Show loading indicator when bot is replying */}
        {isLoading && (
          <div className="flex justify-start items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center mr-4 self-end">
              <img src={bot || "/placeholder.svg"} alt="Bot Icon" />
            </div>
            <div className="relative max-w-xs">
              <div className="px-4 py-3 rounded-2xl shadow-sm bg-[#FC8A07] text-white">
                <p className="text-sm leading-relaxed">Bot is typing...</p>
                <div className="flex items-center justify-end mt-1 space-x-1 text-white text-xs">
                  <span>...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white shadow-xl rounded-b-lg">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 bg-[#FFFBEE] rounded-2xl border-none outline-none text-lg text-[#444444] placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="w-11 h-11 flex items-center justify-center absolute right-[330px]"
          >
            <img src={send || "/placeholder.svg"} alt="Send Icon" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          onClick={() => {
            setIsOpen(true)
            setShowModal(false)
          }}
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-[#F5F5F5] bg-opacity-20 backdrop-blur-sm"
        >
          <div className="relative m-4 p-6 w-2/3 h-[600px] flex flex-col items-center justify-center rounded-lg bg-[#BCBBBB]/50 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center space-y-2 mb-14">
              <img src={lock || "/placeholder.svg"} alt="Lock Icon" />
              <p className="font-semibold text-xl text-[#2E2E2E]">Your subscription has expired.</p>
              <p className="font-medium text-sm text-[#2E2E2E]">
                Subscribe now to get unlimited access to AI-powered recipes and calorie tracking.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <p className="text-sm text-[#2E2E2E]">No spam, only tasty recipes delivered to your inbox</p>
              <button onClick={handleSubscription} className="text-white w-[544px] h-14 bg-[#E4572E] rounded-full">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
