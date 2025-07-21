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

  const showList = !isMobile || (isMobile && !selectedId);
  const showChat = !isMobile || (isMobile && selectedId);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:px-4 md:gap-4 md:pt-4 w-full min-h-0">
      {/* Desktop layout: wrap both in ContainerCard */}
      <div className="hidden md:flex w-full">
        <ContainerCard className="flex gap-4 w-full">
          {/* Chat List */}
          <div className="w-1/3">
            <MessageList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Chat Window */}
          <div className="flex-1 p-0">
            {selectedConversation ? (
              <ChatWindow
                conversation={selectedConversation}
                onBack={() => setSelectedId(null)}
              />
            ) : (
              <div className="flex items-center justify-center w-full text-gray-400">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </ContainerCard>
      </div>

      {/* Mobile layout: either list OR chat full screen */}
      <div className="flex flex-col w-full md:hidden">
        {showList && (
          <ContainerCard className="w-full">
            <MessageList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </ContainerCard>
        )}

        {showChat && selectedConversation && (
          <ChatWindow
            conversation={selectedConversation}
            onBack={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}


