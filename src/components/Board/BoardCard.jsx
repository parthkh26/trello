function BoardCard({ board, onView }) {
  return (
    <div
      style={{
        backgroundColor: "#e3f2fd",  
        width: "200px",
        height: "120px",
        padding: "10px",
        margin: "10px",
        
      }}
    >
      <h3>{board.title}</h3>

      <button onClick={() => onView(board.id)}>
        Click to see more
      </button>
    </div>
  );
}

export default BoardCard;