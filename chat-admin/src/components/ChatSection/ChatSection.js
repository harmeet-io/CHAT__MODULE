import React, { useEffect, useState, useRef } from "react";
import "../ChatSection/ChatSection.css";
import axios from "axios";
import socket from "../../socket";

const ChatSection = ({ chat, user_id }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const chatRef = useRef();

  useEffect(() => {
    socket.off();
    socket.on("sentMessage", message => {
      console.log(message, 'Message is coming');
      if(user_id === message.user_id)
        setChats(chats => [...chats, {isAdmin: "0", content: message.content}]);
    })
  }, []);

  useEffect(() => {
    setChats(chat);
  }, [chat]);

  //  const openChat = function(user_id){
  // };
  // const fetchChat = () => {
  //   const url = `http://127.0.0.1:8000/api/get-user-chat/634bb074fd2e10ba46d8b2d4`;
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setChats(response.data.Chat.messages);
  //     })
  //     .catch((error) => {
  //       console.log(error, "Error line 16 ChatSection.js");
  //     });
  // };

  const sendMessage = () => {
    const url = `http://127.0.0.1:8000/api/send-message/${user_id}`; 
    const data = {
      isAdmin: "1",
      content: message,
    };
    if(message){
          axios
      .post(url, data)
      .then((response) => {
        setChats((chats) => [...chats, data]);
        if(chatRef.current){
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "line 19 ChatSection.js");
      });
    setMessage("");
  };
    }
    
  return (
    <div>
      <div className="chat-section" ref={chatRef}>

        {chats.length > 0 &&
          chats.map((item, i) => {
            if (item.isAdmin == 0) {
              return (
                <div style={{ marginTop: "18px" }}>
                  {" "}
                  <span
                    style={{
                      backgroundColor: "#036ffc",
                      padding: "8px",
                      margin: "15px",
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
                      marginLeft: "auto",
                      borderRadius: "10px",
                      fontSize: "15px",
                      color: "white",
                      display : 'block',
                      width : 'fit-content',
                      wordBreak : 'break-all'
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
        className="send-message-input"
        placeholder="Search"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
      />
      <button
        className="btn btn-primary send-btn"
        onClick={(e) => sendMessage(e.target.value)}
        disabled={!message}
      >
        {" "}
        Send{" "}
      </button>
    </div>
  );
};

export default ChatSection;
