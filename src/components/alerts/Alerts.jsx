import React, { useEffect, useState } from "react"
import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars(props) {
    const { severity, message, openSnackBar } = props
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Open the snackbar when openSnackBar becomes true
        if (openSnackBar) {
            setOpen(true)
        }
    }, [openSnackBar])

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setOpen(false)
    }

    return (
        <Stack
            spacing={2}
            sx={{
                width: "100%",
                position: "fixed",
                top: 0, // Display at the top
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically
            }}
        >
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    )
}
