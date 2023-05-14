import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery, useMutation } from '@apollo/client';
import Donation from './donation';

import { EVENTQUERY } from '../utils/queries';
import { CREATEEVENT } from '../mutations';

function Calendar({ id }) {
  console.log(id);
  const { loading, error, data } = useQuery(EVENTQUERY, {
    variables: { id },
  });
  const [createEvent] = useMutation(CREATEEVENT);

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

  const handleDateSelect = async (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      const startDate = arg.startStr;
      const endDate = arg.endStr;
      const description = '';
      const scheduleId = id;
      const mutationResponse = await createEvent({
        variables: { title, startDate, endDate, scheduleId, description },
      });
      const newEvent = {
        title,
        start: startDate,
        end: endDate,
      };
  
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="contentBody">
      <h1 className="title">DASHBOARD - Schedule</h1>
      <section className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          //dateClick={addEvent} // Call addEvent function on date click
          initialView={currentView}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          weekends={true}
          selectable={true}
          select={handleDateSelect}
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

