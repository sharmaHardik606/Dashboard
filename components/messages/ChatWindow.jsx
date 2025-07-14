"use client";

import { useState } from "react";
import Image from "next/image";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversation }) {
  const [messages, setMessages] = useState(conversation.messages);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <p className="font-semibold text-gray-800">{conversation.user.name}</p>
        <button className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition">
          Load conversation
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
