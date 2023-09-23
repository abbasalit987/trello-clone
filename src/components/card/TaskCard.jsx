import React, { useState } from "react"
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CheckLists from "../checklists/CheckLists"
import axios from "axios"
import config from "../../../config"
import "./TaskCard.css"

const apiKey = config.apiKey
const token = config.token

const TaskCard = (props) => {
    const { cardInfo } = props
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [open, setOpen] = React.useState(false)
    const [cardDeleted, setCardDeleted] = useState(false)

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw",
        maxHeight: "80vh",
        bgcolor: "#323940",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
        color: "#b6c2cf",
        overflowY: "scroll",
    }

    return (
        <>
            {!cardDeleted && (
                <>
                    <Button onClick={handleOpen}>{cardInfo.name}</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="task-card-header">
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    {cardInfo.name}
                                </Typography>
                                <IconButtonMenu
                                    cardId={cardInfo.id}
                                    setCardDeleted={setCardDeleted}
                                />
                            </div>

                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                {cardInfo.desc}
                            </Typography>
                            <br />
                            <CheckLists cardId={cardInfo.id} />
                        </Box>
                    </Modal>
                </>
            )}
        </>
    )
}

export default TaskCard

function IconButtonMenu(props) {
    const { cardId, setCardDeleted } = props
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const deleteCard = (cardId) => {
        const url = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`
        axios.delete(url).then(() => {
            setCardDeleted(true)
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
                <MenuItem onClick={() => deleteCard(cardId)}>Delete</MenuItem>
            </Menu>
        </div>
    )
}
