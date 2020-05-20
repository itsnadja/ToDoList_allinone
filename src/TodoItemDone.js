import React from "react";

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

export default TodoItemDone;
