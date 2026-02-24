import { useState } from "react";
import { useDraggable} from "@dnd-kit/core"
function Card({ card, onDelete, onEdit}) {
    const [isEditing,setIsEditing] = useState(false)
    const [editText,setEditText] = useState("");
    function handleSave(){
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
      backgroundColor: "white",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
      cursor: "grab",
    }}
  >
    {!isEditing ? (
      <>
        {/* Card Title */}
        <div
          style={{
            marginBottom: "8px",
            fontSize: "14px",
            wordBreak: "break-word",
            color:"black",
          }}
        >
          {card.title}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "6px",
          }}
        >
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: "green",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Edit
          </button>

          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onDelete(card.id)}
            style={{
              backgroundColor: "#e53935",
              color: "white",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Delete
          </button>
        </div>
      </>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <input
          type="text"
          value={editText}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={(e) => setEditText(e.target.value)}
          style={{
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "13px",
          }}
        />

        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleSave}
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            padding: "6px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Save
        </button>
      </div>
    )}
  </div>
);
}

export default Card;