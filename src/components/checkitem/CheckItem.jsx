import React, { useState } from "react"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import "./CheckItem.css"

const CheckItem = (props) => {
    const { checkItemInfo } = props
    console.log(checkItemInfo)

    const [isChecked, setIsChecked] = useState(false)
    const [checkItemDeleted, setCheckItemDeleted] = useState(false)

    const handleCheckboxChange = (isChecked) => {
        setIsChecked(!isChecked)
    }

    return (
        <>
            {checkItemDeleted ? null : (
                <div className="check-item-header">
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <FormControlLabel
                            checked={isChecked}
                            control={<Checkbox />}
                            label={checkItemInfo.name}
                            onChange={() => handleCheckboxChange(isChecked)}
                        />
                    </Box>
                    <IconButtonMenu
                        checkItemId={checkItemInfo.id}
                        checkListId={checkItemInfo.idChecklist}
                        setCheckItemDeleted={setCheckItemDeleted}
                    />
                </div>
            )}
        </>
    )
}

export default CheckItem

function IconButtonMenu(props) {
    const { checkItemId, checkListId, setCheckItemDeleted } = props
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const deleteCard = (checkItemId, checkListId) => {
        const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${apiKey}&token=${token}`
        axios.delete(url).then(() => {
            setCheckItemDeleted(true)
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
                <MenuItem onClick={() => deleteCard(checkItemId, checkListId)}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    )
}
