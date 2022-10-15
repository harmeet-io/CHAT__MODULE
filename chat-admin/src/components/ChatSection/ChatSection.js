import React, { useEffect, useState } from "react";
import "../ChatSection/ChatSection.css";
import axios from "axios";

const ChatSection = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const fetchChat = () => {
    const url = `http://127.0.0.1:8000/api/get-user-chat/634b235999c6fb9cd2ebc41f`;
    axios
      .get(url)
      .then((response) => {
        setChat(response.data.Chat.messages);
      })
      .catch((error) => {
        console.log(error, "Error line 16 ChatSection.js");
      });
  };

  const sendMessage = () => {
    const url = `http://127.0.0.1:8000/api/send-message/634b235999c6fb9cd2ebc41f`;
    const data = {
      isAdmin: "1",
      content: message,
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "line 19 ChatSection.js");
      });
    setMessage("");
  };

  useEffect(() => {
    fetchChat();
  }, []);
  return (
    <div>
      <div className="chat-section">
        {chat.length > 0 &&
          chat.map((item, i) => {
            if (item.isAdmin == 0) {
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
            if (item.isAdmin == 1) {
              return (
                <div style={{ marginTop: "18px" }}>
                  {" "}
                  <span
                    style={{
                      backgroundColor: "#180759",
                      padding: "8px",
                      marginLeft: "900px",
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
          })}
      </div>

      <input
        className="send-message"
        placeholder="Search"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="btn btn-primary send-btn"
        onClick={(e) => sendMessage(e.target.value)}
      >
        {" "}
        Send{" "}
      </button>
    </div>
  );
};

export default ChatSection;
