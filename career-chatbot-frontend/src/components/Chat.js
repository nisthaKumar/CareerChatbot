import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";
import "../styles/Chat.css";

const Chat = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");

        try {
            setIsTyping(true);
            const response = await axios.post("http://127.0.0.1:8000/ask", { user_input: input });

            setIsTyping(false);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response.data.response, sender: "bot" },
            ]);
        } catch (error) {
            setIsTyping(false);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Error fetching response.", sender: "bot" },
            ]);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                ))}
                {isTyping && <Message text="Bot is typing..." sender="bot" />}
            </div>
            <div className="input-container">
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type your skills & interests..." 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
