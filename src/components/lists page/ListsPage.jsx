import React, { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import List from "../list/List"
import Header from "../../components/toolbar/Header"
import CreateList from "./CreateList"
import config from "../../../config"
import axios from "axios"
import { Typography, Input } from "@mui/material"
import "./ListsPage.css"

const apiKey = config.apiKey
const token = config.token

const ListsPage = () => {
    const { boardId } = useParams()
    const location = useLocation()

    const [lists, setLists] = useState([])
    const [editBoardTitlePhase, setEditBoardTitlePhase] = useState(false)
    const [editedBoardName, setEditedBoardName] = useState("")
    const [boardName, setBoardName] = useState("")

    const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`

    useEffect(() => {
        axios.get(url).then((response) => {
            setLists(response.data)
        })
    }, [])

    useEffect(() => {
        if (location.state && location.state.boardName) {
            setBoardName(location.state.boardName)
        }
    }, [location.state.boardName])

    const handleEditBoardTitle = () => {
        setEditBoardTitlePhase(true)
        setEditedBoardName(boardName)
    }

    const handleBoardNameChange = (event) => {
        setEditedBoardName(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmitBoardName()
        }
    }

    const handleSubmitBoardName = () => {
        setEditBoardTitlePhase(false)
        setBoardName(editedBoardName)
        boardTitleUpdateRequest(editedBoardName)
    }

    const boardTitleUpdateRequest = () => {
        const url = `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`
        axios.put(url, { name: editedBoardName })
    }

    return (
        <div className="main-lists-container">
            <Header />
            {boardName && !editBoardTitlePhase && (
                <Typography
                    sx={{
                        color: "#b6c2cf",
                        fontSize: "medium",
                        fontWeight: "bold",
                        padding: "20px",
                    }}
                    onClick={handleEditBoardTitle}
                >
                    {boardName}
                </Typography>
            )}
            {editBoardTitlePhase && (
                <div>
                    <Input
                        value={editedBoardName}
                        onChange={handleBoardNameChange}
                        onKeyDown={handleKeyDown}
                        sx={{
                            color: "#b6c2cf",
                            fontSize: "medium",
                            fontWeight: "bold",
                            padding: "20px",
                        }}
                    />
                </div>
            )}
            <div className="lists-container">
                {lists.map((list) => {
                    return <List key={list.id} listInfo={list} />
                })}
                <CreateList boardId={boardId} setLists={setLists} />
            </div>
        </div>
    )
}
export default ListsPage
