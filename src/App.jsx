import React from "react"
import "./App.css"
import BoardsPage from "./components/boards page/BoardsPage"
import ListsPage from "./components/lists page/ListsPage"
import { Routes, Route } from "react-router-dom"

function App() {
    return (
        <div className="apps-container">
            <Routes>
                <Route path="/" element={<BoardsPage />} />
                <Route path="/b/:boardId" element={<ListsPage />} />
            </Routes>
        </div>
    )
}

export default App
