import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "./Chatbox.css";
import Cookies from "js-cookie";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ChatBox = () => {
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState({});

  return (
    <>
      
      <div className="chat-box">
        <div className="chat-header"></div>
        <div className="chat-messages">
          {chat.length > 0 &&
            chat.map((item, i) => {
              if (item.isAdmin == 1) {
                return (
                  <div style={{ marginTop: "18px" }}>
                    {" "}
                    <span
                      style={{
                        backgroundColor: "#036ffc",
                        padding: "8px",
                        margin: "10px",
                        borderRadius: "10px",
                        fontSize: "15px",
                        color: "white",
                      }}
                    >
                      {" "}
                      {item.content}{" "}
                    </span>{" "}
                  </div>
                );
              }
              if (item.isAdmin == 0) {
                return (
                  <div style={{ marginTop: "18px" }}>
                    {" "}
                    <span
                      style={{
                        // backgroundColor: "#036ffc",
                        padding: "8px",
                        marginLeft: "160px",
                        borderRadius: "10px",
                        fontSize: "15px",
                        color: "#036ffc",
                      }}
                    >
                      {" "}
                      {item.content}{" "}
                    </span>{" "}
                  </div>
                );
              }
            })}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          className="chat-input"
          onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
        />
        <button onClick={send} className="chat-btn btn btn-primary">
          {" "}
          Send{" "}
        </button>
      </div>
    </>
  );
};

export default ChatBox;
