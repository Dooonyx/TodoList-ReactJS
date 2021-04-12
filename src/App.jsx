import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
// import "";

import TodoList from "./components/TodoList";
import StorageService from "./StorageService.js";

const App = () => {
    const [lists, setLists] = useState([]);

    let zIndex = useRef(1);

    // Fonction qui sera déclanchée au chargement du composant
    useEffect(() => {
        //Récupération des données sauvegardées
        const data = StorageService.load();
        setLists([...data]);
    }, []);

    useEffect(() => {
        StorageService.save(lists);
    }, [lists]);

    function addList() {
        lists.push({
            id: nanoid(),
            title: "Nouvelle liste …",
            tasks: [],
            x: 0,
            y: 0,
        });
        setLists([...lists]);
    }

    function removeList(information) {
        let pos = lists.findIndex((list) => list.id === information.id);
        console.log(pos);
        if (pos > -1) {
            lists.splice(pos, 1);
            setLists([...lists]);
            StorageService.save(lists);
        }
    }

    function saveList(updatedTodolist) {
        let pos = lists.findIndex((list) => list.id === updatedTodolist.id);
        if (pos > -1) {
            lists.splice(pos, 1, updatedTodolist);
            StorageService.save(lists);
        }
    }

    function incrementZIndex(newIndex) {
        zIndex.current = newIndex;
    }

    return (
        <>
            <button onClick={addList}>➕ Ajouter une nouvelle liste</button>
            <div className="listdiv">
                {lists.map((todolist) => (
                    <TodoList incrementZIndex={incrementZIndex} zIndex={zIndex} key={todolist.id} onRemove={removeList} todolist={todolist} onChange={saveList} />
                ))}
            </div>
        </>
    );
};

export default App;
