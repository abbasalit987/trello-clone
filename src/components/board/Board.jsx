import React from "react"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { Typography } from "@mui/material"

const Board = (props) => {
    const { boardInfo } = props

    const navigate = useNavigate()

    const navigateToBoard = (id) => {
        navigate(`/b/${id}`)
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    width: 256,
                    height: 128,
                },
                padding: "20px",
            }}
        >
            <Paper
                sx={{
                    padding: "10px",
                    backgroundImage: `url(${boardInfo.imgUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
                onClick={() => navigateToBoard(boardInfo.id)}
            >
                <Typography
                    sx={{
                        color: "#ffffff",
                        fontSize: "medium",
                        fontWeight: "bold",
                    }}
                >
                    {boardInfo.name}
                </Typography>
            </Paper>
        </Box>
    )
}

export default Board
