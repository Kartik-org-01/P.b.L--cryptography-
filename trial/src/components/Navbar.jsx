import React from "react";
import "./Navbar.css";
import Nav3DHover from "./Nav3DHover";

export default function Navbar({ user, onLoginClick, onLogoutClick, onNavClick }) {
  // Show Home, Product, Login, Sign Up if no user
  // Show Home, Product, Logout + avatar if logged in

  return (
    <header className="navbar">
      <div className="navbar-logo">X</div>
      <nav className="navbar-menu" aria-label="Primary Navigation">
        <Nav3DHover label="Home" onClick={() => alert("Home clicked")} />
        <Nav3DHover label="Product" onClick={() => alert("Product clicked")} />
        {!user ? (
          <>
            <Nav3DHover label="Login" onClick={onLoginClick} />
            <Nav3DHover label="Sign Up" onClick={onLoginClick} />
          </>
        ) : (
          <>
            <Nav3DHover label="Logout" onClick={onLogoutClick} />
          </>
        )}
      </nav>
      {user && (
        <div className="navbar-avatar" title={`Logged in as ${user.name}`}>
          <img src={user.avatar || defaultAvatar(user.name)} alt="User avatar" />
          <span>{user.name}</span>
        </div>
      )}
    </header>
  );
}

const defaultAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=25d366&color=fff&rounded=true&size=40`;
