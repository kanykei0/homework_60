import React from "react";
import { MessageConf } from "../../type";

const Message: React.FC<MessageConf> = ({ author, datetime, message }) => {
  return (
    <div className="card">
      <div className="d-flex gap-4 px-3 py-2">
        <p className="m-0">name: {author}</p>
        <div>
          <p className="m-0">text: {message}</p>
        </div>
        <span className="text-secondary">{datetime}</span>
      </div>
    </div>
  );
};

export default Message;
