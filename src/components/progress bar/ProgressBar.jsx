import React from "react"
import { Typography, LinearProgress } from "@mui/material"

const ProgressBar = (props) => {
    const { progress } = props

    return (
        <div>
            <Typography>Progress: {Math.floor(progress)}%</Typography>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ width: "100%" }}
            />
        </div>
    )
}

export default ProgressBar
