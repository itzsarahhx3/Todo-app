// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import {
    Button,
    FormControl,
    InputLabel,
    Input,
    FormHelperText
} from "@material-ui/core";
import firebase from "firebase";

import "./App.css";

import Todo from "./Todo";
import db from "./firebase";

function App() {
    // test todos w/ dummy data first
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    // console.log("input>>", input);

    // when the app loads, we need to listen to the db
    // fetch new todos as they get added/removed
    useEffect(() => {
        // this fires when the app.js loads
        // everytime the db changes, it snaps it and give you that snapshot
        db.collection("todos")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                // this gives back an array
                setTodos(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        todo: doc.data().todo
                    }))
                );
            });
    }, []);

    const addTodo = (event) => {
        event.preventDefault();

        db.collection("todos").add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // keep current todos and add the input
        // setTodos([...todos, input]);
        setInput("");
    };

    return (
        <div className="App">
            <h1>Hello World!!!</h1>
            <form>
                <FormControl>
                    <InputLabel>
                        <span role="img" aria-label="emoji">
                            ✅
                        </span>
                        Write a Todo
                    </InputLabel>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <FormHelperText>We'll make you productive</FormHelperText>
                </FormControl>

                <Button
                    disabled={!input}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={addTodo}
                >
                    Add Todo
                </Button>
            </form>

            <ul>
                {todos.map((todo) => (
                    <Todo todo={todo} />
                ))}
            </ul>
        </div>
    );
}

export default App;
