import React from "react"
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material"
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
        <Box>
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
                        sx={{ color: "#9eacba", cursor: "pointer" }}
                        onClick={() => navigateToHome()}
                    />
                    <img src={TrelloLogo} alt="" />
                    <Button
                        variant="contained"
                        sx={{
                            color: "#1d2125",
                            textTransform: "none",
                            fontSize: "medium",
                        }}
                    >
                        Create
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
