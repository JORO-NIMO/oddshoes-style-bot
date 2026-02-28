import ChatWidget from "@/components/chat/ChatWidget";

const ChatPage = () => {
  return (
    <div className="min-h-screen w-full bg-chat text-chat-foreground">
      <ChatWidget fullPage />
    </div>
  );
};

export default ChatPage;
