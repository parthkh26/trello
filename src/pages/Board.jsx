// import { useState } from "react";
// import List from "../components/Board/List";
// import {DndContext} from "@dnd-kit/core"
// import { useAuth } from "../context/AuthContext";
// import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
 
// function Board( {board}) {
//   const { user } = useAuth();
//   const [lists, setLists] = useState([]);
//   useEffect(() => {
//   async function fetchLists() {
//     if (!user?.uid || !board.id) return;

//     const querySnapshot = await getDocs(
//       collection(
//         db,
//         "users",
//         user.uid,
//         "boards",
//         board.id,
//         "lists"
//       )
//     );

//     const fetchedLists = await Promise.all(
//     querySnapshot.docs.map(async (listDoc) => {
//       const cardsSnapshot = await getDocs(
//         collection(
//         db,
//         "users",
//         user.uid,
//         "boards",
//         board.id,
//         "lists",
//         listDoc.id,
//         "cards"
//       )
//     );

//     const cards = cardsSnapshot.docs.map((cardDoc) => ({
//       id: cardDoc.id,
//       ...cardDoc.data(),
//     }));

//     return {
//       id: listDoc.id,
//       ...listDoc.data(),
//       cards,
//     };
//   })
// );

//     setLists(fetchedLists);
//   }




//   fetchLists();
// }, [user?.uid, board?.id]);

//   const [newListTitle, setNewListTitle] = useState("");
//   async function handleAddList() {
//   if (!newListTitle.trim()) return;

//   const docRef = await addDoc(
//     collection(
//       db,
//       "users",
//       user.uid,
//       "boards",
//       board.id,
//       "lists"
//     ),
//     {
//       title: newListTitle,
//       createdAt: new Date(),
//     }
//   );

//   // Update UI immediately
//   setLists([
//     ...lists,
//     { id: docRef.id, title: newListTitle, cards: [] },
//   ]);

//   setNewListTitle("");
// }
//   async function handleAddCard(listId, title) {
//   if (!title.trim()) return;

//   const docRef = await addDoc(
//     collection(
//       db,
//       "users",
//       user.uid,
//       "boards",
//       board.id,
//       "lists",
//       listId,
//       "cards"
//     ),
//     {
//       title,
//       createdAt: new Date(),
//     }
//   );

//   setLists((prevLists) =>
//     prevLists.map((list) =>
//       list.id === listId
//         ? {
//             ...list,
//             cards: [...list.cards, { id: docRef.id, title }],
//           }
//         : list
//     )
//   );
// }
//   async function handleDeleteCard(listId, cardId) {
//   await deleteDoc(
//     doc(
//       db,
//       "users",
//       user.uid,
//       "boards",
//       board.id,
//       "lists",
//       listId,
//       "cards",
//       cardId
//     )
//   );

//   setLists((prevLists) =>
//     prevLists.map((list) =>
//       list.id === listId
//         ? {
//             ...list,
//             cards: list.cards.filter((c) => c.id !== cardId),
//           }
//         : list
//     )
//   );
// }
//   async function handleEditCard(listId, cardId, newTitle) {
//   await updateDoc(
//     doc(
//       db,
//       "users",
//       user.uid,
//       "boards",
//       board.id,
//       "lists",
//       listId,
//       "cards",
//       cardId
//     ),
//     {
//       title: newTitle,
//     }
//   );

//   setLists((prevLists) =>
//     prevLists.map((list) =>
//       list.id === listId
//         ? {
//             ...list,
//             cards: list.cards.map((c) =>
//               c.id === cardId ? { ...c, title: newTitle } : c
//             ),
//           }
//         : list
//     )
//   );
// }

//  function handleDragEnd(event) {
//   const { active, over } = event;

//   // If dropped outside any list → do nothing
//   if (!over) return;

//   const cardId = active.id;
//   const targetListId = over.id;

//   let sourceListId = null;
//   let movedCard = null;

//   // 1️⃣ Find which list the card came from
//   for (const list of lists) {
//     const found = list.cards.find((c) => c.id === cardId);
//     if (found) {
//       sourceListId = list.id;
//       movedCard = found;
//       break;
//     }
//   }

//   if (!sourceListId || !movedCard) return;

//   // 2️⃣ If dropped in same list → do nothing (we'll add reordering later)
//   if (sourceListId === targetListId) return;

//   // 3️⃣ Remove card from source list and add to target list
//   const updatedLists = lists.map((list) => {
//     if (list.id === sourceListId) {
//       return {
//         ...list,
//         cards: list.cards.filter((c) => c.id !== cardId),
//       };
//     }

//     if (list.id === targetListId) {
//       return {
//         ...list,
//         cards: [...list.cards, movedCard],
//       };
//     }

//     return list;
//   });

//   setLists(updatedLists);
// }
  

