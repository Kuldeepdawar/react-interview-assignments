import React, { useState } from "react";

const TodosApp = () => {
  // State to hold todos list items
  const [todos, setTodos] = useState([]);

  // State for input field
  const [input, setInput] = useState("");

  // Handle to add a todo
  const handleAddTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(), // Unique ID for each todo
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  // Handle to toggle completed status
  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Handle to delete a todo
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white max-w-md w-full p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

        {/* Input field and Add button */}
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter todos here"
            className="flex-grow border border-gray-300 rounded-l px-4 py-2"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span
                onClick={() => handleToggle(todo.id)}
                className={`cursor-pointer flex-grow ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodosApp;
