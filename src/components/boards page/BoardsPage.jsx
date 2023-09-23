import React, { useEffect, useReducer, useState } from "react"
import "./BoardsPage.css"
import Header from "../toolbar/Header"
import Board from "../board/Board"
import CreateBoard from "./CreateBoard"
import axios from "axios"
import config from "../../../config"
import { ACTIONS, reducer, initialState } from "../../reducer/reducer"
import Alert from "../alerts/Alerts"

const apiKey = config.apiKey
const token = config.token

const url = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`

const BoardsPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [errorResp, setErrorResp] = useState(false)

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                dispatch({ type: ACTIONS.SET_BOARDS, payload: response.data })
            })
            .catch(() => {
                setErrorResp(true)
            })
    }, [])

    return (
        <>
            <Header />
            {errorResp ? (
                <Alert
                    severity="error"
                    message="Error fetching data"
                    openSnackBar={errorResp}
                />
            ) : null}
            <div className="all-boards">
                <CreateBoard dispatch={dispatch} />
                {state.boards.length != 0 &&
                    state.boards.map((board) => {
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
