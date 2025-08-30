import React, { useState, useEffect } from 'react';
import './TaskManager.css';

function TaskManager({ selectedDate }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    setTasks(storedTasks[selectedDate.toDateString()] || []);
  }, [selectedDate]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    storedTasks[selectedDate.toDateString()] = tasks;
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }, [tasks, selectedDate]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };

  const formattedDate = selectedDate.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className='task-manager'>
      <h2>{formattedDate}</h2>
      <input
        id='task-input'
        type='text'
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder='Добавить новую задачу'
      />
      <button onClick={addTask}>Добавить задачу</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(task)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;