//   console.log("lists state:", lists);
//   return (
//     <div>
//       <h2>Board</h2>
//        <DndContext onDragEnd={handleDragEnd} >
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           marginTop: "20px",
//         }}
//       >
//         {lists.map((list) => (
//           <List key={list.id} list={list} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onEditCard={handleEditCard}/>
//         ))}
//       </div>
//       </DndContext>
//       <div>
//         <input type="text" placeholder="Enter new list titile" value={newListTitle} onChange={(e)=> setNewListTitle(e.target.value)} />
//         <button onClick={handleAddList}>Add List</button>
//       </div>
//     </div>
//   );
// }

// export default Board;



import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";

import List from "../components/Board/List";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Board() {
  const { id: boardId } = useParams(); // 🔥 Get boardId from URL
  const { user } = useAuth();

  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");

  // ✅ Fetch Lists + Cards
  useEffect(() => {
    async function fetchLists() {
      if (!user?.uid || !boardId) return;

      const listsSnapshot = await getDocs(
        collection(
          db,
          "users",
          user.uid,
          "boards",
          boardId,
          "lists"
        )
      );

      const fetchedLists = await Promise.all(
        listsSnapshot.docs.map(async (listDoc) => {
          const cardsSnapshot = await getDocs(
            collection(
              db,
              "users",
              user.uid,
              "boards",
              boardId,
              "lists",
              listDoc.id,
              "cards"
            )
          );

          const cards = cardsSnapshot.docs.map((cardDoc) => ({
            id: cardDoc.id,
            ...cardDoc.data(),
          }));

          return {
            id: listDoc.id,
            ...listDoc.data(),
            cards,
          };
        })
      );

      setLists(fetchedLists);
    }

    fetchLists();
  }, [user?.uid, boardId]);

  // ✅ Add List
  async function handleAddList() {
    if (!newListTitle.trim()) return;

    const docRef = await addDoc(
      collection(
        db,
        "users",
        user.uid,
        "boards",
        boardId,
        "lists"
      ),
      {
        title: newListTitle,
        createdAt: new Date(),
      }
    );

    setLists([
      ...lists,
      { id: docRef.id, title: newListTitle, cards: [] },
    ]);

    setNewListTitle("");
  }

  // ✅ Add Card
  async function handleAddCard(listId, title) {
    if (!title.trim()) return;

    const docRef = await addDoc(
      collection(
        db,
        "users",
        user.uid,
        "boards",
        boardId,
        "lists",
        listId,
        "cards"
      ),
      {
        title,
        createdAt: new Date(),
      }
    );

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: [...list.cards, { id: docRef.id, title }],
            }
          : list
      )
    );
  }

  // ✅ Delete Card
  async function handleDeleteCard(listId, cardId) {
    await deleteDoc(
      doc(
        db,
        "users",
        user.uid,
        "boards",
        boardId,
        "lists",
        listId,
        "cards",
        cardId
      )
    );

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.filter((c) => c.id !== cardId),
            }
          : list
      )
    );
  }

  // ✅ Edit Card
  async function handleEditCard(listId, cardId, newTitle) {
    await updateDoc(
      doc(
        db,
        "users",
        user.uid,
        "boards",
        boardId,
        "lists",
        listId,
        "cards",
        cardId
      ),
      {
        title: newTitle,
      }
    );

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((c) =>
                c.id === cardId ? { ...c, title: newTitle } : c
              ),
            }
          : list
      )
    );
  }

  // ✅ Drag & Drop (UI Only)
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id;
    const targetListId = over.id;

    let sourceListId = null;
    let movedCard = null;

    for (const list of lists) {
      const found = list.cards.find((c) => c.id === cardId);
      if (found) {
        sourceListId = list.id;
        movedCard = found;
        break;
      }
    }

    if (!sourceListId || !movedCard) return;
    if (sourceListId === targetListId) return;

    const updatedLists = lists.map((list) => {
      if (list.id === sourceListId) {
        return {
          ...list,
          cards: list.cards.filter((c) => c.id !== cardId),
        };
      }

      if (list.id === targetListId) {
        return {
          ...list,
          cards: [...list.cards, movedCard],
        };
      }

      return list;
    });

    setLists(updatedLists);
  }

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <h1 style={{ 
          margin: 0, 
          color: "#2c3e50",
          fontSize: "28px"
        }}>
          Board
        </h1>
      </div>

      {/* Add List Section */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        marginBottom: "24px",
        maxWidth: "400px"
      }}>
        <h3 style={{ 
          margin: "0 0 15px 0", 
          color: "#333",
          fontSize: "16px"
        }}>
          Add New List
        </h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter list title..."
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddList()}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            onClick={handleAddList}
            style={{
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Add List
          </button>
        </div>
      </div>

      {/* Lists Section */}
      <DndContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            overflowX: "auto",
            paddingBottom: "20px",
          }}
        >
          {lists.map((list) => (
            <div
              key={list.id}
              style={{
                minWidth: "280px",
                backgroundColor: "#ebecf0",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <List
                list={list}
                onAddCard={handleAddCard}
                onDeleteCard={handleDeleteCard}
                onEditCard={handleEditCard}
              />
            </div>
          ))}
          
          {lists.length === 0 && (
            <div style={{
              color: "#888",
              padding: "20px",
              fontSize: "14px"
            }}>
              No lists yet. Create your first list above!
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
}

export default Board;








