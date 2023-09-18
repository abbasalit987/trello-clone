import React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import "./List.css"
import TaskCard from "../cards/TaskCards"

const List = (props) => {
    const { listInfo } = props
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
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            color: "#b6c2cf",
                            fontSize: "medium",
                            fontWeight: "bold",
                        }}
                    >
                        {listInfo.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <TaskCard listId={listInfo.id} />
                </CardActions>
            </Card>
        </div>
    )
}

export default List
