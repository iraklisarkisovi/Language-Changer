import { useState } from 'react';
import './App.css';
import Task from './Todo app/listTask';
import { Link } from 'react-router-dom';

const apikey = "ozJ7IU4PCyfPZXHEVBbVz7E4-kkXsTSfXPcQFXY9ovNpCqXrng";

function App() {
  const [taskList, setTaskList] = useState([]);
 
  const GetTasks = () => {
    fetch('https://crudapi.co.uk/api/v1/tasks', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("response failed");
        return res.json();
      })
      .then(data => setTaskList(data.items.map(task => {
        return {
          Person: task.Person,
          Task: task.Task,
          uuid: task._uuid,
          isCompleted: task.isCompleted 
        };
      })))
      .catch(err => console.log(err));
  };

  const onFormSubmit = (Task, Person) => {
    fetch('https://crudapi.co.uk/api/v1/tasks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      },
      body: JSON.stringify([{ Person, Task, isCompleted: false }])  
    })
      .then(res => {
        if (!res.ok) throw new Error("response failed");
        return res.json();
      })
      .then(data => setTaskList((prev) => [
        ...prev,
        {
          Person: data.items[0].Person,
          Task: data.items[0].Task,
          uuid: data.items[0]._uuid,
          isCompleted: data.items[0].isCompleted
        }
      ]))
      .catch(err => console.log(err));
  };

  const toggleComplete = (uuid, isCompleted) => {
    fetch(`https://crudapi.co.uk/api/v1/tasks/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      },
      body: JSON.stringify({ isCompleted: !isCompleted })
    })
      .then(res => {
        if (!res.ok) throw new Error("response failed");
        return res.json();
      })
      .then(() => {
        setTaskList(taskList.map(task =>
          task.uuid === uuid ? { ...task, isCompleted: !task.isCompleted } : task
        ));
      })
      .catch(err => console.log(err));
  };

  const deleteTask = (uuid) => {
    fetch(`https://crudapi.co.uk/api/v1/tasks/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      },
    })
    .then(res => {
      if (!res.ok) throw new Error("response failed");
      return res.json();
    })
    .then(() => {
      setTaskList(taskList.filter(task => task.uuid !== uuid));
    })
    .catch(err => console.log(err));
  };

  return (
    <>
      <div className='App'>
        <Task onFormSubmit={onFormSubmit} />
        <button onClick={GetTasks}>Get tasks back from the server</button>

        {taskList.map((task) => (
          <div key={task.uuid} className='div1'>
            <h3>Person name: {task.Person}</h3>
            <h3>Task: {task.Task}</h3>
            <h3>isCompleted: {task.isCompleted ? 'Yes' : 'No'}</h3>
            <Link to='/custom'>Redact</Link>
            
            <button onClick={() => toggleComplete(task.uuid, task.isCompleted)}>
              {task.isCompleted ? 'Incomplete' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.uuid)}>Remove</button>
          </div>
        ))}
        <hr />
      </div>
    </>
  );
}

export default App;
