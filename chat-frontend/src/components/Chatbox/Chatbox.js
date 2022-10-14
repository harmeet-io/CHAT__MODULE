import React, {useState} from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "../Chatbox/Chatbox.css";
import axios from "axios";
import Cookies from "js-cookie";

const ChatBox = () => {
  const [message, setMessage] = useState("");

  const send = async () => {

    // const id = Cookies.user_id;
    // const url = `http://localhost:8000/api/send-message/${id}`;
    const url = `http://localhost:8000/api/send-message/6347fff4c482916bb31835e5`;

    const formData = new FormData();

    formData.append('isAdmin', '0' );
    formData.append('content', message);

    axios
      .post(url, formData)
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
      <div className="chat-messages"></div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="chat-input"
      />
      <button onClick={send} className="chat-btn">
        {" "}
        Send{" "}
      </button>
    </div>
  );
};

export default ChatBox;
