function BoardCard({ board, onView }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "220px",
        minHeight: "100px",
        padding: "16px",
        margin: "10px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
      onClick={() => onView(board.id)}
    >
      <h3 style={{
        margin: "0 0 12px 0",
        color: "#333",
        fontSize: "18px",
        fontWeight: "600"
      }}>
        {board.title}
      </h3>
      
      <span style={{
        fontSize: "12px",
        color: "#666"
      }}>
        Click to open →
      </span>
    </div>
  );
}

export default BoardCard;
