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

const AddCheckItem = (props) => {
    const { checkListId, setCheckItems } = props
    const [checkItemCreatePhase, setCheckItemCreatePhase] = useState(false)

    const handleCheckItemCreate = () => {
        setCheckItemCreatePhase(true)
    }

    const checkItemCreateRequest = (checkItemName) => {
        const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${apiKey}&token=${token}`
        axios
            .post(url)
            .then((response) =>
                setCheckItems((prevValue) => [...prevValue, response.data])
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
                    {checkItemCreatePhase ? (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                const formData = new FormData(
                                    event.currentTarget
                                )
                                const formJson = Object.fromEntries(
                                    formData.entries()
                                )
                                const checkItemName = formJson.checkItemName
                                checkItemCreateRequest(checkItemName)
                                setCheckItemCreatePhase(false)
                            }}
                        >
                            <Stack spacing={1}>
                                <Input
                                    placeholder="Item name..."
                                    name="checkItemName"
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
                                handleCheckItemCreate()
                            }}
                        >
                            + Add item
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCheckItem
