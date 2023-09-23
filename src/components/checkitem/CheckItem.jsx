import React, { useState } from "react"
import {
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import "./CheckItem.css"
import config from "../../../config"
import axios from "axios"

const apiKey = config.apiKey
const token = config.token

const CheckItem = (props) => {
    const { checkItemInfo, cardId } = props

    const [isChecked, setIsChecked] = useState(checkItemInfo.state)
    const [checkItemDeleted, setCheckItemDeleted] = useState(false)

    const handleCheckboxChange = () => {
        const newState = isChecked === "complete" ? "incomplete" : "complete"
        setIsChecked(newState)

        updateTheCheckItem(checkItemInfo.id, newState)
    }

    const updateTheCheckItem = (checkItemId, newState) => {
        const url = `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${apiKey}&token=${token}&state=${newState}`
        axios.put(url)
    }

    const handleDeleteCheckItem = () => {
        deleteCheckItem(checkItemInfo.id, checkItemInfo.idChecklist)
    }

    const deleteCheckItem = (checkItemId, checkListId) => {
        const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${apiKey}&token=${token}`

        axios
            .delete(url)
            .then(() => {
                setCheckItemDeleted(true)
            })
            .catch((error) => {
                console.error("Error deleting check item:", error)
            })
    }

    return (
        <>
            {checkItemDeleted ? null : (
                <div className="check-item-header">
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <FormControlLabel
                            checked={isChecked === "complete"}
                            control={<Checkbox />}
                            label={checkItemInfo.name}
                            onChange={handleCheckboxChange}
                        />
                    </Box>
                    <IconButtonMenu onDelete={handleDeleteCheckItem} />
                </div>
            )}
        </>
    )
}

export default CheckItem

function IconButtonMenu({ onDelete }) {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
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
                <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
        </div>
    )
}
