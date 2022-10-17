import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";
import axios from "axios";
import socket from "../../socket";
// components
import ChatBubble from "../chatBubble/ChatBubble";
// mui
import { IconButton } from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ChatBox = ({ isListening, setIsListening, isNyraSpeaking, setActivate, message, setMessage, messages, handlemessageSubmit, style }) => {
  const chatBox = useRef(null);

  const handleClose = () => {
    setActivate(false);
    setIsListening(false);
  };

  useEffect(() => {
    setTimeout(
      () => (chatBox.current.scrollTop = chatBox.current.scrollHeight),
      0
    );
  }, [messages]);

  return (
    <div className="chatBox__container" style={style}>
      <div className="chatBox">
        <div className="chatBox__head">
          <div className="chatBox__chatInfo">
            <img
              className={`chatBox__avatar ${
                isNyraSpeaking ? "chatBox__nyraSpeaks" : ""
              }`}
              src={"https://avatars.dicebear.com/api/avataaars/2.svg"}
              alt=""
            />
            <div className="chatBox__nyraInfo">
              <p>Iraitech Support</p>
              <p>How may we help?</p>
            </div>
          </div>
          <IconButton
            className="chatBox__closeBtn"
            onClick={() => handleClose()}
          >
            <CloseRoundedIcon />
          </IconButton>
        </div>
        <div className="chatBox__messages" ref={chatBox}>
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.content}
              isAdmin={message.isAdmin}
            />
          ))}
        </div>
        <form
          className="chatBox__newMessage"
          onSubmit={(e) => handlemessageSubmit(e)}
        >
          <IconButton
            onClick={() => setIsListening((isListening) => !isListening)}
          >
            {isListening ? (
              <MicRoundedIcon className="chatBox__micActive" />
            ) : (
              <MicOffRoundedIcon />
            )}
          </IconButton>
          <input
            placeholder="Type your question."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton disabled={Boolean(!message.length)} type="submit">
            <SendRoundedIcon
              style={{ color: Boolean(message.length) ? "#1976D2" : "grey" }}
            />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
