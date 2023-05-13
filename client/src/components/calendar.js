import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@apollo/client';
import Donation from './donation';

import { SCHEDULEQUERY } from '../utils/queries';

function Calendar({ id }) {


  const { loading, error, data } = useQuery(SCHEDULEQUERY, {
    variables: { id },
  });

  const [view, setView] = useState('dayGridWeek');
  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: '2023-05-12T10:00:00',
      end: '2023-05-12T12:00:00',
    },
    {
      title: 'Event 2',
      start: '2023-05-11T:014:000',
      end: '2023-05-11T16:00:00',
    },
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const eventData = data.schedule.events;

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

  return (
    <div className="contentBody">
      <h1 className="title">DASHBOARD - Schedule</h1>
      <section className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          dateClick={handleDateClick}
          initialView="timeGridDay"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          weekends={true}
          events={eventData}
          slotDuration="01:00:00"
          slotLabelInterval={{ minutes: 60 }}
        />
      </section>
      <Donation />
    </div>
  );
}

export default Calendar;
