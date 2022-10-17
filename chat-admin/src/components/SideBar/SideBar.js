import React, { useEffect, useState } from "react";
import axios from "axios";
import '../SideBar/SideBar.css';


const SideBar = ( {openChat, search} ) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    const url = `http://127.0.0.1:8000/api/get-users`;

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setUsers(response.data.Users);
      })
      .catch((error) => {
        console.log(error, "Line 17 SideBar.js");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="sidebar">
      {users.length > 0 &&
        users.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase())).map((user, i) => {
          return (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#036ffc",
                textAlign: "center",
                margin: "10px 0",
                borderRadius: "10px",
                color: "white",
                fontSize: "18px",
                cursor : 'pointer',
              }}
              onClick={() => openChat(user._id)} 
            >
              {user.name}
            </div>
          );
        })}
    </div>
  );
};

export default SideBar;
