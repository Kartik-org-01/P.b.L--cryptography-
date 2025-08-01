import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import ChatPage from "./components/ChatPage";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Open Modal
  const openAuthModal = () => setModalOpen(true);

  // Close Modal
  const closeAuthModal = () => setModalOpen(false);

  // Handle login/signup success
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    closeAuthModal();
  };

  // Logout
  const logout = () => {
    setUser(null);
    setModalOpen(false);
  };

  return (
    <div className={`app-container ${user?.nightMode ? "night-mode" : ""}`}>
      <Navbar
        user={user}
        onLoginClick={openAuthModal}
        onLogoutClick={logout}
        onNavClick={openAuthModal}
      />
      <main className="main-content">
        {user ? (
          <ChatPage user={user} setUser={setUser} />
        ) : (
          <LandingPage onLoginClick={openAuthModal} />
        )}
      </main>
      <Footer />
      {modalOpen && !user && (
        <AuthModal onClose={closeAuthModal} onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

// Landing page with updated testimonials
function LandingPage({ onLoginClick }) {
  return (
    <div className="landing-welcome">
      <h1>Message X</h1>
      <p>Connect, chat, and share with friends and family seamlessly.</p>
      <button className="premium-btn" onClick={onLoginClick}>
        Login / Sign Up
      </button>
      <section className="testimonials">
        <h2>Testimonials</h2>
        <Testimonial
          name="Kartik Pant"
          text="Message X is a game changer! It keeps our entire team seamlessly connected."
        />
        <Testimonial
          name="Nivedita Dani"
          text="The user interface is friendly and intuitive. I love the modern design."
        />
        <Testimonial
          name="Diva Tripathi"
          text="Message X’s video calls are crystal clear — perfect for remote teamwork."
        />
        <Testimonial
          name="Abhay Goswami"
          text="The dark mode feature is a blessing during late-night coding sessions."
        />
      </section>
    </div>
  );
}

// Avatar image removed, replaced by a black circle
function Testimonial({ name, text }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-blank-avatar" />
      <div>
        <strong>{name}</strong>
        <p>"{text}"</p>
      </div>
    </div>
  );
}
