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
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      const current = assistantSoFar;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: current } : m
          );
        }
        return [...prev, { role: "assistant", content: current }];
      });
    };

    try {
      // Send only actual conversation (skip welcome)
      const conversationMessages = [...messages.slice(1), userMsg];
      await streamChat({
        messages: conversationMessages,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
        onError: (error) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: `Oops — ${error}` },
          ]);
          setIsLoading(false);
        },
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Give it another shot!" },
      ]);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Always render as full-screen chat
  return (
    <div className="flex flex-col min-h-screen w-full bg-chat text-chat-foreground">
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
};

export default ChatWidget;
