// src/components/ChatBox.jsx
import React, { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import axios from "axios";
import "../styles/chat.css";

export default function ChatBox({ chatId, currentUser, otherUser, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEnd = useRef();
  useEffect(() => {
    if (!currentUser || !chatId) return;

    // connect socket
    if (!socket.connected) {
      socket.connect();
socket.emit("setup", currentUser._id);
    }

    // join chat room
    socket.emit("joinChat", chatId);

    // fetch chat history
    axios
      .get(`https://vanijya.onrender.com/api/chats/${chatId}`, {
        headers: { "x-user-id": currentUser._id },
      })
      .then((res) => setMessages(res.data.messages || []))
      .catch((err) => console.error(err));

    // listen for new messages
    const handler = (payload) => {
      if (payload.chatId === chatId) {
        setMessages((prev) => [...prev, payload.message]);
      }
    };

    socket.on("message", handler);

    return () => {
      socket.off("message", handler);
    };
  }, [chatId, currentUser]);

  // scroll to bottom
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      chatId,
      senderId: currentUser._id,
      text,
    });

    setText("");
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div>{otherUser?.name || "Chat"}</div>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>

      <div className="chatbox-messages">
        {messages.map((m, i) => {
          const senderId = typeof m.sender === "string" ? m.sender : m.sender?._id;
          const senderName =
            typeof m.sender === "string" ? "User" : m.sender?.name || "User";
          const isMine = senderId === currentUser._id;

          return (
            <div key={i} className={`msg ${isMine ? "mine" : "their"}`}>
              {!isMine && <div className="msg-sender">{senderName}</div>}
              <div className="msg-text">{m.text}</div>
              <div className="msg-time">
                {new Date(m.createdAt).toLocaleString()}
              </div>
            </div>
          );
        })}
        <div ref={messagesEnd} />
      </div>

      <div className="chatbox-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
