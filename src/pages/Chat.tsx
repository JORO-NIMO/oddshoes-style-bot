import ChatWidget from "@/components/chat/ChatWidget";

const ChatPage = () => {
  return (
    <div className="min-h-screen w-full bg-chat text-chat-foreground flex items-center justify-center">
      <div className="w-full max-w-2xl h-[90vh] flex flex-col shadow-2xl rounded-2xl border border-chat-border bg-chat overflow-hidden">
        <ChatWidget fullPage />
      </div>
    </div>
  );
};

export default ChatPage;
