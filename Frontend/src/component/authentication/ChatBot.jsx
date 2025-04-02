import { useState, useEffect, useRef } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:8001/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([
        ...newMessages,
        { text: data.reply || "Bot is currently unavailable.", sender: "bot" },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          text: "Bot is currently unavailable. Please try again later.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <div
      style={{
        width: "350px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ height: "250px", overflowY: "auto", padding: "5px" }}>
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.sender === "bot" ? "left" : "right",
              margin: "5px 0",
            }}
          >
            <b style={{ color: msg.sender === "bot" ? "blue" : "green" }}>
              {msg.sender === "bot" ? "Bot: " : "You: "}
            </b>{" "}
            {msg.text}
          </p>
        ))}
        <div ref={chatContainerRef}></div>
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "80%", padding: "5px", borderRadius: "5px" }}
      />
      <button
        onClick={sendMessage}
        style={{ marginLeft: "5px", padding: "5px 10px", cursor: "pointer" }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatBot;
