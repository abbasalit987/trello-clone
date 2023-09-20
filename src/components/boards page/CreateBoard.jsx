import React, { useState } from "react"
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"
import Stack from "@mui/material/Stack"
import { Box, Paper, Typography } from "@mui/material"
import config from "../../../config"
import axios from "axios"

const apiKey = config.apiKey
const token = config.token

const CreateBoard = (props) => {
    const { setBoards } = props
    const [createPhase, setCreatePhase] = useState(false)

    const createNewBoard = () => {
        setCreatePhase(true)
    }

    const boardCreateRequest = (boardName) => {
        const url = `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${token}`
        axios
            .post(url)
            .then((response) =>
                setBoards((prevValue) => [...prevValue, response.data])
            )
    }

    return (
        <>
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
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "grey",
                    }}
                    onClick={() => {
                        createNewBoard()
                    }}
                >
                    {createPhase ? (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                const formData = new FormData(
                                    event.currentTarget
                                )
                                const formJson = Object.fromEntries(
                                    formData.entries()
                                )
                                const boardName = formJson.boardTitle
                                boardCreateRequest(boardName)
                                setCreatePhase(false)
                            }}
                        >
                            <Stack spacing={1}>
                                <Input
                                    placeholder="Board title..."
                                    name="boardTitle"
                                    required
                                />
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    ) : (
                        <Typography
                            sx={{
                                color: "#ffffff",
                                fontSize: "medium",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            Create new board
                        </Typography>
                    )}
                </Paper>
            </Box>
        </>
    )
}

export default CreateBoard
