import React, { useState } from "react"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

const CheckItem = (props) => {
    const { checkItemInfo } = props

    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = (isChecked) => {
        setIsChecked(!isChecked)
    }

    return (
        <>
            <Box sx={{ display: "flex", gap: 3 }}>
                <FormControlLabel
                    checked={isChecked}
                    control={<Checkbox />}
                    label={checkItemInfo.name}
                    onChange={() => handleCheckboxChange(isChecked)}
                />
            </Box>
        </>
    )
}

export default CheckItem
