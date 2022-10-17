import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import socket from "../../socket";
import "./Assistant.css";
// components
import ChatBox from "../chatBox/ChatBox";
// mui
import { Fab, Avatar } from "@mui/material";
// speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new SpeechRecognition();
// speech synthesis
const utterance = new SpeechSynthesisUtterance();

const Assistant = ({ user, chat, setChat }) => {
    const [activate, setActivate] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isNyraSpeaking, setIsNyraSpeaking] = useState(false);
    const [message, setMessage] = useState("");

  useEffect(() => {
    // recognizer
    recognizer.onstart = () => {
      console.log("Started Listening...");
    };
    recognizer.onend = () => {
      console.log("Stopped Listening...");
    };
    recognizer.onresult = (e) => {
      setIsListening(false);
      const message = e.results[0][0].transcript;
      const url = `http://localhost:8000/api/send-message/${user._id}`;
      socket.emit("sendMessage", { userId: user._id, message });
      const newMessage = { isAdmin: false, content: message };
      axios
        .post(url, newMessage)
        .then((response) => {
          setMessage("");
          console.log(response, "response");
        })
        .catch((error) => {
          console.log(error, "Error");
        });
      setChat((messages) => [...messages, newMessage]);
    };
    // utterance
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices[12];
    };
    utterance.onstart = () => {
      setIsNyraSpeaking(true);
    };
    utterance.onend = () => {
      setIsNyraSpeaking(false);
    };
  }, [user]);

  useEffect(() => {
    if (isListening) recognizer.start();
    else recognizer.stop();
  }, [isListening]);

  const handlemessageSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/send-message/${user._id}`;
    socket.emit("sendMessage", { userId: user._id, message });
    const newMessage = { isAdmin: false, content: message };
    axios
      .post(url, newMessage)
      .then((response) => {
        setMessage("");
        console.log(response, "response");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
    setChat((messages) => [...messages, newMessage]);
  };

  return (
    <div className="assistant">
      <Fab
        className="assistant__toggle"
        onClick={() => setActivate((activate) => !activate)}
        tabIndex={0}
      >
        <Avatar
          src={"https://avatars.dicebear.com/api/avataaars/2.svg"}
          alt=""
        />
      </Fab>
      <ChatBox
        user={user}
        message={message}
        setMessage={setMessage}
        isListening={isListening}
        setIsListening={setIsListening}
        isNyraSpeaking={isNyraSpeaking}
        setActivate={setActivate}
        messages={chat}
        handlemessageSubmit={handlemessageSubmit}
        style={
          activate
            ? { width: "300px", height: "400px" }
            : { width: "0px", height: "0px" }
        }
      />
    </div>
  );
};

export default Assistant;
