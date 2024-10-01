import React from 'react';
import './App.css';
import Task from './listTask'; 
import { Link } from 'react-router-dom';
import { useLanguage } from './languageContext';
import { useTasks } from './TaskProvider'; 
 

function App() {
  const { language } = useLanguage();
  const { taskList, GetTasks, onFormSubmit, toggleComplete, deleteTask } = useTasks();  

  const translations = {
    en: {
      complete: 'Complete',
      Redact: 'Redact',
      remove: "Remove",
      title1: 'Person name:',
      // Languagetoggle: 'Switch language',
      Languagetoggle2: 'get your info back',
      Languagetoggle3: 'Submit',
      Languagetoggle4: 'Task name:',
      Languagetoggle5: 'isCompleted?:'
    },
    ge: {
      complete: 'შესრულება',
      Redact: 'რედაქტირება',
      remove: "წაშლა",
      title1: 'თქვენი სახელი',
      // Languagetoggle: 'ენის შეცვლა',
      Languagetoggle2: 'ინფორმაციის დაბრუნება',
      Languagetoggle3: 'ინფორმაციის შეყვანა',
      Languagetoggle4: 'ტასკის სახელი:',
      Languagetoggle5: 'შესტულებულია?:'
    }
  };
 
 

  return (
    <div className='App'>
 
      <Task onFormSubmit={onFormSubmit} />
      <button onClick={GetTasks}>{translations[language].Languagetoggle2}</button>
      {/* <button onClick={toggleLanguage}>{translations[language].Languagetoggle}</button> */}

      {taskList.map(task => (
        <div key={task.uuid} className='div1'>
          <h3>{translations[language].title1} {task.Person}</h3>
          <h3>{translations[language].Languagetoggle4} {task.Task}</h3>
          <h3>{translations[language].Languagetoggle5} {task.isCompleted ? "completed" : 'isNot'}</h3>
          <Link to='/custom'>{translations[language].Redact}</Link>
          <button onClick={() => toggleComplete(task.uuid, task.isCompleted)}>
            {task.isCompleted ? 'Incomplete' : 'Complete'}
          </button>
          <button onClick={() => deleteTask(task.uuid)}>{translations[language].remove}</button>
        </div>
      ))}
      <hr />
    </div>
  );
}

export default App;
