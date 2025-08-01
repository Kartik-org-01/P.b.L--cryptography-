import React from "react";
import "./PremiumButton.css"; // or add to your global/main css

export default function PremiumButton({ children, ...props }) {
  return (
    <button className="premium-btn" {...props}>
      {children}
    </button>
  );
}
