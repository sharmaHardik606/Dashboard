"use client";

import { useState } from "react";
import MessageList from "@/components/messages/MessageList";
import ChatWindow from "@/components/messages/ChatWindow";
import { conversations } from "@/constants/messages/messagesData";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import { useIsMobile } from "@/components/messages/hooks/useIsMobile";

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedConversation = conversations.find((c) => c.id === selectedId);
  const isMobile = useIsMobile();

  return (
    <div className="flex h-[calc(100vh-64px)] px-4 gap-4 pt-4">
      <ContainerCard className="flex gap-4 w-full">
        {/* Chat List */}
        <div
          className={`w-full md:w-1/3 ${
            isMobile && selectedId ? "hidden" : "block"
          }`}
        >
          <MessageList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* Chat Window */}
        <div
          className={`w-full md:flex-1 ${
            isMobile && !selectedId ? "hidden" : "block"
          }`}
        >
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              onBack={() => setSelectedId(null)} // 👈 important for mobile back
            />
          ) : (
            <div className="hidden md:flex items-center justify-center w-full text-gray-400">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </ContainerCard>
    </div>
  );
}

