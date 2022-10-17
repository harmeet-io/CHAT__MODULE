import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import socket from "./socket";
import Assistant from "./components/assistant/Assistant";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function App() {
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    socket.off();
    socket.on("sendMessage", ({ message }) => {
      setChat(chat => [...chat, {isAdmin: true, content: message}]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone number");

    const url = `http://localhost:8000/api/add-user`;
    axios
      .post(url, { name, email, phone })
      .then((response) => {
        console.log(response);
        handleClose();
        setUser(response.data.User);
        socket.emit("joinedUser", { userId: response.data.User._id });
        fetchChat(response.data.User);
      })
      .catch((error) => {
        console.log(error, "Line 34 Chatbox.js");
      });
  };

  const endChat = (user) => {
    setChat([]);
    const url = `http://localhost:8000/api/end-chat/${user._id}`;
    axios
      .post(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "Line 53 ChatBox.js");
      });
  };

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

  return (
    <div className="App">
      <Assistant user={user} chat={chat} setChat={setChat} />
      <Button variant="contained" style={{margin: "5px", textTransform: "none"}} onClick={handleClickOpen}>
        Start Chat
      </Button>
      <Button variant="contained" style={{margin: "5px", textTransform: "none"}} onClick={handleClickOpen2}>
        End Chat
      </Button>
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
    </div>
  );
}

export default App;
