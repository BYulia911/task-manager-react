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
      const newTask = { text: taskInput, completed: false };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (taskToToggle) => {
    setTasks(tasks.map(task => 
      task.text === taskToToggle.text ? { ...task, completed: !task.completed } : task
    ));
  };

  const formattedDate = selectedDate.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className='task-manager'>
      <h2 className='date'>{capitalizedDate}</h2>
      <input
        id='task-input'
        className='task-input'
        type='text'
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder='Добавить новую задачу'
      />
      <button className='add-button' onClick={addTask}>Добавить задачу</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className='task-item'>
            <input
              id='task-completed'
              className='task-completed'
              type='checkbox'
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task)}
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            <button className='delete-button' onClick={() => deleteTask(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;