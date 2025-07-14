"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";

export default function MessageList({ conversations, selectedId, onSelect }) {
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="pb-2">
        <Input
          placeholder="Search or type a command"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`flex items-center gap-4 px-1 py-3 cursor-pointer hover:bg-gray-100 hover:rounded-xl my-1 ${
              selectedId === conv.id
                ? "bg-blue-50 border-l-4 border-blue-600 rounded-xl"
                : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
              <Image
                src={conv.user.avatar}
                alt={conv.user.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Name + Last Message */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{conv.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
            </div>

            {/* Date + Unread Dot */}
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-400">{conv.date}</p>
              {conv.unread && (
                <span className="h-2 w-2 bg-blue-500 rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



