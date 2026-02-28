const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot [animation-delay:0.2s]" />
    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot [animation-delay:0.4s]" />
  </div>
);

export default TypingIndicator;
