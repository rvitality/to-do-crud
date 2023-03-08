import React, { useEffect, useState } from "react";
import axios from "axios";

import Item from "./components/Item.component";

import "./App.scss";

const App = () => {
    const [list, setList] = useState([]);
    const [itemId, setItemId] = useState("");
    const [title, setTitle] = useState("");
    const [isDone, setIsDone] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/list");
                setList(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getList();
    }, []);

    const submitHandler = async e => {
        e.preventDefault();

        if (!title) return;

        // UPDATE ITEM
        if (isEditing) {
            const item = {
                id: itemId,
                title,
                status: isDone ? "done" : "pending",
            };
            console.log(item.status);

            setList(prevState => prevState.map(el => (el.id === itemId ? item : el)));

            try {
                const res = await axios.put(`http://localhost:8800/api/list/${itemId}`, item);
            } catch (err) {
                console.log(err);
            }
        } else {
            //  ADD NEW ITEM
            const item = {
                id: Math.random(),
                title,
                status: isDone ? "done" : "pending",
            };

            setList(prevState => [item, ...prevState]);

            try {
                const res = await axios.post("http://localhost:8800/api/list/add", item);
            } catch (err) {
                console.log(err);
            }
        }

        setTitle("");
        setIsDone(false);
        setIsEditing(false);
    };

    const updateHandler = async item => {
        const { id, title, status } = item;
        setIsEditing(true);
        setTitle(title);
        setIsDone(status === "done");
        setItemId(id);
    };

    const cancelEditHandler = () => {
        setIsEditing(false);
        setTitle("");
        setIsDone(false);
    };

    const deleteHandler = async itemId => {
        try {
            await axios.delete(`http://localhost:8800/api/list/${itemId}`);
        } catch (err) {
            console.log(err);
        }

        setList(prevState => prevState.filter(item => item.id !== itemId));
    };

    return (
        <main className="app">
            <div className="cover"></div>

            <div className="container">
                <h1>To-Do</h1>

                <form className="form" onSubmit={submitHandler}>
                    <input
                        type="checkbox"
                        name="status"
                        checked={isDone}
                        onChange={e => setIsDone(e.target.checked)}
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Type something..."
                        className="title"
                        value={title}
                        required
                        onChange={e => setTitle(e.target.value)}
                    />

                    <div className="actions">
                        <button type="submit">{!isEditing ? "➕" : "✅"}</button>
                        {isEditing && <button onClick={cancelEditHandler}>🚫</button>}
                    </div>
                </form>

                <div>
                    <ul className="list">
                        {list.length > 0 &&
                            list.map(item => (
                                <Item
                                    key={item.id}
                                    onEdit={() => updateHandler(item)}
                                    onDelete={() => deleteHandler(item.id)}
                                    item={item}
                                />
                            ))}
                    </ul>
                </div>

                <div className="filter"></div>
            </div>
        </main>
    );
};

export default App;
