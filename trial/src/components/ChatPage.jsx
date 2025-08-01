import React, { useState } from "react";
import "./ChatPage.css";

const tabs = [
  { id: "chats", label: "Chats", icon: "💬" },
  { id: "status", label: "Status", icon: "🟢" },
  { id: "video", label: "Video Call", icon: "📹" },
  { id: "audio", label: "Audio Call", icon: "📞" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function ChatPage({ user, setUser }) {
  const [activeTab, setActiveTab] = useState("chats");
  const [settingsRotating, setSettingsRotating] = useState(false);

  // Update user data helper
  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="chat-page-container">
      <header className="chat-header">
        <h1>{tabs.find((t) => t.id === activeTab)?.label}</h1>
        <div
          className={activeTab === "settings" ? "rotating-icon" : ""}
          onClick={() => {
            if (activeTab === "settings") {
              setSettingsRotating((v) => !v);
            }
          }}
          title="Settings Gear"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setSettingsRotating((v) => !v)}
        >
          ⚙️
        </div>
      </header>

      <nav className="chat-nav" aria-label="Chat page navigation">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`tab-btn ${activeTab === id ? "active" : ""}`}
            aria-pressed={activeTab === id}
            aria-label={label}
            title={label}
          >
            <span className="tab-icon">{icon}</span> {label}
            {id === "settings" && (
              <span className="gear-icon" aria-hidden="true">
                ⚙️
              </span>
            )}
          </button>
        ))}
      </nav>

      <main className="chat-main-content" role="region" aria-live="polite">
        {activeTab === "chats" && <Chats />}
        {activeTab === "status" && <Status />}
        {activeTab === "video" && <VideoCall />}
        {activeTab === "audio" && <AudioCall />}
        {activeTab === "settings" && (
          <Settings user={user} updateUser={updateUser} />
        )}
      </main>
    </div>
  );
}

function Chats() {
  return (
    <section className="chats-section">
      <p>Your chats will appear here. (Feature coming soon!)</p>
    </section>
  );
}

function Status() {
  return (
    <section className="status-section">
      <p>Status updates feature coming soon!</p>
    </section>
  );
}

function VideoCall() {
  return (
    <section className="video-section">
      <p>Video call functionality coming soon.</p>
    </section>
  );
}

function AudioCall() {
  return (
    <section className="audio-section">
      <p>Audio call functionality coming soon.</p>
    </section>
  );
}

// Settings page allowing to update user info & account actions
function Settings({ user, updateUser }) {
  const [tempUserId, setTempUserId] = useState(user.id);
  const [tempPassword, setTempPassword] = useState("");
  const [nightModeEnabled, setNightModeEnabled] = useState(user.nightMode ?? false);
  const [accountAction, setAccountAction] = useState(null); // 'delete' or 'deactivate'

  const handleSave = () => {
    updateUser({ id: tempUserId, nightMode: nightModeEnabled });
    alert("Settings saved!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently delete your account?")) {
      alert("Account permanently deleted!");
      window.location.reload(); // simple page reload - replace with actual logout
    }
  };

  const handleDeactivateAccount = () => {
    if (window.confirm("Temporarily deactivate your account?")) {
      alert("Account temporarily deactivated. You can log back in later.");
      window.location.reload();
    }
  };

  return (
    <section className="settings-section">
      <h2>User Information</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Date of Birth:</strong> {user.dob}</p>
      <p><strong>Gender:</strong> {user.gender}</p>

      <label htmlFor="userId">User ID</label>
      <input
        id="userId"
        type="text"
        value={tempUserId}
        onChange={(e) => setTempUserId(e.target.value)}
      />

      <label htmlFor="password">Change Password (Future implementation)</label>
      <input
        id="password"
        type="password"
        value={tempPassword}
        placeholder="New password"
        onChange={(e) => setTempPassword(e.target.value)}
        disabled
      />

      <label htmlFor="nightModeToggle" className="night-mode-label">
        <input
          id="nightModeToggle"
          type="checkbox"
          checked={nightModeEnabled}
          onChange={() => setNightModeEnabled(!nightModeEnabled)}
        />
        Night Mode
      </label>

      <button className="premium-btn" onClick={handleSave}>
        Save Settings
      </button>

      <hr />

      <h3>Account Actions</h3>

      <button
        className="danger-btn"
        onClick={handleDeleteAccount}
        aria-label="Delete Permanently Account"
      >
        Permanently Delete Account
      </button>
      <button
        className="warning-btn"
        onClick={handleDeactivateAccount}
        aria-label="Temporarily Deactivate Account"
      >
        Temporarily Deactivate Account
      </button>

      <hr />

      <h3>Shopping Settings</h3>
      <p>Coming soon!</p>
      <button className="premium-btn disabled" disabled>
        Shopping Setting (Not working yet)
      </button>
    </section>
  );
}
