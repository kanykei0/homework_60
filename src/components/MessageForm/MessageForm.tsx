import React, { useState } from "react";
import { MessageMutation } from "../../type";

const MessageForm = () => {
  const [message, setMessage] = useState<MessageMutation>({
    message: "",
    author: "",
  });

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.set("message", message.message);
    data.set("author", message.author);
    await fetch("http://146.185.154.90:8000/messages", {
      method: "POST",
      body: data,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Message:
        <input
          type="text"
          name="message"
          value={message.message}
          onChange={changeText}
        />
      </label>
      <br />
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={message.author}
          onChange={changeText}
        />
      </label>
      <br />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default MessageForm;
