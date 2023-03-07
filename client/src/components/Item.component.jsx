import React, { useState } from "react";

const Item = props => {
    const { id, title, status } = props;
    const [isChecked, setIsChecked] = useState(status === "done");

    const checkHandler = e => {
        setIsChecked(e.target.checked);
    };

    return (
        <li className="item" key={id}>
            <div className="info">
                <input type="checkbox" checked={isChecked} onChange={checkHandler} />
                <span>{title}</span>
            </div>
            <div className="actions">
                <button>✍</button>
                <button>❌</button>
            </div>
        </li>
    );
};

export default Item;
