import { useEffect, useState } from "react";
import authApiInstance from "../../utils/privateApiInstance";
import { Search, Plus, MessageCircle } from "lucide-react";

const ChatHistorySidebar = ({ onSelectChat, activeChatId, onNewChat }) => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await authApiInstance.get("/chats/list/");
        if (res.status === 200) {
          setChats(res.data);
          setFilteredChats(res.data);
        }
      } catch (err) {
        console.error("Error fetching chat list:", err);
      }
    };
    fetchChats();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter((chat) =>
        chat.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.last_message?.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.last_message?.extra_data?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchQuery, chats]);

  // Create new chat - Just call parent function with null chatId
  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat(null); // null means new chat
    }
  };

  // Generate dynamic title based on chat content
  const getChatTitle = (chat) => {
    // If title exists and it's not default "New Chat"
    if (chat.title && chat.title !== "New Chat") {
      return chat.title;
    }
    
    // If it's a recipe, use recipe title
    if (chat.last_message?.message_type === "recipe") {
      return `Recipe: ${chat.last_message.extra_data?.title || "Unknown Recipe"}`;
    }
    
    // If it's a regular conversation, use first part of content
    if (chat.last_message?.content) {
      return chat.last_message.content.length > 40 ? 
        chat.last_message.content.substring(0, 40) + "..." :
        chat.last_message.content;
    }
    
    // Default fallback
    return "New Chat";
  };

  return (
    <div className="w-[320px] bg-[#FFFBEE] border-l border-gray-200 h-[767px] overflow-y-auto flex flex-col">
      {/* Header with New Chat Button */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">Chat History</h2>
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 px-3 py-2 bg-[#E4572E] text-white rounded-lg hover:bg-[#d44a26] transition-colors"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4572E] focus:border-transparent"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {filteredChats.length === 0 && searchQuery ? (
            <li className="p-3 text-center text-gray-500">
              No chats found for "{searchQuery}"
            </li>
          ) : (
            filteredChats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className={`p-3 rounded-lg cursor-pointer hover:bg-[#FCF1D6] transition-colors ${
                  activeChatId === chat.id ? "bg-[#FCF1D6] border-l-4 border-[#E4572E]" : ""
                }`}
              >
                <div className="flex items-start gap-2">
                  <MessageCircle size={16} className="text-[#E4572E] mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">
                      {getChatTitle(chat)}
                    </h3>
                    
                    {/* Recipe message preview */}
                    {chat.last_message?.message_type === "recipe" && (
                      <p className="text-sm text-gray-700 italic mt-1 line-clamp-2">
                        {chat.last_message.extra_data?.overview?.substring(0, 50) + "..." || "Recipe details"}
                      </p>
                    )}
                    
                    {/* Regular conversation preview */}
                    {chat.last_message?.message_type === "conversation" && (
                      <p className="text-sm text-gray-700 italic mt-1 line-clamp-2">
                        {chat.last_message.content}
                      </p>
                    )}
                    
                    {/* Error message preview */}
                    {chat.last_message?.message_type === "error" && (
                      <p className="text-sm text-red-500 italic mt-1 line-clamp-2">
                        Error occurred
                      </p>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(chat.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatHistorySidebar;