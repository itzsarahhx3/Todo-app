import React, { useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Button,
    Modal,
    Input
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Todo.css";
// import { makeStyles } from "@material-ui/core/styles";

import db from "./firebase";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "relative",
        left: 400,
        // position: "center",
        width: 600,
        backgroundColor: theme.palette.background.paper,
        // border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },

    button: {
        width: 150,
        // border: '2px solid #000',
        margin: "10px"
    }
}));

const Todo = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        // setOpen(true);
        db.collection("todos").doc(props.todo.id).set(
            {
                todo: input
            },
            // prevents you to overwrite/remove it, instead update it
            { merge: true }
        );
        setOpen(false);
    };
    return (
        <>
            <Modal open={open} onClose={(e) => setOpen(false)}>
                <div className={classes.paper}>
                    <h3>Update the Task</h3>
                    <input
                        placeholder={props.todo.todo}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="default"
                        onClick={updateTodo}
                        className={classes.button}
                    >
                        Update ✔
                    </Button>
                </div>
            </Modal>
            <List className="todo__list">
                <ListItem>
                    <ListItemAvatar></ListItemAvatar>
                    <ListItemText
                        primary={props.todo.todo}
                        secondary="Uploaded Task 🤞 "
                    />
                </ListItem>

                <button onClick={(e) => setOpen(true)}>Edit</button>

                <Button
                    onClick={(e) =>
                        db.collection("todos").doc(props.todo.id).delete()
                    }
                >
                    DELETE
                </Button>
            </List>
        </>
    );
};

export default Todo;
