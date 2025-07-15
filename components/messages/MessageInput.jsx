"use client";

import { useState, useRef } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import Picker from "emoji-picker-react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const input = inputRef.current;

    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newText =
      text.substring(0, start) + emoji + text.substring(end, text.length);

    setText(newText);

    // move cursor after emoji
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-300 shadow-sm"
      >
        {/* Attachment Icon */}
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
        >
          <Paperclip size={18} />
        </button>

        {/* Emoji Icon */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-gray-500  hover:text-gray-700 hover:cursor-pointer "
          >
            <Smile size={18} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-50">
              <Picker onEmojiClick={handleEmojiClick} theme="light" />
            </div>
          )}
        </div>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 text-sm outline-none px-2"
        />

        {/* Send Button */}
        <button
          type="submit"
          className= " bg-blue-600 text-white px-4 py-1.5 text-sm rounded hover:bg-blue-700 transition cursor-pointer hidden sm:block"
        >
          Send
        </button>
      </form>
    </div>
  );
}
