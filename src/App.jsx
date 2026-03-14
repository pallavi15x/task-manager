import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import "./App.css";

function App() {
  const [task, setTask] = useState("");

 const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
const completedTasks = tasks.filter(task => task.completed).length;

});
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

  return (
<div className="container">
      <h1> MY Task Manager</h1>
<p className="task-count">
Total Tasks: {tasks.length} | Completed: {completedTasks}
</p>
     
     <div className="input-box">

<input
  type="text"
  placeholder="Enter task"
  value={task}
  onChange={(e) => setTask(e.target.value)}
/>

<button className="add-btn" onClick={addTask}>
Add
</button>

</div>

      <ul>
        {tasks.map((t, index) => (
          <TaskItem
            key={index}
            task={t}
            index={index}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </ul>

    </div>
  );
}

export default App;