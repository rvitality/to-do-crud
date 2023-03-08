import React, { useEffect, useState } from "react";
import axios from "axios";

const Item = props => {
    const { item, onEdit, onDelete } = props;
    const { id, title, status } = item;

    const [isChecked, setIsChecked] = useState(status === "done");

    useEffect(() => {
        setIsChecked(status === "done");
    }, [status]);

    const checkHandler = async e => {
        setIsChecked(e.target.checked);

        const item = {
            id,
            title,
            status: e.target.checked ? "done" : "pending",
        };
        console.log(item.status);

        // setList(prevState => prevState.map(el => (el.id === id ? item : el)));

        try {
            const res = await axios.put(`http://localhost:8800/api/list/${id}`, item);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <li className="item" key={id}>
            <div className="info">
                <input type="checkbox" checked={isChecked} onChange={checkHandler} />
                <span>{title}</span>
            </div>
            <div className="actions">
                <button onClick={onEdit}>✍</button>
                <button onClick={onDelete}>❌</button>
            </div>
        </li>
    );
};

export default Item;
