import React, { useEffect, useReducer, useState } from "react"
import { Typography } from "@mui/material"
import CheckList from "../checklist/CheckList"
import AddCheckList from "./AddCheckList"
import config from "../../../config"
import axios from "axios"
import { ACTIONS, reducer, initialState } from "../../reducer/reducer"
import Alert from "../alerts/Alerts"

const apiKey = config.apiKey
const token = config.token

const CheckLists = (props) => {
    const { cardId } = props
    const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${token}`

    const [state, dispatch] = useReducer(reducer, initialState)
    const [errorResp, setErrorResp] = useState(false)

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                dispatch({
                    type: ACTIONS.SET_CHECKLISTS,
                    payload: response.data,
                })
            })
            .catch(() => {
                setErrorResp(true)
            })
    }, [])

    return (
        <>
            <Typography sx={{}}>Check lists</Typography>
            {errorResp ? (
                <Alert
                    severity="error"
                    message="Error fetching data"
                    openSnackBar={errorResp}
                />
            ) : null}
            {state.checkList.map((list) => {
                return (
                    <CheckList
                        key={list.id}
                        checkListId={list.id}
                        checkListName={list.name}
                        cardId={cardId}
                    />
                )
            })}
            <AddCheckList cardId={cardId} dispatch={dispatch} />
        </>
    )
}

export default CheckLists
