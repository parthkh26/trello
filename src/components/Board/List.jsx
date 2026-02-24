import Card from "./Card";
import { useState } from "react";
import { useDroppable} from "@dnd-kit/core"

function List({ list, onAddCard, onDeleteCard, onEditCard}) {
    const [newCardTitle, setNewCardTitle] = useState("");

    function handleAddCard(){
        onAddCard(list.id,newCardTitle);
        setNewCardTitle("");
    }

    const { setNodeRef } = useDroppable({
  id: list.id,   // each list becomes a drop target
});
    
    
  return (
    <div
     ref={setNodeRef}
      style={{
        backgroundColor: "#f4f5f7",
        padding: "10px",
        width: "200px",
        minHeight: "150px",
      }}
    >
      <h4 style={{color:"black"}}>{list.title}</h4>
      {list.cards.map((card) => (
        <Card key={card.id} card={card} onDelete={(cardId) => onDeleteCard(list.id, cardId)} onEdit={(cardId,title)=> onEditCard(list.id,cardId,title)}/>
      ))}
      <input type="text" placeholder="Enter title" value={newCardTitle} onPointerDown={(e)=>e.stopPropagation()} onChange={(e) => setNewCardTitle(e.target.value)} style={{width:"100%", marginTop:"10px"}} />

      <button onClick={handleAddCard}>
        Add Card
      </button>
    </div>  
  
  );
}

export default List;