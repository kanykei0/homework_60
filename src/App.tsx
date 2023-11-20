import { useEffect, useState } from "react";
import Messages from "./components/Messages/Messages";
import { MessageConf } from "./type";
import MessageForm from "./components/MessageForm/MessageForm";

const URL = "http://146.185.154.90:8000/messages";

function App() {
  const [messages, setMessages] = useState<MessageConf[]>([]);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (response.ok) {
      const messages: MessageConf[] = await response.json();
      const newMessages = messages.map((message) => ({
        ...message,
      }));
      return newMessages;
    }
    return messages;
  };

  const getLastMessages = async () => {
    try {
      const data = await fetchData(URL);
      setMessages(data);
    } catch (error) {
      console.log(error);
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
    <div className="container-md">
      <div>App</div>
      <MessageForm />
      <Messages messages={messages} />
    </div>
  );
}

export default App;
