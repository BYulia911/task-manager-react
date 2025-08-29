import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent({ date, setDate }) {
  return (
    <div className='calendar-container'>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}

export default CalendarComponent;