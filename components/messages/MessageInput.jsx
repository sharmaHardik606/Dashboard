"use client";

import { useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-300 shadow-sm">
      {/* Attachment Icon */}
      <button type="button" className="text-gray-500 hover:text-gray-700">
        <Paperclip size={18} />
      </button>

      {/* Emoji Icon */}
      <button type="button" className="text-gray-500 hover:text-gray-700">
        <Smile size={18} />
      </button>

      {/* Text Input */}
      <input
        type="text"
        placeholder="P/S: One more thing I need to tell you"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 text-sm outline-none px-2"
      />

      {/* Send Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
  );
}
