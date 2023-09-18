import React from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const TaskCard = (props) => {
    const { cardInfo } = props
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "#323940",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
        color: "#b6c2cf",
    }
    return (
        <>
            <Button onClick={handleOpen}>{cardInfo.name}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {cardInfo.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {cardInfo.desc}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default TaskCard
