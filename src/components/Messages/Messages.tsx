import React from "react";
import { MessageConf } from "../../type";
import Message from "./Message";

interface Props {
  messages: MessageConf[];
}

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <>
      <div>Messages:</div>
      {messages.map((mess, index) => (
        <Message
          key={index}
          author={mess.author}
          datetime={mess.datetime}
          message={mess.message}
        />
      ))}
    </>
  );
};

export default Messages;
