// import { useChat } from "ai/react";
import { Chat } from "./components/ui/chat";
import useChat from "./hooks/hooks";

function App() {
  return (
    <div className="h-screen  p-5 md:p-10">
      <div className="flex flex-col h-full max-w-2xl mx-auto px-4  ">
        <h1 className="text-2xl font-semibold border-b my-2">🦟 Degue/ Maleria detector</h1>

        <div className="flex-1 flex overflow-hidden  ">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default App;

export function ChatBox() {
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat();

  const append = (message) => {
    setInput(message.content);
    handleSubmit(message);
  };

  return (
    <Chat
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isGenerating={isLoading}
      append={append}
      allowAttachments={false}
      stop={stop}
      suggestions={[
        'What are the symptoms of dengue?',
        'What is the difference between dengue and malaria?',
        'What are the symptoms of malaria?',
      ]}
    />
  );
}
