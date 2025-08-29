import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const chatbotInfo = `\nHi! I'm your AI Cyber Assistant. Ask me about Dinesh's projects, skills, or technologies used in this portfolio!\n`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: chatbotInfo }]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setInput("");
    try {
      const res = await axios.post("/api/chat", { message: input });
      const data = res.data as { reply?: string; action?: string; target?: string };
      if (data.action === 'navigate' && data.target) {
        setMessages((msgs) => [...msgs, { from: "bot", text: data.reply || "Navigating..." }]);
        // Navigate by updating the hash, respecting base URL
        const base = import.meta.env.BASE_URL || '/';
        const url = new URL(window.location.href);
        url.pathname = base.replace(/\/$/, '/');
        url.hash = data.target;
        window.location.href = url.toString();
        return;
      }
      setMessages((msgs) => [...msgs, { from: "bot", text: data.reply || "" }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, I couldn't reach the AI right now." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Hexagon Toggle Button */}
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="relative w-16 h-16 flex items-center justify-center animate-float group focus:outline-none"
          style={{ background: "none", border: "none" }}
          aria-label="Open chat assistant"
        >
          {/* Hexagon SVG with neon/glassmorphism */}
          <svg viewBox="0 0 100 100" className="absolute w-full h-full">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              className="fill-[#1A1A1A] glassmorphism stroke-[#00FFB2] stroke-2 shadow-neon"
            />
            <polygon
              points="50,12 88,30 88,70 50,88 12,70 12,30"
              className="fill-transparent stroke-[#FF3366] stroke-1 animate-glow"
            />
          </svg>
          {/* Chat Icon (SVG) */}
          <span className="relative z-10">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M6 28V8a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H12l-6 6z" fill="#00FFB2" stroke="#FF3366" strokeWidth="2"/>
              <circle cx="14" cy="16" r="2" fill="#1A1A1A" />
              <circle cx="18" cy="16" r="2" fill="#1A1A1A" />
              <circle cx="22" cy="16" r="2" fill="#1A1A1A" />
            </svg>
          </span>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-80 h-96 p-1 rounded-2xl shadow-neon border-2 border-[#00FFB2] glassmorphism animate-glow"
            style={{ background: "rgba(26,26,26,0.95)" }}
          >
            <div className="flex flex-col h-full rounded-2xl p-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#00FFB2] font-bold tracking-widest animate-glow">CYBER AI BOT</span>
                <button onClick={() => setOpen(false)} className="text-[#FF3366] hover:text-[#00FFB2] font-bold text-xl transition animate-glow">✕</button>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-xl max-w-[80%] shadow-neon ${
                      msg.from === "bot"
                        ? "bg-[#101c1c]/80 text-[#00FFB2] self-start border-l-4 border-[#00FFB2]"
                        : "bg-[#1A1A1A]/80 text-[#FF3366] self-end border-r-4 border-[#FF3366]"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              {/* Input */}
              <form
                className="mt-2 flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  className="flex-1 bg-[#101c1c]/80 border border-[#00FFB2] rounded-l-xl px-3 py-2 text-[#00FFB2] focus:outline-none placeholder:text-[#00FFB2]/60"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                />
                <button
                  type="submit"
                  className="bg-[#00FFB2] text-[#1A1A1A] px-4 rounded-r-xl font-bold hover:bg-[#FF3366] hover:text-[#fff] transition shadow-neon"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 