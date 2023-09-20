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

const AddCard = (props) => {
    const { listId, setTaskCardInfo } = props
    const [cardCreatePhase, setCardCreatePhase] = useState(false)

    const handleCardCreate = () => {
        setCardCreatePhase(true)
    }

    const cardCreateRequest = (cardName) => {
        const url = `https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${token}&name=${cardName}`
        axios
            .post(url)
            .then((response) =>
                setTaskCardInfo((prevValue) => [...prevValue, response.data])
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
                    {cardCreatePhase ? (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                const formData = new FormData(
                                    event.currentTarget
                                )
                                const formJson = Object.fromEntries(
                                    formData.entries()
                                )
                                const cardName = formJson.cardName
                                cardCreateRequest(cardName)
                                setCardCreatePhase(false)
                            }}
                        >
                            <Stack spacing={1}>
                                <Input
                                    placeholder="Card name..."
                                    name="cardName"
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
                                handleCardCreate()
                            }}
                        >
                            + Add another card
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCard
