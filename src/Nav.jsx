import React from 'react';

function NavBar(props) {
  console.log(props.messages);
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    );
}

export default NavBar;