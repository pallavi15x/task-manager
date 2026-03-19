import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import "./App.css";

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState(""); // ✅ NEW

  const completedTasks = tasks.filter(task => task.completed).length;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // ✅ NEW EDIT FUNCTION
  const editTask = (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  };

  // ✅ NEW FILTER + SEARCH LOGIC
  const filteredTasks = tasks
    .filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      return true;
    });

  return (
    <div className="app">

      <header className="header">
        <h1>Task Manager</h1>
        <p>Organize your daily tasks efficiently</p>
      </header>

      <div className="container">

        <p className="task-count">
          Total Tasks: {tasks.length} | Completed: {completedTasks}
        </p>

        <div className="input-box">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button className="add-btn" onClick={addTask}>
            Add Task
          </button>

        </div>

        <input
  type="text"
  className="search-input"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

       <div className="filters">
  <button 
    className={filter === "all" ? "active" : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button 
    className={filter === "completed" ? "active" : ""}
    onClick={() => setFilter("completed")}
  >
    Completed
  </button>

  <button 
    className={filter === "pending" ? "active" : ""}
    onClick={() => setFilter("pending")}
  >
    Pending
  </button>
</div>

        <ul className="task-list">
  {filteredTasks.length === 0 ? (
    <p style={{ marginTop: "20px", color: "#94a3b8" }}>
      No tasks found 🚫
    </p>
  ) : (
    filteredTasks.map((t, index) => (
      <TaskItem
        key={index}
        task={t}
        index={index}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ))
  )}
</ul>

      </div>

    </div>
  );
}

export default App;