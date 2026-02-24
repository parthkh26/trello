import Card from "./Card";
import { useState } from "react";
import { useDroppable} from "@dnd-kit/core"

function List({ list, onAddCard, onDeleteCard, onEditCard}) {
    const [newCardTitle, setNewCardTitle] = useState("");

    function handleAddCard(){
        if (!newCardTitle.trim()) return;
        onAddCard(list.id,newCardTitle);
        setNewCardTitle("");
    }

    const { setNodeRef } = useDroppable({
  id: list.id,
});
    
    
  return (
    <div
     ref={setNodeRef}
      style={{
        backgroundColor: "transparent",
        padding: "0",
        width: "100%",
        minHeight: "100px",
      }}
    >
      <h4 style={{
        margin: "0 0 16px 0",
        color: "#172b4d",
        fontSize: "16px",
        fontWeight: "600"
      }}>
        {list.title}
      </h4>
      
      {list.cards.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          onDelete={(cardId) => onDeleteCard(list.id, cardId)} 
          onEdit={(cardId,title)=> onEditCard(list.id,cardId,title)}
        />
      ))}

      <div style={{ marginTop: "12px" }}>
        <input
          type="text"
          placeholder="Enter card title..."
          value={newCardTitle}
          onPointerDown={(e)=>e.stopPropagation()} 
          onChange={(e) => setNewCardTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "8px",
            border: "2px solid #dfe1e6",
            borderRadius: "6px",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleAddCard}
          style={{
            backgroundColor: "#0079bf",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "500",
            width: "100%",
          }}
        >
          Add Card
        </button>
      </div>
    </div>  
  
  );
}

export default List;
