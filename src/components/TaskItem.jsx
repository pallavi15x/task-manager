function TaskItem({ task, index, toggleComplete, deleteTask }) {
  return (
    <li style={{ margin: "10px 0" }}>

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          marginRight: "10px"
        }}
      >
        {task.text}
      </span>

      <button onClick={() => toggleComplete(index)}>
        ✔
      </button>

      <button onClick={() => deleteTask(index)}>
        Delete
      </button>

    </li>
  );
}

export default TaskItem;