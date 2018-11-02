import React from 'react';

function NavBar(props) {
  console.log(props.users);
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <div id="userNum">USERS ONLINE {props.users}</div>
    </nav>
    );
}

export default NavBar;