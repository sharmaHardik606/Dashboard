"use client";

import { useState, useEffect } from "react";
import { Ellipsis } from "lucide-react";
import MessageInput from "./MessageInput";
import { Button } from "../ui/button";
import PopupMenu from "../sharedcomponents/PopupActionButton";

export default function ChatWindow({ conversation }) {
  const [messages, setMessages] = useState(conversation.messages);

  // ✅ Sync messages when conversation changes
  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      sender: "You",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#eeeeee] px-4 py-5 rounded-t-lg">
        <p className="font-semibold text-xl text-gray-900">
          {conversation.user.name}
        </p>

        <PopupMenu
          trigger={
            <button className="p-2 hover:bg-gray-100 rounded-full hover:cursor-pointer">
              <Ellipsis size={18} />
            </button>
          }
          items={[
            { label: "Delete Messages", onClick: () => console.log("Delete clicked") },
            { label: "Blocked", onClick: () => console.log("Blocked clicked") },
          ]}
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Button
            variant="hollow"
            className="text-sm px-3 py-1 border-zinc-200"
          >
            Load Conversation
          </Button>
        </div>

        {messages.map((msg, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-xs text-gray-400">
              <span className="font-medium">{msg.sender}</span> · {msg.time}
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
