import React from "react"
import { AppBar, Box, Toolbar, Button } from "@mui/material"
import "./Header.css"
import AppsIcon from "@mui/icons-material/Apps"
import TrelloLogo from "../../assets/Trello_logo.svg"
import { useNavigate } from "react-router-dom"

export default function ButtonAppBar() {
    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate("/")
    }

    return (
        <Box className="header-container">
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#1d2125",
                    borderBottom: "2px solid #9eacba",
                    boxShadow: "none",
                }}
            >
                <Toolbar>
                    <AppsIcon
                        className="apps-icon"
                        sx={{
                            color: "#9eacba",
                            cursor: "pointer",
                            paddingRight: "20px",
                        }}
                        onClick={() => navigateToHome()}
                    />
                    <img src={TrelloLogo} alt="" />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
