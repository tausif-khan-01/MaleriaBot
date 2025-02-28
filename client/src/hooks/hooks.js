import axiosInstance from "@/lib/axios/axiosInstance";
import { useState } from "react";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!input) return;

    const newMessage = { content: input, role: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const newController = new AbortController();
      setController(newController);

      const response = await axiosInstance.post(
        "/ask",
        { question: input },
        { signal: newController.signal }
      );
      const botMessage = { content: response.data.answer, role: "assistant" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    if (controller) controller.abort();
    setIsLoading(false);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    stop,
  };
};
export default useChat;
