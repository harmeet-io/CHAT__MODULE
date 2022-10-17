import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "../Chatbox/Chatbox.css";
import axios from "axios";
import Cookies from "js-cookie";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import socket from "../../socket";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    socket.off();
    socket.on("sendMessage", ({message}) => {
      console.log(message)
      setChat(chat => [...chat, {isAdmin: "1", content: message}]);
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone number');

    const url = `http://localhost:8000/api/add-user`;
    axios.post(url, {name, email, phone})
    .then((response) => {
      console.log(response);
      handleClose();
      setUser(response.data.User);
      socket.emit("joinedUser", {userId: response.data.User._id});
      fetchChat(response.data.User);
    })
    .catch((error) => {
      console.log(error, 'Line 34 Chatbox.js');
    })

  }

  const endChat = (user) => {
    const url = `http://localhost:8000/api/end-chat/${user._id}`;
    axios
      .post(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "Line 53 ChatBox.js");
      });
  }

    const handleClickOpen2 = () => {
      setOpen2(true);
    };

    const handleClose2 = () => {
      setOpen2(false);
      endChat(user);
    };
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    
  }, []);

  const fetchChat = async (user) => {
    const url = `http://localhost:8000/api/get-user-chat/${user._id}`;

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

    const url = `http://localhost:8000/api/send-message/${user._id}`;

    // const formData = new FormData();

    // formData.append('isAdmin', '0' );
    // formData.append('content', message);

    socket.emit("sendMessage", { userId: user._id, message });

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
    <>
      <button className="btn btn-primary m-4 p-2 " onClick={handleClickOpen}>
        {" "}
        Start Chat{" "}
      </button>
      <button className="btn btn-danger m-4 p-2 " onClick={handleClickOpen2}>
        {" "}
        End Chat{" "}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter the credentials to start the chat</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              name="email"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              name="name"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Phone Number"
              type="text"
              fullWidth
              variant="standard"
              name="phone number"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              {" "}
              Submit{" "}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      ;
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure, you want to end the chat? "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button onClick={handleClose2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
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
