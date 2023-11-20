import React, { useState } from "react";
import { MessageMutation } from "../../type";
import { Button, Form } from "react-bootstrap";

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
    const ownMessages = JSON.parse(localStorage.getItem("ownMessages") || "[]");
    ownMessages.push({
      author: message.author,
      message: message.message,
    });
    localStorage.setItem("ownMessages", JSON.stringify(ownMessages));
    setMessage({
      message: "",
      author: "",
    });
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="form-element
    d-flex justify-content-center"
    >
      <div className="row inner-form">
        <div className="col">
          <label className="text-white">
            Message:
            <Form.Control
              type="text"
              name="message"
              value={message.message}
              onChange={changeText}
            />
          </label>
        </div>
        <div className="col">
          <label className="text-white">
            Author:
            <Form.Control
              type="text"
              name="author"
              value={message.author}
              onChange={changeText}
            />
          </label>
        </div>
        <div className="col d-flex align-items-end">
          <Button variant="success" className="mt-auto" type="submit">
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
