import { motion } from "framer-motion";

const PROMPTS = [
  "Why OddShoes?",
  "What's a Genesis Build?",
  "How fast can you ship?",
  "I have a startup idea",
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const SuggestedPrompts = ({ onSelect }: SuggestedPromptsProps) => (
  <div className="flex flex-wrap gap-2 px-4 pb-2">
    {PROMPTS.map((prompt, i) => (
      <motion.button
        key={prompt}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * i, duration: 0.2 }}
        onClick={() => onSelect(prompt)}
        className="rounded-full border border-chat-border bg-chat-bot px-3 py-1.5 text-xs text-chat-foreground transition-colors hover:border-primary hover:text-primary"
      >
        {prompt}
      </motion.button>
    ))}
  </div>
);

export default SuggestedPrompts;
