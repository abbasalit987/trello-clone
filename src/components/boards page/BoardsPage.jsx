import React, { useEffect, useState } from "react"
import "./BoardsPage.css"
import Header from "../toolbar/Header"
import axios from "axios"
import config from "../../../config"
import Board from "../board/Board"
import CreateBoard from "./CreateBoard"

const apiKey = config.apiKey
const token = config.token

const url = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`

const BoardsPage = () => {
    const [boards, setBoards] = useState([])

    useEffect(() => {
        axios.get(url).then((res) => {
            setBoards(res.data)
        })
    }, [])

    return (
        <>
            <Header />
            <div className="all-boards">
                <CreateBoard setBoards={setBoards} />
                {boards.map((board) => {
                    let boardInfo = {
                        id: board.id,
                        url: board.url,
                        name: board.name,
                        imgUrl: board.prefs.backgroundImage,
                        bgcolor: board.prefs.backgroundColor,
                    }
                    return <Board key={board.id} boardInfo={boardInfo} />
                })}
            </div>
        </>
    )
}

export default BoardsPage
