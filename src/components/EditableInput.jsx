import React, { useState } from "react";

const InlineEditableInput = () => {
  // ✏️ State to track the current text value
  const [text, setText] = useState("kuldeep edt ");

  // 🟡 State to track if input is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  // 🔁 Enable edit mode when text is clicked
  const handleTextClick = () => {
    setIsEditing(true);
  };

  // 🖊️ Update state when input value changes
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // ✅ Exit edit mode on blur (click outside)
  const handleBlur = () => {
    setIsEditing(false);
  };

  // ✅ Exit edit mode when Enter key is pressed
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div style={{ margin: "50px", textAlign: "center" }}>
      {isEditing ? (
        // ✏️ Show input field in edit mode
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus // Automatically focus when input appears
          style={{ fontSize: "16px", padding: "5px" }}
        />
      ) : (
        // 📄 Show plain text when not editing
        <span
          onClick={handleTextClick}
          style={{ cursor: "pointer", fontSize: "16px" }}
          tabIndex={0} // Make focusable for accessibility
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTextClick(); // Allow keyboard editing
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default InlineEditableInput;
