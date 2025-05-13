import { useState } from "react";

function Todo() {
  // State to hold the todo list items
  const [todos, setTodos] = useState([]);
  // State for the input field
  const [input, setInput] = useState("");

  // Handler to add a todo
  const handleAddTodo = () => {
    if (input.trim() === "") return; // ignore empty
    const newTodo = {
      id: Date.now(), // unique ID
      text: input,
      completed: false,
    };
    setTodos([newTodo, ...todos]); // add new todo at the top
    setInput(""); // clear input
  };

  // Handler to toggle completed status
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  // Handler to delete a todo
  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

        {/* Input field + Add button */}
        <div className="flex mb-4">
          <input
            className="flex-grow p-2 border border-gray-300 rounded-l"
            type="text"
            placeholder="Enter a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 border-b"
            >
              {/* Toggle complete */}
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer flex-grow ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>

              {/* Delete button */}
              <button
                onClick={() => deleteTodo(todo.id)}
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
}

export default Todo;
