import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import Donation from "./donation";
import { useMutation } from '@apollo/client';
import { CREATESCHEDULE } from '../mutations';

Modal.setAppElement('#root');
const weekStartDate = "2023-05-12T10:00:00";

function Calendar() {
  const [events, setEvents] = useState([
    { title: 'Event 1', start: '2023-05-12T10:00:00', end: '2023-05-12T12:00:00' },
    { title: 'Event 2', start: '2023-05-11T14:00:00', end: '2023-05-11T16:00:00' }
  ]);

  const [createSchedule] = useMutation(CREATESCHEDULE);

  const [view, setView] = useState('dayGridWeek');

  const handleDateClick = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = { title, start: arg.date, end: arg.date };
      setEvents([...events, newEvent]);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleCreateCalendar = async (event) => {
    event.preventDefault();
    const createScheduleRes = await createSchedule({
      variables: { weekStartDate },
    });
    const id = createScheduleRes.data.createSchedule._id;
    console.log(`Created schedule with ID: ${id}`);
  };

  return (
    <div className="contentBody">
      <h1 className="title">DASHBOARD - Calendar</h1>
      <section className="calendar">
        <button onClick={handleCreateCalendar}>Create Calendar</button>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          dateClick={handleDateClick}
          initialView={view}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          weekends={true}
          events={events}
        />
      </section>
      <Donation />
    </div>
  );
}

export default Calendar;
