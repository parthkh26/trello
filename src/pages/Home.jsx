// import BoardCard from "../components/Board/BoardCard";
// import Board from "./Board";

// import { useAuth } from "../context/AuthContext";

// import { db } from "../firebase/firebaseConfig";
// import { useEffect, useState } from "react";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// function Home() {
//   const { user, logout } = useAuth();
//   const [boards, setBoards] = useState([]);
//   const [newBoardTitle, setNewBoardTitle] = useState("");
//   const [selectedBoard, setSelectedBoard] = useState(null);

//   function handleViewBoard(boardId){
//     const foundBoard = boards.find((b)=> b.id === boardId);
//     setSelectedBoard(foundBoard);
//   }

//   async function handleCreateBoard() {
//     if (!newBoardTitle.trim()) return;
//     const docRef = await addDoc(collection(db, "users", user.uid, "boards"), {
//       title: newBoardTitle,
//       createdAt: new Date(),
//     });
//     setBoards([
//       ...boards,{id:docRef.id, title: newBoardTitle},
//     ]);

//     setNewBoardTitle("");
// }
  
//   useEffect(() => {
//   async function fetchBoards() {
//     if (!user) return;

//     const querySnapshot = await getDocs(
//       collection(db, "users", user.uid, "boards")
//     );

//     const fetchedBoards = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     setBoards(fetchedBoards);
//   }

//   fetchBoards();
// }, [user]);
  
  

  


//   return (
//   <div style={{ padding: "20px" }}>
//     {!selectedBoard ? (
//       <>
//         <h2>Welcome, {user?.displayName}</h2>
//         <button onClick={logout}>Logout</button>

//         <div style={{ marginTop: "20px" }}>
//           <input
//             type="text"
//             placeholder="Enter board title"
//             value={newBoardTitle}
//             onChange={(e) => setNewBoardTitle(e.target.value)}
//           />
//           <button onClick={handleCreateBoard}>Create Board</button>
//         </div>

//         <h3 style={{ marginTop: "30px" }}>Your Boards</h3>

//         {boards.map((board) => (
//           <BoardCard
//             key={board.id}
//             board={board}
//             onView={handleViewBoard}
//           />
//         ))}
//       </>
//     ) : (
//       <Board board={selectedBoard} />
//     )}
//   </div>
// );
// }
// export default Home;









import BoardCard from "../components/Board/BoardCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  // ✅ Navigate to Board page
  function handleViewBoard(boardId) {
    navigate(`/board/${boardId}`);
  }

  // ✅ Create Board
  async function handleCreateBoard() {
    if (!newBoardTitle.trim()) return;

    const docRef = await addDoc(
      collection(db, "users", user.uid, "boards"),
      {
        title: newBoardTitle,
        createdAt: new Date(),
      }
    );

    setBoards([
      ...boards,
      { id: docRef.id, title: newBoardTitle },
    ]);

    setNewBoardTitle("");
  }

  // ✅ Fetch Boards
  useEffect(() => {
    async function fetchBoards() {
      if (!user?.uid) return;

      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "boards")
      );

      const fetchedBoards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBoards(fetchedBoards);
    }

    fetchBoards();
  }, [user?.uid]);

  return (
    <div style={{ 
      padding: "30px", 
      minHeight: "100vh",
      backgroundColor: "#f5f6fa",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <h1 style={{ 
          margin: 0, 
          color: "#2c3e50",
          fontSize: "28px"
        }}>
          My Boards
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "#555" }}>
            {user?.displayName}
          </span>
          <button 
            onClick={logout}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Create Board Section */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        marginBottom: "30px",
        maxWidth: "500px"
      }}>
        <h3 style={{ 
          margin: "0 0 15px 0", 
          color: "#333",
          fontSize: "16px"
        }}>
          Create New Board
        </h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter board title..."
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateBoard()}
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
            onClick={handleCreateBoard}
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
            Create
          </button>
        </div>
      </div>

      {/* Boards Grid */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}>
        {boards.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#888"
          }}>
            <p style={{ fontSize: "18px" }}>No boards yet</p>
            <p style={{ fontSize: "14px" }}>Create your first board above!</p>
          </div>
        ) : (
          boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onView={handleViewBoard}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

