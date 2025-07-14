"use client";

import { useState } from "react";
import MessageList from "./MessageList";
import ChatWindow from "./ChatWindow";
import { useIsMobile } from "@/components/hooks/useIsMobile";

// Dummy conversations (replace with real data later)
const dummyConversations = [
  {
    id: "1",
    user: { name: "John Doe", avatar: "/avatars/1.png" },
    messages: [
      { sender: "John", time: "10:20 AM", text: "Hey there!" },
      { sender: "You", time: "10:22 AM", text: "Hey! What's up?" },
    ],
  },
  {
    id: "2",
    user: { name: "Alice Smith", avatar: "/avatars/2.png" },
    messages: [
      { sender: "Alice", time: "11:05 AM", text: "Are we meeting today?" },
      { sender: "You", time: "11:08 AM", text: "Yes, at 3 PM." },
    ],
  },
];

export default function ChatLayout() {
  const [selectedId, setSelectedId] = useState(null);
  const isMobile = useIsMobile();

  const selectedConversation = dummyConversations.find(
    (c) => c.id === selectedId
  );

  return (
    <div className="flex h-full">
      {/* Sidebar: Message List */}
      <div
        className={`w-full md:w-1/3 border-r ${
          isMobile && selectedId ? "hidden" : "block"
        }`}
      >
        <MessageList
          conversations={dummyConversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Main Chat Window */}
      <div
        className={`w-full md:flex-1 ${
          isMobile && !selectedId ? "hidden" : "block"
        }`}
      >
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            onBack={() => setSelectedId(null)}
          />
        ) : (
          <div className="hidden md:flex items-center justify-center w-full text-gray-400">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
