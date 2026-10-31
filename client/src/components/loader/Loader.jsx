import React from "react";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
      <div style={{
        width: "48px",
        height: "48px",
        border: "5px solid #333",
        borderBottomColor: "#e50914",
        borderRadius: "50%",
        display: "inline-block",
        boxSizing: "border-box",
        animation: "rotation 1s linear infinite"
      }} />
      <style>{`
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
