import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"
import Stack from "@mui/material/Stack"
import "../list/List.css"
import config from "../../../config"
import axios from "axios"

const apiKey = config.apiKey
const token = config.token

const CreateList = (props) => {
    const { boardId, setLists } = props
    const [listCreatePhase, setListCreatePhase] = useState(false)

    const handleListCreate = () => {
        setListCreatePhase(true)
    }

    const listCreateRequest = (listName) => {
        const url = `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${apiKey}&token=${token}`
        axios
            .post(url)
            .then((response) =>
                setLists((prevValue) => [...prevValue, response.data])
            )
    }

    return (
        <div className="list-container">
            <Card
                sx={{
                    minWidth: 275,
                    backgroundColor: "#101204",
                    borderRadius: "10px",
                }}
            >
                <CardContent>
                    {listCreatePhase ? (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                const formData = new FormData(
                                    event.currentTarget
                                )
                                const formJson = Object.fromEntries(
                                    formData.entries()
                                )
                                const listName = formJson.listName
                                listCreateRequest(listName)
                                setListCreatePhase(false)
                            }}
                        >
                            <Stack spacing={1}>
                                <Input
                                    placeholder="List name..."
                                    name="listName"
                                    required
                                />
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    ) : (
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                color: "#b6c2cf",
                                fontSize: "medium",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                handleListCreate()
                            }}
                        >
                            + Add another list
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateList
