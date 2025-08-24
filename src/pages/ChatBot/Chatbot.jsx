import { useState } from "react";
import aiLogo from "../../assets/images/ai-logo.png";
import cancel from "../../assets/images/cancel-circle.png";
import send from "../../assets/images/send.png";
import bot from "../../assets/images/bot.png";
import user from "../../assets/images/user.png";
import lock from "../../assets/images/lock.png";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! What's in your kitchen today?",
      timestamp: "12:30",
    },
    {
      id: 2,
      type: "user",
      text: "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
      timestamp: "12:31",
    },
    {
      id: 3,
      type: "bot",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      timestamp: "12:32",
    },
    {
      id: 4,
      type: "user",
      text: "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
      timestamp: "12:33",
    },
  ]);

  const [freeLimit, setFreeLimit] = useState(5); // free limit
  const [showModal, setShowModal] = useState(false); // modal control

  const handleSendMessage = () => {
    if (freeLimit <= 0) {
      setShowModal(true); // limit cross হলে modal দেখাও
      return;
    }

    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setFreeLimit(freeLimit - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSubscription = () => {
    navigate("/subscription");
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#E4572E] text-white py-5 px-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={aiLogo} alt="" />
          <div>
            <h3 className="font-bold text-2xl">AI Chief</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#87FF70] rounded-full"></div>
              <p className="text-[#87FF70] text-xs">Online</p>
            </div>
          </div>
        </div>
        <button className="p-1">
          <img src={cancel} alt="" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="min-h-screen overflow-y-auto p-4 space-y-4 bg-[#FFFBEE]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar always left & bottom aligned */}
            <div className="w-10 h-10 flex items-center justify-center mr-4 self-end">
              <img src={msg.type === "bot" ? bot : user} alt="" />
            </div>

            {/* Message Bubble with Triangle */}
            <div className="relative max-w-xs">
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  msg.type === "bot"
                    ? "bg-[#FC8A07] text-white rounded-xl"
                    : "bg-[#F8EFE6] text-[#2E2E2E] rounded-xl border"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>

                {/* Timestamp */}
                <div
                  className={`flex items-center text-xs justify-end mt-1 space-x-1 ${
                    msg.type === "user" ? "text-gray-400" : "text-white"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {/* Triangle Tail → both user & bot now on left */}
              <div
                className={`absolute left-[-12px] bottom-2 w-0 h-0 
            border-t-[8px] border-t-transparent 
            ${
              msg.type === "bot"
                ? "border-r-[12px] shadow-xl border-r-[#FC8A07]"
                : "border-r-[12px] shadow-xl border-r-[#F8EFE6]"
            }
            border-b-[10px] border-b-transparent`}
              ></div>
            </div>
          </div>
        ))}

        <div className={`${isOpen ? "block" : "hidden"} flex justify-center items-center`}>
          
          <div className=" w-[648px] p-3 border border-[#E4572E]/27 rounded-lg bg-white flex flex-col items-center space-y-3 mb-3">
            <p className="text-black text-base">You’ve hit the 5 Free recipe plan limit for ChiefGPT</p>
            <button onClick={handleSubscription} className="py-3 px-6 text-lg font-medium text-[#2E2E2E] border border-[#BFABA5] bg-[#FEFBFA] rounded-full">Upgrade Your Plan</button>
          </div>
        </div>
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
            className="w-11 h-11 flex items-center justify-center absolute right-[330px] "
          >
            <img src={send} alt="" />
          </button>
        </div>
      </div>

      {/* 🚨 Modal */}
      {showModal && (
        <div
          onClick={() => {
            setIsOpen(true);
            setShowModal(false); 
          }}
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-[#F5F5F5] bg-opacity-20 backdrop-blur-sm"
        >
          <div className="relative m-4 p-6 w-2/3 h-[600px] flex flex-col items-center justify-center rounded-lg bg-[#BCBBBB]/50 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center space-y-2 mb-14">
              <img src={lock} alt="" />
              <p className="font-semibold text-xl text-[#2E2E2E]">
                Your subscription has expired.
              </p>
              <p className="font-medium text-sm text-[#2E2E2E]">
                Subscribe now to get unlimited access to AI-powered recipes and
                calorie tracking
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <p className="text-sm text-[#2E2E2E]">
                No spam, only tasty recipes delivered to your inbox
              </p>
              <button
                onClick={handleSubscription}
                className="text-white w-[544px] h-14 bg-[#E4572E] rounded-full"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
