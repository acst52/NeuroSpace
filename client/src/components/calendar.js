import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery, useMutation } from '@apollo/client';
import Donation from './donation';

import { EVENTQUERY } from '../utils/queries';
import { CREATEEVENT } from '../mutations';

function Calendar({ id }) {
  const scheduleId = id;
  const { loading, error, data } = useQuery(EVENTQUERY, {
    variables: { scheduleId },
  });
  const [createEvent] = useMutation(CREATEEVENT);
  const calendarRef = useRef(null); // Create a ref to access the FullCalendar instance

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
    if (arg.view.type === 'dayGridMonth') {
      calendarRef.current.getApi().changeView('timeGridDay'); // Access the FullCalendar instance and call changeView
      calendarRef.current.getApi().gotoDate(arg.date); // Navigate to the selected date
      setView("timeGridDay");
    }
  }
  const handleTimeSelect = async (arg) => {
    if (arg.view.type ===  'timeGridWeek' || arg.view.type ===  'timeGridDay') {
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
    }
  };

  return (
    <div className="contentBody">
      <h1 className="title">DASHBOARD - Schedule</h1>
      <section className="calendar">
        <FullCalendar
          ref={calendarRef} // Assign the ref to the FullCalendar component
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView={currentView}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          weekends={true}
          dateClick={handleDateSelect}
          selectable={true}
          select={handleTimeSelect}
          events={[...formattedData, ...events]}
          slotDuration="01:00:00"
          slotLabelInterval={{ minutes: 60 }}
        />
      </section>
      <Donation />
    </div>
  );
}

export default Calendar;



