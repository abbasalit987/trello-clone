import React, { useEffect, useState, useReducer } from "react"
import TaskCard from "../card/TaskCard"
import AddCard from "./AddCard"
import config from "../../../config"
import axios from "axios"
import "./TaskCards.css"
import { ACTIONS, reducer, initialState } from "../../reducer/reducer"
import Alert from "../alerts/Alerts"

const apiKey = config.apiKey
const token = config.token

const TaskCards = (props) => {
    const { listId } = props

    const url = `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`

    const [state, dispatch] = useReducer(reducer, initialState)
    const [errorResp, setErrorResp] = useState(false)

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                dispatch({
                    type: ACTIONS.SET_TASK_CARD_INFO,
                    payload: response.data,
                })
            })
            .catch(() => {
                setErrorResp(true)
            })
    }, [])

    return (
        <div className="cards-container">
            {errorResp ? (
                <Alert
                    severity="error"
                    message="Error fetching data"
                    openSnackBar={errorResp}
                />
            ) : null}
            {state.taskCardInfo.map((card) => {
                return <TaskCard key={card.id} cardInfo={card} />
            })}
            <AddCard listId={listId} dispatch={dispatch} />
        </div>
    )
}

export default TaskCards
