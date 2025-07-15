"use client";

import { useState } from "react";
import MessageList from "./MessageList";
import ChatWindow from "./ChatWindow";
import { useIsMobile } from "@/components/hooks/useIsMobile";

export default function ChatLayout() {
  const [selectedId, setSelectedId] = useState(null);
  const isMobile = useIsMobile();

  const selectedConversation = dummyConversations.find(
    (c) => c.id === selectedId
  );

  return (
    <div className="flex h-full w-full">
      
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
