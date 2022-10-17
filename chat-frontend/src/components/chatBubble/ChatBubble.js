import React from "react";
import "./ChatBubble.css";

const ChatBubble = ({ message, isAdmin }) => {
    return (
        <div className={`chatBubble ${isAdmin ? "chatBubble__left" : "chatBubble__right"}`}>
            <p className="chatBubble__content">{message}</p>
            {/* <p className="chatBubble__date">{new Date(message.date).toLocaleString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, day: "numeric", month: "short", year: "numeric", })}</p> */}
        </div>
    );
};

export default ChatBubble;
