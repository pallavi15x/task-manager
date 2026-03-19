import { useState } from "react";

function TaskItem({ task, index, toggleComplete, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (newText.trim() === "") return;
    editTask(index, newText);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span
  onClick={() => toggleComplete(index)}
  className={task.completed ? "completed" : ""}
>
  {task.completed ? "✅ " : "⏳ "} {task.text}
</span>
      )}

      <div className="buttons">
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button onClick={() => deleteTask(index)} className="delete-btn">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;