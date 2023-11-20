import React from "react";
import { MessageConf } from "../../type";

const Message: React.FC<MessageConf> = ({ author, datetime, message }) => {
  const ownMessages = JSON.parse(localStorage.getItem("ownMessages") || "[]");

  let messClass = "message-blue";

  for (let i = 0; i < ownMessages.length; i++) {
    if (
      ownMessages[i].author === author &&
      ownMessages[i].message === message
    ) {
      messClass = "message-orange";
    }
  }
  return (
    <div className={`to${messClass}`}>
      <div className={messClass}>
        <p className="fw-bold">{author}</p>
        <p className="message-content">{message}</p>
        <div className="message-timestamp-left">{datetime}</div>
      </div>
    </div>
  );
};

export default Message;
