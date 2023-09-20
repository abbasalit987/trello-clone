import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import "./List.css"
import TaskCards from "../cards/TaskCards"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import config from "../../../config"
import axios from "axios"

const apiKey = config.apiKey
const token = config.token

const List = (props) => {
    const { listInfo } = props

    const [listDeleted, setListDeleted] = useState(false)

    return (
        <div className="list-container">
            {listDeleted ? null : (
                <Card
                    sx={{
                        minWidth: 275,
                        backgroundColor: "#101204",
                        borderRadius: "10px",
                    }}
                >
                    <CardContent className="list-name">
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                color: "#b6c2cf",
                                fontSize: "medium",
                                fontWeight: "bold",
                            }}
                        >
                            {listInfo.name}
                        </Typography>
                        <IconButtonMenu
                            listId={listInfo.id}
                            setListDeleted={setListDeleted}
                        />
                    </CardContent>
                    <CardActions>
                        <TaskCards listId={listInfo.id} />
                    </CardActions>
                </Card>
            )}
        </div>
    )
}

export default List

function IconButtonMenu(props) {
    const { listId, setListDeleted } = props
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const deleteList = (listId) => {
        const url = `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${token}&value=true`
        axios.put(url).then(() => {
            setListDeleted(true)
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
                <MenuItem onClick={() => deleteList(listId)}>Delete</MenuItem>
            </Menu>
        </div>
    )
}
