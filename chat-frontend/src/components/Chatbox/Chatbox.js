import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "../Chatbox/Chatbox.css";
import axios from "axios";
import Cookies from "js-cookie";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    fetchChat();
  }, []);

  const fetchChat = async () => {
    const url = `http://localhost:8000/api/get-user-chat/634b235999c6fb9cd2ebc41f`;

    axios
      .get(url)
      .then((response) => {
        setChat(response.data.Chat.messages);
      })
      .catch((error) => {
        console.log(error, "Line 25 Chatbox.js");
      });
  };

  const send = async () => {
    // const id = Cookies.user_id;
    // const url = `http://localhost:8000/api/send-message/${id}`;
    const url = `http://localhost:8000/api/send-message/634b235999c6fb9cd2ebc41f`;

    // const formData = new FormData();

    // formData.append('isAdmin', '0' );
    // formData.append('content', message);

    const data = {
      isAdmin: "0",
      content: message,
    };
    setMessage("");

    axios
      .post(url, data)
      .then((response) => {
        console.log(response, "response");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  return (
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
      />
      <button onClick={send} className="chat-btn btn btn-primary">
        {" "}
        Send{" "}
      </button>
    </div>
  );
};

export default ChatBox;
