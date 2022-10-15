import logo from "./logo.svg";
import "./App.css";
import React , {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import ChatBox from "./components/ChatBox/ChatBox";


function App() {
  
  return (
    <div className="App">
      {/* < Router path='/chat' element={ChatPage} exact /> */}
      <ChatBox /> 
    </div>
  );
}

export default App;
