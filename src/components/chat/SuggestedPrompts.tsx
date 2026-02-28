import { motion } from "framer-motion";

const PROMPTS = [
  "How do I launch a product?",
  "Tips for startup growth",
  "Best tech stack for MVP?",
  "How to validate my idea?",
  "Show me a creative brand idea",
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const SuggestedPrompts = ({ onSelect }: SuggestedPromptsProps) => (
  <div className="flex flex-wrap gap-2 px-4 pb-2 justify-center">
    {PROMPTS.map((prompt, i) => (
      <motion.button
        key={prompt}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * i, duration: 0.2 }}
        onClick={() => onSelect(prompt)}
        className="rounded-full border border-primary/30 bg-chat-bot px-3 py-1.5 text-xs text-chat-foreground shadow-sm hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors"
      >
        {prompt}
      </motion.button>
    ))}
  </div>
);

export default SuggestedPrompts;
