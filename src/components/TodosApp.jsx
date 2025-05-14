// Import React and hooks from React
import React, { useState, useRef, useEffect } from "react";

// Functional Component
const TodosApp = () => {
  // State to store the list of todos
  const [todos, setTodos] = useState([]);

  // State for the input value (new todo text)
  const [input, setInput] = useState("");

  // State to keep track of the todo currently being edited
  const [editId, setEditId] = useState(null);

  // State to hold the temporary edited text
  const [editText, setEditText] = useState("");

  // Ref to focus the input field when page loads or when adding todos
  const inputRef = useRef(null);

  // Ref to focus the edit input when editing starts
  const editInputRef = useRef(null);

  // Focus the add input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus the edit input whenever edit mode is triggered
  useEffect(() => {
    if (editId !== null) {
      editInputRef.current?.focus();
    }
  }, [editId]);

  // Utility function to clean and format text (capitalize first letter, remove extra spaces)
  const formatInput = (text) => {
    const cleaned = text.replace(/\s+/g, " ").trim();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  // Function to add a new todo
  const handleAddTodo = () => {
    const cleanedText = formatInput(input); // clean user input

    // If input is empty after cleaning, do nothing
    if (cleanedText === "") return;

    // Create a new todo object
    const newTodo = {
      id: Date.now(), // unique ID
      text: cleanedText, // todo text
      completed: false, // initially not completed
    };

    // Add new todo to the list
    setTodos((prev) => [...prev, newTodo]);

    // Reset input and refocus
    setInput("");
    inputRef.current?.focus();
  };

  // Toggle completed state of a todo
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo from the list
  const handleDeleteTodo = (id) => {
    // Remove the selected todo
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    // If the deleted todo is being edited, exit edit mode
    if (editId === id) {
      setEditId(null);
      setEditText("");
    }
  };

  // Enter edit mode for a specific todo
  const handleEdit = (id, currentText) => {
    setEditId(id); // Set the todo being edited
    setEditText(currentText); // Pre-fill edit input with current text
  };

  // Save the edited todo text
  const handleEditSave = (id) => {
    const cleanedText = formatInput(editText); // clean edited text

    // Do nothing if cleaned text is empty
    if (cleanedText === "") return;

    // Update the text of the selected todo
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: cleanedText } : todo
      )
    );

    // Exit edit mode
    setEditId(null);
    setEditText("");
  };

  // Cancel editing (reset state)
  const handleEditCancel = () => {
    setEditId(null);
    setEditText("");
  };

  // Handle keyboard shortcuts inside the edit field
  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleEditSave(id); // Save on Enter
    } else if (e.key === "Escape") {
      handleEditCancel(); // Cancel on Escape
    }
  };

  // Handle Enter key for the add input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo(); // Add todo on Enter
    }
  };

  // Component UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Container box */}
      <div className="bg-white max-w-md w-full p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

        {/* Input field and Add button */}
        <div className="flex mb-4">
          <input
            ref={inputRef} // Set focus on mount
            type="text"
            value={input} // Controlled input value
            onChange={(e) => setInput(e.target.value)} // Update state on change
            onKeyDown={handleKeyPress} // Handle Enter key
            placeholder="Enter todos here"
            className="flex-grow border border-gray-300 rounded-l px-4 py-2"
          />
          <button
            onClick={handleAddTodo} // Add todo on click
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet. Add one!</p>
        ) : (
          <ul>
            {/* Loop through todos */}
            {todos.map((todo) => (
              <li
                key={todo.id} // Unique key for each todo
                className="flex justify-between items-center border-b py-2"
              >
                {/* If editing this todo, show input */}
                {editId === todo.id ? (
                  <>
                    <input
                      ref={editInputRef} // Focus this input on edit
                      type="text"
                      value={editText} // Controlled edit input
                      onChange={(e) => setEditText(e.target.value)} // Update editText
                      onKeyDown={(e) => handleEditKeyDown(e, todo.id)} // Enter/Escape keys
                      className="flex-grow border border-gray-300 px-2 py-1 mr-2 rounded"
                    />
                    <button
                      onClick={() => handleEditSave(todo.id)} // Save edited text
                      className="text-green-500 hover:text-green-700 px-1"
                    >
                      ✔
                    </button>
                    <button
                      onClick={handleEditCancel} // Cancel edit mode
                      className="text-gray-500 hover:text-gray-700 px-1"
                    >
                      ✖
                    </button>
                  </>
                ) : (
                  <>
                    {/* Display todo text (with line-through if completed) */}
                    <span
                      onClick={() => handleToggle(todo.id)} // Toggle completed
                      title={todo.text}
                      className={`cursor-pointer flex-grow truncate pr-2 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </span>

                    {/* Edit button */}
                    <button
                      onClick={() => handleEdit(todo.id, todo.text)} // Enter edit mode
                      className="text-yellow-500 hover:text-yellow-700 px-1"
                    >
                      ✎
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteTodo(todo.id)} // Delete todo
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ✕
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Export the component
export default TodosApp;
