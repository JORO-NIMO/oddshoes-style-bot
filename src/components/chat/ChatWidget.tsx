import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestedPrompts from "./SuggestedPrompts";
import { streamChat, type ChatMessage } from "@/lib/chat-stream";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "👋 Welcome! I'm your AI co-pilot. Ask me anything about startups, tech, or creative ideas — let's build something amazing together!",
};

interface ChatWidgetProps {
  fullPage?: boolean;
}

const ChatWidget = ({ fullPage }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(fullPage ? true : false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (fullPage) {
      return (
        <div className="flex flex-col h-full w-full bg-chat text-chat-foreground">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-chat-border bg-chat-bot px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold">
                OS
              </div>
              <div>
                <p className="text-lg font-semibold text-chat-foreground">AI Co-Pilot</p>
                <p className="text-sm text-muted-foreground">Here to help you create</p>
              </div>
            </div>
          </div>
          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto chat-scrollbar space-y-3 px-6 py-6"
          >
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg} />
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
          </div>
          {/* Suggestions */}
          {showSuggestions && messages.length <= 1 && (
            <SuggestedPrompts onSelect={sendMessage} />
          )}
          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-chat-border bg-chat-bot px-6 py-4"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              disabled={isLoading}
              className="flex-1 rounded-xl bg-chat-input-bg px-4 py-3 text-base text-chat-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      );
    }

    // ...existing code for floating button and panel...
    return (
      <>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            >
              <MessageCircle className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl bg-chat shadow-2xl shadow-black/40 border border-chat-border sm:bottom-6 sm:right-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-chat-border bg-chat-bot px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-sm font-bold">
                    OS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-chat-foreground">AI Co-Pilot</p>
                    <p className="text-xs text-muted-foreground">Here to help you create</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-chat-border hover:text-chat-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto chat-scrollbar space-y-3 px-4 py-4"
              >
                {messages.map((msg, i) => (
                  <ChatBubble key={i} message={msg} />
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <TypingIndicator />
                )}
              </div>
              {/* Suggestions */}
              {showSuggestions && messages.length <= 1 && (
                <SuggestedPrompts onSelect={sendMessage} />
              )}
              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t border-chat-border bg-chat-bot px-3 py-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything…"
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-chat-input-bg px-4 py-2.5 text-sm text-chat-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </>
                </div>
                <div>
                  <p className="text-sm font-semibold text-chat-foreground">AI Co-Pilot</p>
                  <p className="text-xs text-muted-foreground">Here to help you create</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-chat-border hover:text-chat-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto chat-scrollbar space-y-3 px-4 py-4"
            >
              {messages.map((msg, i) => (
                <ChatBubble key={i} message={msg} />
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <TypingIndicator />
              )}
            </div>

            {/* Suggestions */}
            {showSuggestions && messages.length <= 1 && (
              <SuggestedPrompts onSelect={sendMessage} />
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-chat-border bg-chat-bot px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                disabled={isLoading}
                className="flex-1 rounded-xl bg-chat-input-bg px-4 py-2.5 text-sm text-chat-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
