import React from "react";
import { MessageConf } from "../../type";

const Message: React.FC<MessageConf> = ({ author, datetime, message }) => {
  return (
    <div className="message-blue">
      <p className="">{author}</p>
      <p className="message-content">{message}</p>
      <div className="message-timestamp-left">{datetime}</div>
    </div>
  );
};

export default Message;
