import React, { useState } from 'react';
import CalendarComponent from './components/Calendar/Calendar';
import TaskManager from './components/TaskManager/TaskManager';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='app'>
      <div className='container' >
        <CalendarComponent date={date} setDate={setDate} />
        <TaskManager selectedDate={date} />
      </div>
    </div>
  );
}

export default App;