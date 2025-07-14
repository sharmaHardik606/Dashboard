"use client";

import { useState } from "react";
import MessageList from "@/components/messages/MessageList";
import ChatWindow from "@/components/messages/ChatWindow";
import { conversations } from "@/constants/messages/messagesData";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const selectedConversation = conversations.find(c => c.id === selectedId);

  return (
    <div className="flex h-[calc(100vh-64px)] px-4 gap-4 pt-4">

      <ContainerCard className="flex gap-4 w-full">
        
      <div className="w-1/3">
        <MessageList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 rounded-lg shadow-sm">
        <ChatWindow conversation={selectedConversation} />
      </div>
      </ContainerCard>
    </div>
  );
}
