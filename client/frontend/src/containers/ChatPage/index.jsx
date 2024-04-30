import { isAuthenticated } from "@/utils/loginUtils";
import { useState } from "react";
import PropTypes from "prop-types";
import { scrollToBottom, initialMessages, getSources } from "@/utils/chatUtils";
import ChatLine from "./ChatLine";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useRef } from "react";
import { API_URL } from "@/utils/apiUtils";
import { v4 as uuidv4 } from "uuid";

const ChatPage = ({ title = null, namespace = null }) => {
  const containerRef = useRef(null);
  const [messages, setMessages] = useState([...initialMessages(title)]);
  const [input, setInput] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessages((prevState) => [
      ...prevState,
      ...[{ role: "user", id: uuidv4(), content: input }],
    ]);
    console.log("presend messages", messages, input);
    const response = await fetch(
      `${API_URL}/chat${namespace ? `/${namespace}` : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", id: uuidv4(), content: input },
          ],
        }),
      }
    );
    const res = await response.json();
    setMessages((prevState) => [
      ...prevState,
      { role: "assistant", id: uuidv4(), content: res.data.message },
    ]);
    setData(res.data.sources);
    setIsLoading(false);
    setInput("");
  };

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  const handleSignin = () => {};

  return (
    <>
      {isAuthenticated() ? (
        <div className="rounded-2xl border min-h-full max-h-full w-full flex flex-col justify-between pt-10">
          <div className="p-6 overflow-auto" ref={containerRef}>
            {(messages || []).map(({ id, role, content }, index) => (
              <ChatLine
                key={id}
                role={role}
                content={content}
                // Start from the third message of the assistant
                sources={data?.length ? getSources(data, role, index) : []}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 flex clear-both">
            <Input
              value={input}
              placeholder={"Type to chat with AI..."}
              onChange={handleInputChange}
              className="mr-2"
            />

            <Button type="submit" className="w-24">
              {isLoading ? <Spinner /> : "Ask"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="h-full flex flex-row justify-center items-center">
          <Button size="sm" variant="outline" onClick={handleSignin}>
            Sign In to Continue
          </Button>
        </div>
      )}
    </>
  );
};

ChatPage.propTypes = {
  title: PropTypes.string,
  namespace: PropTypes.string,
};

export default ChatPage;
