import { useState } from 'react';
import './App.css';
import Task from './Todo app/listTask';

const apikey = "ozJ7IU4PCyfPZXHEVBbVz7E4-kkXsTSfXPcQFXY9ovNpCqXrng"

function App() {
    const [taskList, setTaskList] = useState([])
  

    const GetTasks = () => {
      fetch('https://crudapi.co.uk/api/v1/tasks', {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apikey} `
        }
      })
      .then(res => {
        if(!res.ok) throw new Error("response failed");
        return res.json()
      })
      .then(data => setTaskList(data.items.map(data => {
        return{
          Task: data.Task, 
          uuid: data._uuid
        }
      })))
      .catch(err => console.log(err))
      }

    const onFormSubmit = (Task) => {
      fetch('https://crudapi.co.uk/api/v1/tasks', {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apikey} `
        },
        body: JSON.stringify([{Task}])
      })
      .then(res => {
        if(!res.ok) throw new Error("response failed");
        return res.json()
      })
      .then(data => setTaskList((prev) => [...prev, {Task: data.items[0].Task, 
      uuid: data.items[0]._uuid}]))
      .catch(err => console.log(err))
    }

    const True = "true"
    const False = "false"

  return (
    <>
      <div className='App'>
        <Task onFormSubmit={onFormSubmit}/>
        <button onClick={GetTasks}>Get tasks back from the server</button>

        {taskList.map((task) => <div key={task.uuid} className='div1'>
              <h3>name: {task.Task}</h3>
              <h3>isCompleted: {False}</h3>
              <button>Complete</button>
            </div>
        )}
        <hr />
      </div>
    </>
  );
}

export default App;
