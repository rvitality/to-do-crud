import React, { useState } from "react";

import Item from "./components/Item.component";

import "./App.scss";

const DUMMY = [
    {
        id: 1,
        title: "Drink water.",
        status: "done",
    },
    {
        id: 2,
        title: "Run for 2KM.",
        status: "not-done",
    },
    {
        id: 3,
        title: "Take out trash.",
        status: "done",
    },
    {
        id: 4,
        title: "Charge battery.",
        status: "not-done",
    },
];

const App = () => {
    const [list, setList] = useState(DUMMY);
    const [title, setTitle] = useState("");
    const [isDone, setIsDone] = useState(false);

    const addItemHandler = e => {
        e.preventDefault();

        const item = {
            id: Math.random(),
            title,
            status: isDone ? "done" : "pending",
        };
        setList(prevState => [item, ...prevState]);

        setTitle("");
        setIsDone(false);
    };

    return (
        <main className="app">
            <div className="cover"></div>

            <div className="container">
                <h1>To-Do</h1>

                <form className="form" onSubmit={addItemHandler}>
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
                        onChange={e => setTitle(e.target.value)}
                    />

                    <button type="submit">➕</button>
                </form>

                <div>
                    <ul className="list">
                        {list.length > 0 && list.map(item => <Item key={item.id} {...item} />)}
                    </ul>
                </div>

                <div className="filter"></div>
            </div>
        </main>
    );
};

export default App;
