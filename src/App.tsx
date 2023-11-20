import { useEffect, useRef, useState } from "react";
import Messages from "./components/Messages/Messages";
import { MessageConf } from "./type";
import MessageForm from "./components/MessageForm/MessageForm";
import Preloader from "./components/Preloader/Preloader";

const URL = "http://146.185.154.90:8000/messages";

function App() {
  const [messages, setMessages] = useState<MessageConf[]>([]);
  const [preloader, setPreloader] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);

  const toBootom = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (toBootom.current) {
      toBootom.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (response.ok) {
      const messages: MessageConf[] = await response.json();
      const newMessages = messages.map((message) => ({
        ...message,
      }));
      return newMessages;
    }
    return [];
  };

  useEffect(() => {
    if (!loadComplete) {
      setPreloader(true);
    }
  }, [loadComplete]);

  const getLastMessages = async () => {
    try {
      const data = await fetchData(URL);
      setMessages(data);
      setLoadComplete(true);
    } finally {
      setPreloader(false);
    }
  };

  useEffect(() => {
    void getLastMessages();
  }, []);

  useEffect(() => {
    let lastMessDate = "";

    const interval: number = setInterval(async () => {
      const result = await fetchData(`${URL}?datetime=${lastMessDate}`);
      if (result.length > 0) {
        lastMessDate = result[result.length - 1].datetime;
        getLastMessages();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inner-container">
      <Preloader show={preloader} />
      <Messages messages={messages} />
      <div ref={toBootom}>
        <MessageForm />
      </div>
    </div>
  );
}

export default App;
