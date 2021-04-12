// import "./App.css";
import { useState, useRef, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { nanoid } from "nanoid";
import EditableField from "./EditableField";
import Draggable from "react-draggable";

function TodoList(props) {
    const [todolist, setTodolist] = useState(props.todolist);

    useEffect(() => {
        props.onChange(todolist);
    }, [todolist, props]);

    function changeListTitle(newTitle) {
        todolist.title = newTitle;
        setTodolist({ ...todolist });
    }

    function updateTask(initialTask, updates) {
        let pos = todolist.tasks.indexOf(initialTask);
        if (pos > -1) {
            let taskUpdate = { ...initialTask, ...updates };
            todolist.tasks.splice(pos, 1, taskUpdate);
            setTodolist({ ...todolist });
        }
    }

    // function onCheck(task) {
    //     task.isDone = !task.isDone;
    //     setTasks([...tasks]);
    // }

    function onAddTask(title) {
        todolist.tasks.push({
            id: nanoid(),
            title: title,
            isDone: false,
        });

        setTodolist({ ...todolist });
    }

    function removeTask(task) {
        let pos = todolist.tasks.indexOf(task);
        if (pos > -1) {
            todolist.tasks.splice(pos, 1);
            setTodolist({ ...todolist });
        }
    }

    function onRemove() {
        props.onRemove(todolist);
    }

    function savePosition(_, { x, y }) {
        todolist.x = x;
        todolist.y = y;
        setTodolist({ ...todolist });
    }

    function setTop(_, { node }) {
        node.style.zIndex = props.zIndex.current;
        props.incrementZIndex(props.zIndex.current + 1);
    }

    const nbDone = todolist.tasks.filter((task) => task.isDone === true).length;

    let taskMsg = `${nbDone}/${todolist.tasks.length} effectuer`;

    if (todolist.tasks.length === 0) {
        taskMsg = "Pas de tâche";
    }
    if (nbDone === todolist.tasks.length && nbDone > 0) {
        taskMsg = `Vous avez terminé toutes vos tâches ! (${nbDone}/${todolist.tasks.length})`;
    }

    return (
        <Draggable defaultPosition={{ x: todolist.x, y: todolist.y }} onStart={setTop} onStop={savePosition} bounds="body" handle=".drag-Handle">
            <div className="TodoApp">
                <div className="drag-Handle">
                    <EditableField value={todolist.title} editMode={false} onValueChange={changeListTitle} />
                </div>
                <button title="Supprimer cette liste" className="button-icon button-delete" onClick={onRemove}>
                    ❌
                </button>
                {/* <span className="drag-Handle">🤞</span> */}

                <TaskForm onAddTask={onAddTask} />
                <p>{taskMsg}</p>
                <ul>
                    {todolist.tasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} onUpdate={updateTask} onRemove={removeTask} />
                    ))}
                </ul>
            </div>
        </Draggable>
    );
}

export default TodoList;
