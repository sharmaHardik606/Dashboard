"use client";

import Image from "next/image";
import { Input } from "../ui/input";

export default function MessageList({ conversations, selectedId, onSelect }) {
  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="pb-2">
        <Input placeholder="Search or type a command" />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
              selectedId === conv.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
            }`}
          >
            <Image
              src={conv.user.avatar}
              alt={conv.user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{conv.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
            </div>
            <p className="text-xs text-gray-400">{conv.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
