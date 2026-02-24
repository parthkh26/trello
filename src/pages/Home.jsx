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
    <div 
      style={{ 
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#98afc7", }}>
      <div    
         style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
         }}>
          <h2 style={{margin:"0"}}>Welcome, {user?.displayName}</h2>
          <button onClick={logout}
              style={{
                backgroundColor: "#e53935",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                
    }}
          
          >Logout</button>

      </div>
      
      

      <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
            marginTop: "20px"
          }}
        >
        <input
          type="text"
          placeholder="Enter board title"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
        />
        <button onClick={handleCreateBoard} 
            style = {{
              backgroundColor: "green"
            }}>
          Create Board
        </button>
      </div>

      <h3 style={{ marginTop: "30px" }}>Your Boards</h3>
      <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          flexWrap: "wrap",
          
      }}>
        {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onView={handleViewBoard}
        />
      ))}

      </div>
      
    </div>
  );
}

export default Home;

