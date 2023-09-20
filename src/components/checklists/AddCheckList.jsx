import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"
import Stack from "@mui/material/Stack"
import config from "../../../config"
import axios from "axios"
import "../list/List.css"

const apiKey = config.apiKey
const token = config.token

const AddCheckList = (props) => {
    const { cardId, setCheckList } = props
    const [checkListCreatePhase, setCheckListCreatePhase] = useState(false)

    const handleCheckListCreate = () => {
        setCheckListCreatePhase(true)
    }

    const checkListCreateRequest = (checkListName) => {
        const url = `https://api.trello.com/1/checklists?idCard=${cardId}&key=${apiKey}&token=${token}&name=${checkListName}`
        axios
            .post(url)
            .then((response) =>
                setCheckList((prevValue) => [...prevValue, response.data])
            )
    }

    return (
        <div className="card-container">
            <Card
                sx={{
                    minWidth: 275,
                    backgroundColor: "#101204",
                    borderRadius: "10px",
                }}
            >
                <CardContent>
                    {checkListCreatePhase ? (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                const formData = new FormData(
                                    event.currentTarget
                                )
                                const formJson = Object.fromEntries(
                                    formData.entries()
                                )
                                const checkListName = formJson.checkListName
                                checkListCreateRequest(checkListName)
                                setCheckListCreatePhase(false)
                            }}
                        >
                            <Stack spacing={1}>
                                <Input
                                    placeholder="Card name..."
                                    name="checkListName"
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
                                handleCheckListCreate()
                            }}
                        >
                            + Add another checklist
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCheckList
