import React from "react";
import "../styles/Chat.css"; // Use the same CSS

const Message = ({ text, sender }) => {
    return <div className={`message ${sender}`}>{text}</div>;
};

export default Message;
