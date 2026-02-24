# 📝 Trello Clone (React + Firebase)

A full-stack Trello-like task management application built using **React**, and **Firebase Authentication**.

This project allows users to create boards, lists, and cards with persistent storage and secure authentication.

---

## 🚀 Features

### 🔐 Authentication
- Google Sign-In using Firebase Authentication
- Protected access (only logged-in users can view boards)

### 📋 Boards
- Create new boards
- Boards stored per user
- Data persists after refresh

### 📂 Lists
- Create lists inside boards
- Lists stored inside board documents
- Persistent storage in Firestore

### 🗂 Cards
- Add cards inside lists
- Edit card titles
- Delete cards
- Drag cards between lists

---

## 🏗 Project Structure

```
src/
│
├── components/
│   └── Board/
│       ├── BoardCard.jsx
│       ├── List.jsx
│       └── Card.jsx
│
├── pages/
│   ├── Home.jsx
│   └── Board.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── firebase/
│   └── firebaseConfig.js
│
└── App.jsx
```


## 🔥 Firestore Database Structure

```
users/{userId}
│
└── boards/{boardId}
    │
    └── lists/{listId}
        │
        └── cards/{cardId}
```

### 📌 Structure Explanation

- Each user has their own document inside `users`
- Each user can create multiple `boards`
- Each board contains multiple `lists`
- Each list contains multiple `cards`
- Data is isolated per user using Firebase Authentication UID


