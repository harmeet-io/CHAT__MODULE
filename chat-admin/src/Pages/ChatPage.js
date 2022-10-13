import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import MyChats from "../components/MyChats/MyChats";
import ChatBox from "../components/ChatBox/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box style={{display:"flex", justifyContent:"space-between", p:"10px", h:"91.5vh", w:"100%"}}>
        <MyChats />
        <ChatBox />
      </Box>
    </div>
  );
};

export default ChatPage;
