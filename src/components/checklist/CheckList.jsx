import React, { useEffect, useState } from "react"
import ProgressBar from "../progress bar/ProgressBar"
import axios from "axios"
import config from "../../../config"
import CheckItem from "../checkitem/CheckItem"

const apiKey = config.apiKey
const token = config.token

const CheckList = (props) => {
    const { checkListId } = props

    const [checkItems, setCheckItems] = useState([])
    const [progress, setProgress] = useState(0)

    const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${token}`

    useEffect(() => {
        axios.get(url).then((response) => {
            setCheckItems(response.data)
        })
    }, [])

    const updateProgress = () => {
        if (checkItems.length === 0) {
            setProgress(0)
            return
        }
        const totalItems = checkItems.length
        const checkedItems = checkItems.reduce((acc, item) => {
            if (item.state === "complete") {
                acc = acc + 1
            }
            return acc
        }, 0)
        const newProgress = (checkedItems / totalItems) * 100
        setProgress(newProgress)
    }

    useEffect(() => {
        updateProgress()
    }, [checkItems])

    return (
        <>
            <ProgressBar progress={progress} />
            {checkItems.map((item) => {
                return <CheckItem key={item.id} checkItemInfo={item} />
            })}
        </>
    )
}

export default CheckList
