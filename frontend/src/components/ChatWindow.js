import { useEffect, useState } from "react";

export default function ChatWindow() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // Load messages on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(saved);
  }, []);

  const sendMessage = () => {
    if (!text) return;

    const newMessages = [...messages, text];

    setMessages(newMessages);
    localStorage.setItem("messages", JSON.stringify(newMessages));
    setText("");
  };

  return (
    <div id="chat-window" className="chat-window">
      <div id="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <input
        id="message-input"
        placeholder="Type message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button id="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
