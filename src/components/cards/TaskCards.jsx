import React, { useEffect, useState } from "react"
import config from "../../../config"
import axios from "axios"
import TaskCard from "../card/TaskCard"
import "./TaskCards.css"
import AddCard from "./AddCard"

const apiKey = config.apiKey
const token = config.token

const TaskCards = (props) => {
    const { listId } = props

    const url = `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`

    const [taskCardInfo, setTaskCardInfo] = useState([])

    useEffect(() => {
        axios.get(url).then((response) => {
            setTaskCardInfo(response.data)
        })
    }, [])

    return (
        <div className="cards-container">
            {taskCardInfo.map((card) => {
                return <TaskCard key={card.id} cardInfo={card} />
            })}
            <AddCard listId={listId} setTaskCardInfo={setTaskCardInfo} />
        </div>
    )
}

export default TaskCards
