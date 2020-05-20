import React, { useState, useEffect } from "react";
import "./styles.css";

let initialState = [{ id: 0, label: "Create to-do-list :-)", done: false }];

const todosAsString = localStorage.getItem("todos");
//console.log("get");
if (todosAsString) {
  initialState = JSON.parse(todosAsString);
}

export default function App() {
  const [todos, setTodos] = useState(initialState);

  const [newTodoId, setNewTodoId] = useState(0);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    setNewTodoId(newTodoId => newTodoId + 1);
  }, [todos]);

  function todoItemDone(id) {
    const todoDone = todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    const todosAsString = JSON.stringify(todoDone);
    localStorage.setItem("todos", todosAsString);

    setTodos(todoDone);
  }

  function deleteTodoItem(id) {
    const deleteTodo = todos.filter(todo => todo.id !== id);

    const todosAsString = JSON.stringify(deleteTodo);
    localStorage.setItem("todos", todosAsString);

    setTodos(deleteTodo);
  }

  function addTodoItem() {
    const newTodos = [
      ...todos,
      {
        id: newTodoId,
        label: newTodo,
        done: false
      }
    ];

    const todosAsString = JSON.stringify(newTodos);
    localStorage.setItem("todos", todosAsString);
    setTodos(newTodos);
    //console.log("set");

    setNewTodo("");
  }

  return (
    <div className="App">
      <h1>To-Do-List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={({ target }) => todoItemDone(todo.id, target.checked)}
              label={todo.label}
            />
            <span className={todo.done ? "done" : ""}>{todo.label}</span>
            <button
              className="btnDelete"
              onClick={() => deleteTodoItem(todo.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="add">
        <input
          type="text"
          value={newTodo}
          onChange={({ target }) => setNewTodo(target.value)}
        />
        <button className="btnAdd" onClick={addTodoItem}>
          Add
        </button>
      </div>
    </div>
  );
}
