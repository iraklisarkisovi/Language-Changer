import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const apikey = "ozJ7IU4PCyfPZXHEVBbVz7E4-kkXsTSfXPcQFXY9ovNpCqXrng";
  const [taskList, setTaskList] = useState([]);

  const GetTasks = () => {
    fetch('https://crudapi.co.uk/api/v1/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('response failed');
        return res.json();
      })
      .then(data =>
        setTaskList(
          data.items.map(task => ({
            Person: task.Person,
            Task: task.Task,
            uuid: task._uuid,
            isCompleted: task.isCompleted
          }))
        )
      )
      .catch(err => console.log(err));
  };

  const onFormSubmit = (Task, Person) => {
    fetch('https://crudapi.co.uk/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`
      },
      body: JSON.stringify([{ Person, Task, isCompleted: false }])
    })
      .then(res => {
        if (!res.ok) throw new Error('response failed');
        return res.json();
      })
      .then(data =>
        setTaskList(prev => [
          ...prev,
          {
            Person: data.items[0].Person,
            Task: data.items[0].Task,
            uuid: data.items[0]._uuid,
            isCompleted: data.items[0].isCompleted
          }
        ])
      )
      .catch(err => console.log(err));
  };

  const toggleComplete = (uuid, isCompleted) => {
    fetch(`https://crudapi.co.uk/api/v1/tasks/${uuid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`
      },
      body: JSON.stringify({ isCompleted: !isCompleted })
    })
      .then(res => {
        if (!res.ok) throw new Error('response failed');
        return res.json();
      })
      .then(() => {
        setTaskList(taskList.map(task =>
          task.uuid === uuid ? { ...task, isCompleted: !task.isCompleted } : task
        ));
      })
      .catch(err => console.log(err));
  };

  const deleteTask = uuid => {
    fetch(`https://crudapi.co.uk/api/v1/tasks/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('response failed');
        return res.json();
      })
      .then(() => {
        setTaskList(taskList.filter(task => task.uuid !== uuid));
      })
      .catch(err => console.log(err));
  };

  return (
    <TaskContext.Provider value={{ taskList, GetTasks, onFormSubmit, toggleComplete, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
