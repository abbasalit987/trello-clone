import React, { useEffect, useState } from "react"
import config from "../../../config"
import axios from "axios"
import CheckList from "../checklist/CheckList"

const apiKey = config.apiKey
const token = config.token

const CheckLists = (props) => {
    const { cardId } = props
    const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${token}`

    const [checkList, setCheckList] = useState([])

    useEffect(() => {
        axios.get(url).then((response) => {
            setCheckList(response.data)
        })
    }, [])

    return (
        <>
            {checkList.map((list) => {
                return <CheckList key={list.id} checkListId={list.id} />
            })}
        </>
    )
}

export default CheckLists
