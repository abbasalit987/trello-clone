import React, { useEffect, useState } from "react"
import ProgressBar from "../progress bar/ProgressBar"
import axios from "axios"
import config from "../../../config"
import CheckItem from "../checkitem/CheckItem"
import { Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import "./CheckList.css"
import AddCheckItem from "./AddCheckItem"

const apiKey = config.apiKey
const token = config.token

const CheckList = (props) => {
    const { checkListId, checkListName, cardId } = props

    const [checkItems, setCheckItems] = useState([])
    const [progress, setProgress] = useState(0)
    const [checkListDeleted, setCheckListDeleted] = useState(false)

    const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${token}`

    useEffect(() => {
        axios.get(url).then((response) => {
            setCheckItems(response.data)
        })
    }, [checkItems])

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
            {checkListDeleted ? null : (
                <>
                    <ProgressBar progress={progress} />
                    <div className="checklist-header">
                        <Typography>{checkListName}</Typography>
                        <IconButtonMenu
                            checkListId={checkListId}
                            setCheckListDeleted={setCheckListDeleted}
                        />
                    </div>
                    {checkItems.map((item) => {
                        return (
                            <CheckItem
                                key={item.id}
                                checkItemInfo={item}
                                cardId={cardId}
                            />
                        )
                    })}
                    <AddCheckItem
                        checkListId={checkListId}
                        setCheckItems={setCheckItems}
                        cardId={cardId}
                    />
                </>
            )}
        </>
    )
}

export default CheckList

function IconButtonMenu(props) {
    const { checkListId, setCheckListDeleted } = props
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const deleteCard = (checkListId) => {
        const url = `https://api.trello.com/1/checklists/${checkListId}?key=${apiKey}&token=${token}`
        axios.delete(url).then(() => {
            setCheckListDeleted(true)
        })
    }

    return (
        <div>
            <IconButton
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: "#b6c2cf" }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => deleteCard(checkListId)}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    )
}
