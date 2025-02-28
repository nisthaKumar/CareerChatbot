import React, { useState } from "react";
import axios from "axios";
import Message from "./Message"; // Import the Message component
import "../styles/Chat.css"; // Import styles

const Chat = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post("http://127.0.0.1:8000/ask", { user_input: input });
            setMessages([...messages, userMessage, { text: response.data.response, sender: "bot" }]);
        } catch (error) {
            setMessages([...messages, { text: "Error fetching response.", sender: "bot" }]);
        }
        setInput("");
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                ))}
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
