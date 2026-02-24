import { useState } from "react";
import { useDraggable} from "@dnd-kit/core"
function Card({ card, onDelete, onEdit}) {
    const [isEditing,setIsEditing] = useState(false)
    const [editText,setEditText] = useState("");
    
    function handleSave(){
        if (!editText.trim()) return;
        onEdit(card.id,editText);
        setIsEditing(false);
    }

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: card.id,
    });
  return (
  <div
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    style={{
      backgroundColor: "#ffffff",
      padding: "12px",
      marginBottom: "8px",
      borderRadius: "8px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
      cursor: "grab",
      transition: "box-shadow 0.2s",
    }}
  >
    {!isEditing ? (
      <>
        <div
          style={{
            marginBottom: "10px",
            fontSize: "14px",
            wordBreak: "break-word",
            color: "#172b4d",
            lineHeight: "1.4",
          }}
        >
          {card.title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "6px",
          }}
        >
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
                setEditText(card.title);
                setIsEditing(true);
            }}
            style={{
              backgroundColor: "#6b7280",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "11px",
              color: "white",
            }}
          >
            Edit
          </button>

          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onDelete(card.id)}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "11px",
            }}
          >
            Delete
          </button>
        </div>
      </>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <input
          type="text"
          value={editText}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "2px solid #0079bf",
            fontSize: "13px",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleSave}
            style={{
              backgroundColor: "#0079bf",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              flex: 1,
            }}
          >
            Save
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setIsEditing(false)}
            style={{
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default Card;
