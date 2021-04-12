import React from "react";
import { useState, useRef } from "react";

const EditableField = (props) => {
    const [editMode, setEditMode] = useState(props.editMode);
    const value = props.value;

    const input = useRef();

    function onEdit() {
        setEditMode((prevMode) => !prevMode);
    }

    function finishEdit() {
        setEditMode(false);
        props.onValueChange(input.current.value);
    }

    function onKeyDown(event) {
        if (event.key === "Entrer") {
            finishEdit();
        }
    }

    return (
        <>
            {editMode ? <input type="text" defaultValue={value} ref={input} onBlur={finishEdit} onKeyDown={onKeyDown} /> : value}

            <button title="Modifier" className="button-icon" onClick={onEdit}>
                {!editMode ? "✏" : "✔"}
            </button>
        </>
    );
};

export default EditableField;
