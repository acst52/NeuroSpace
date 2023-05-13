import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@apollo/client';
import Donation from './donation';

import { EVENTQUERY } from '../utils/queries';

function Calendar({ id }) {
  const { loading, error, data } = useQuery(EVENTQUERY, {
    variables: { id },
  });

  const [currentView, setView] = useState('dayGridMonth');
  const [events, setEvents] = useState([]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const eventData = data.event;

  const formattedData = eventData.map((item) => ({
    title: item.title,
    start: item.startDate,
    end: item.endDate,
  }));

  const addEvent = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = { title, start: arg.date, end: arg.date };
      setEvents([...events, newEvent]);
    }
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  return (
    <div className="contentBody">
      <h1 className="title">DASHBOARD - Schedule</h1>
      <section className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          dateClick={addEvent} // Call addEvent function on date click
          initialView={currentView}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          weekends={true}
          events={[...formattedData, ...events]} // Combine formattedData and events array for display
          slotDuration="01:00:00"
          slotLabelInterval={{ minutes: 60 }}
        />
      </section>
      <Donation />
    </div>
  );
}

export default Calendar;


