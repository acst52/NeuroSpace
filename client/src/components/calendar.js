import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Calendar() {
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2023-05-12' },
    { title: 'Event 2', date: '2023-05-11' }
  ]);

  const handleDateClick = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = { title, date: arg.dateStr };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="contentBody">
      <h1 className="title">DASHBOARD - Calendar</h1>
      <section className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
        />
      </section>
    </div>
  );
}

export default Calendar;

