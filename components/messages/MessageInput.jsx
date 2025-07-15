"use client";

import { useEffect, useRef, useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import { EmojiButton } from "@joeattardi/emoji-button";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef(null);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  useEffect(() => {
    if (!emojiButtonRef.current) return;

    const picker = new EmojiButton({
      position: "top-start", // default for desktop
      theme: "light",
      autoHide: false,
      zIndex: 9999,
      emojiSize: "1.2em",
    });

    picker.on("emoji", (selection) => {
  const emoji = selection.emoji;
  const input = inputRef.current;

  if (!input) return;

  const start = input.selectionStart;
  const end = input.selectionEnd;

  // 👇 Use input.value instead of state variable `text`
  const currentValue = input.value;

  const newText =
    currentValue.substring(0, start) + emoji + currentValue.substring(end);

  setText(newText);

  // Move cursor after inserted emoji
  setTimeout(() => {
    input.focus();
    input.setSelectionRange(start + emoji.length, start + emoji.length);
  }, 0);
});


    pickerRef.current = picker;
  }, [text]);

  const toggleEmojiPicker = () => {
    if (!pickerRef.current || !emojiButtonRef.current) return;

    const isMobile = window.innerWidth < 640; // Tailwind sm: < 640px
    pickerRef.current.togglePicker(emojiButtonRef.current);

    if (isMobile) {
      pickerRef.current.options.position = "bottom-start";
    } else {
      pickerRef.current.options.position = "top-start";
    }
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
        <button
          type="button"
          ref={emojiButtonRef}
          onClick={toggleEmojiPicker}
          className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
        >
          <Smile size={18} />
        </button>

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
          className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded hover:bg-blue-700 transition cursor-pointer hidden sm:block"
        >
          Send
        </button>
      </form>
    </div>
  );
}
