import React from "react";
import {BsSearch} from 'react-icons/bs';
import '../Header/Header.css';

const Header = ({setSearch}) => {

    
  return (
    <div className="header">
      <span style={{fontSize : '40px', marginLeft : '10px', marginBottom : '10px'}}> Chats </span>
      <input placeholder="Search" className="search" onChange={(e) => setSearch(e.target.value)}/>
      {/* <  BsSearch size={40} className='search-icon'  onClick={search} /> */}
    </div>
  );
};

export default Header;
