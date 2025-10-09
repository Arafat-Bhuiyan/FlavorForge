import { useState, useEffect } from "react";
import aiLogo from "../../assets/images/ai-logo.png";
import cancel from "../../assets/images/cancel-circle.png";
import send from "../../assets/images/send.png";
import bot from "../../assets/images/bot.png";
import user from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import authApiInstance from "../../utils/privateApiInstance";
import ChatHistorySidebar from "./ChatHistory";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! What's in your kitchen today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [showSidebar, setShowSidebar] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [showModal, setShowModal] = useState(false); // modal control
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); // Subscription status

  // Fetch user subscription status from API
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await authApiInstance.get("/profile/");
        if (res.status === 200) {
          const { is_subs } = res.data;
          setIsSubscribed(is_subs); // Set subscription status
          if (!is_subs) {
            setShowModal(true); // Show modal if user is not subscribed
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    checkSubscription();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // user message যোগ করা
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    try {
      setIsBotTyping(true);
      const res = await authApiInstance.post("/chats/send_message/", {
        message: newMessage.text,
        chat_id: chatId,
      });

      if (res.status === 200) {
        const data = res.data;

        // Chat ID update করো যদি নতুন chat তৈরি হয়
        if (data.chat_id) {
          setChatId(data.chat_id);
        }

        // 🔥 Plan Update Error Handle করো
        if (data.error_type === "plan_update_message") {
          handleOpenModal(); // modal দেখাও
          return;
        }

        // Response handle করো
        if (data.response_type === "recipe" && data.recipe_details) {
          const recipeMessage = {
            id: Date.now(),
            type: "recipe",
            recipe: data.recipe_details,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, recipeMessage]);
        } else if (data.response_type === "error" && data.error_details) {
          const errorMessage = {
            id: Date.now(),
            type: "error",
            error: data.error_details,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, errorMessage]);
        } else if (data.conversation_details?.response) {
          const botMessage = {
            id: Date.now(),
            type: "bot",
            text: data.conversation_details.response,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsBotTyping(false);
    }
  };

  // New Chat handle করার জন্য
  const handleNewChat = (newChatId) => {
    setChatId(newChatId); // null for new chat
    setMessages([
      {
        id: 1,
        type: "bot",
        text: "Hi! What's in your kitchen today?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleSelectChat = (chat) => {
    setChatId(chat.id);

    const loadedMessages = [];

    // Initial bot message always add করো
    loadedMessages.push({
      id: 1,
      type: "bot",
      text: "Hi! What's in your kitchen today?",
      timestamp: "12:30",
    });

    // chat.messages থেকে সব message add করো
    if (chat.messages && chat.messages.length > 0) {
      chat.messages.forEach((msg) => {
        if (msg.message_type === "recipe") {
          loadedMessages.push({
            id: msg.id,
            type: "recipe",
            recipe: msg.extra_data,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        } else if (msg.message_type === "error") {
          loadedMessages.push({
            id: msg.id,
            type: "error",
            error: msg.extra_data,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        } else {
          loadedMessages.push({
            id: msg.id,
            type: msg.sender === "user" ? "user" : "bot",
            text: msg.content,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }
      });
    }

    setMessages(loadedMessages);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // শুধু modal খোলার জন্য
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  // আসল subscription page এ যাওয়ার জন্য
  const handleGoToSubscription = () => {
    navigate("/subscription");
  };

  return (
    <div className="w-full relative">
      {/* Header */}
      <div className="bg-[#E4572E] text-white py-5 px-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={aiLogo} alt="" />
          <div>
            <h3 className="font-bold text-2xl">Chef</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#87FF70] rounded-full"></div>
              <p className="text-[#87FF70] text-xs">Online</p>
            </div>
          </div>
        </div>
        <button className="p-1" onClick={() => setShowSidebar((prev) => !prev)}>
          <img src={cancel} alt="" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-[590px] overflow-y-auto p-4 space-y-4 bg-[#FFFBEE]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 flex items-center justify-center mr-4 self-end">
              <img src={msg.type === "user" ? user : bot} alt="" />
            </div>

            {/* === Normal Conversation === */}
            {msg.type === "bot" || msg.type === "user" ? (
              <div className="relative max-w-xs">
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    msg.type === "bot"
                      ? "bg-[#FC8A07] text-white rounded-xl"
                      : "bg-[#F8EFE6] text-[#2E2E2E] rounded-xl border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div
                    className={`flex items-center text-xs justify-end mt-1 space-x-1 ${
                      msg.type === "user" ? "text-gray-400" : "text-white"
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* === Recipe UI === */}
            {msg.type === "recipe" && (
              <div className="relative max-w-lg">
                <div className="px-5 py-4 bg-white border rounded-2xl shadow-md text-[#2E2E2E]">
                  <h3 className="text-xl font-bold text-[#E4572E] mb-2">
                    {msg.recipe.title}
                  </h3>
                  <p className="text-sm italic text-gray-600 mb-3">
                    ⭐ {msg.recipe.rating} | {msg.timestamp}
                  </p>
                  <p className="text-base mb-4">{msg.recipe.overview}</p>

                  <h4 className="font-semibold text-lg mb-2">Ingredients:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                    {msg.recipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-lg mb-2">Instructions:</h4>
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {msg.recipe.instructions}
                  </p>
                </div>
              </div>
            )}

            {/* === Error UI === */}
            {msg.type === "error" && (
              <div className="relative max-w-lg">
                <div className="px-5 py-4 bg-[#FFEDED] border border-[#E4572E] rounded-2xl shadow-md text-[#2E2E2E]">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#E4572E] mb-2">
                    {msg.error.title}
                  </h3>

                  {/* Overview */}
                  <p className="text-base mb-4">{msg.error.overview}</p>

                  {/* Bold header for items */}
                  {msg.error["ingrediants items"]?.length > 0 && (
                    <>
                      <h4 className="font-semibold text-lg mb-2">
                        Invalid Ingredients:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm mb-2">
                        {msg.error["ingrediants items"].map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Timestamp */}
                  <div className="flex items-center text-xs justify-end mt-1 text-[#E4572E]">
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* === Bot Typing Indicator === */}
        {isBotTyping && (
          <div className="flex items-start justify-start">
            {/* Bot Avatar */}
            <div className="w-10 h-10 flex items-center justify-center mr-4">
              <img src={bot} alt="bot" />
            </div>

            {/* Typing bubble */}
            <div className="px-4 py-2 bg-[#FC8A07] text-white rounded-2xl shadow-sm text-sm">
              Chef is thinking...
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
            className="w-11 h-11 flex items-center justify-center absolute right-[20px] "
          >
            <img src={send} alt="" />
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      {showSidebar && (
        <div className="absolute top-0 left-[-309px]">
          <ChatHistorySidebar
            activeChatId={chatId}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
          />
        </div>
      )}

      {/* Free Limit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-[#F5F5F5] bg-opacity-20 backdrop-blur-sm">
          <div className="w-[648px] p-3 border border-[#E4572E]/27 rounded-lg bg-white flex flex-col items-center space-y-3">
            <p className="text-black text-base">
              You’ve hit the Free recipe plan limit for FlavorForge
            </p>
            <button
              onClick={handleGoToSubscription}
              className="py-3 px-6 text-lg font-medium text-[#2E2E2E] border border-[#BFABA5] bg-[#FEFBFA] rounded-full"
            >
              Upgrade Your Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
