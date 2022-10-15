import React from "react";
import {BsSearch} from 'react-icons/bs';
import '../Header/Header.css';

const Header = () => {

    const search = () => {
        alert("working");
    }
  return (
    <div>
      <input placeholder="Search" className="search"/>
      <  BsSearch size={40} className='search-icon'  onClick={search} />
    </div>
  );
};

export default Header;
