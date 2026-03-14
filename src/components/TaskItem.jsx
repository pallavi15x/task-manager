function TaskItem({ task, index, toggleComplete, deleteTask }) {
  return (
    <li className="task-item">
      <span
        onClick={() => toggleComplete(index)}
        className={task.completed ? "completed" : ""}
      >
        {task.text}
      </span>

      <button onClick={() => deleteTask(index)} className="delete-btn">
        Delete
      </button>
    </li>
  );
}

export default TaskItem;