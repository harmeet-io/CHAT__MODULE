import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "../ChatBox/ChatBox.css";
import Header from '../Header/Header';
import ChatSection from '../ChatSection/ChatSection';
import SideBar from '../SideBar/SideBar';


const ChatBox = () => {

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
      fetchChat();
    }, []);

    const fetchChat = async () => {
      const url = `http://localhost:8000/api/get-user-chat/634ac38272cfd9c73f206fcc`;

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
      const url = `http://localhost:8000/api/send-message/634ac38272cfd9c73f206fcc`;

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
      <div className="chat-header ">
        <Header />
      </div>
      <div className='chat-messages'>
        <div className='users'>

        </div>
        <div className='chat-section '>
         <ChatSection />

        </div>
      </div>

      
    </div>
  );
}

export default ChatBox
