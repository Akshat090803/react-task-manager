import { useEffect, useState } from "react";
import InputField from "./components/inputField";
import TaskList from "./components/taskList";

function App() {
  
   const storedTasks = localStorage.getItem("tasks"); //fetching Tasks from localStorage
  const [tasks, setTasks] = useState(JSON.parse(storedTasks) || []);
  const [newTaskBool,setNewTaskBool]=useState(false)

 
  useEffect(() => {
    // Save todos/tasks to localStorage whenever todos/tasks change (addition /deletion ) both cases will get handled
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // This runs whenever the 'todos' state changes

  return (
    <>
      <div className="app">
        <h1 className="heading">To Do List</h1>
        <InputField setTasks={setTasks} setNewTaskBool={setNewTaskBool} />
        <TaskList tasks={tasks} setTasks={setTasks} setNewTaskBool={setNewTaskBool}  newTaskBool={newTaskBool} />
      </div>
    </>
  );
}

export default App;
