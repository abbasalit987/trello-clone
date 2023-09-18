import React, { useEffect, useState } from "react"
import List from "../list/List"
import Header from "../../components/toolbar/Header"
import "./ListsPage.css"
import { useParams } from "react-router-dom"
import config from "../../../config"
import axios from "axios"

const apiKey = config.apiKey
const token = config.token

const ListsPage = () => {
    const { boardId } = useParams()
    const [lists, setLists] = useState([])
    const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`

    useEffect(() => {
        axios.get(url).then((response) => {
            setLists(response.data)
        })
    }, [])
    return (
        <div>
            <Header />
            <div className="lists-container">
                {lists.map((list) => {
                    return <List key={list.id} listInfo={list} />
                })}
            </div>
        </div>
    )
}
export default ListsPage
