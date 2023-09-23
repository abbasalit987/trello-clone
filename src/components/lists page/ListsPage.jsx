import React, { useEffect, useReducer, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { Typography, Input } from "@mui/material"
import List from "../list/List"
import Header from "../../components/toolbar/Header"
import CreateList from "./CreateList"
import config from "../../../config"
import axios from "axios"
import "./ListsPage.css"
import { ACTIONS, reducer, initialState } from "../../reducer/reducer"
import Alert from "../alerts/Alerts"

const apiKey = config.apiKey
const token = config.token

const ListsPage = () => {
    const { boardId } = useParams()
    const location = useLocation()

    const [state, dispatch] = useReducer(reducer, initialState)
    const [errorResp, setErrorResp] = useState(false)

    const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                dispatch({ type: ACTIONS.SET_LISTS, payload: response.data })
            })
            .catch(() => {
                setErrorResp(true)
            })
    }, [])

    return (
        <div className="main-lists-container">
            <Header />
            {errorResp ? (
                <Alert
                    severity="error"
                    message="Error fetching data"
                    openSnackBar={errorResp}
                />
            ) : null}

            {location.state.boardName && !state.editBoardTitlePhase && (
                <Typography
                    sx={{
                        color: "#b6c2cf",
                        fontSize: "medium",
                        fontWeight: "bold",
                        padding: "20px",
                    }}
                >
                    {location.state.boardName}
                </Typography>
            )}
            <div className="lists-container">
                {state.lists.map((list) => {
                    return <List key={list.id} listInfo={list} />
                })}
                <CreateList boardId={boardId} dispatch={dispatch} />
            </div>
        </div>
    )
}
export default ListsPage
