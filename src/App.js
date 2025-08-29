import React, { useState } from 'react';
import CalendarComponent from './components/Calendar';
import TaskManager from './components/TaskManager';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='app'>
      <h1 className='text-center'>React Calendar</h1>
      <CalendarComponent date={date} setDate={setDate} />
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
      <TaskManager selectedDate={date} />
    </div>
  );
}

export default App;