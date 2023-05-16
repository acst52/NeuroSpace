import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { useQuery, useMutation } from '@apollo/client';
import Donation from './donation';

import { EVENTQUERY } from '../utils/queries';
import { CREATEEVENT, DELETEEVENT } from '../mutations';
Modal.setAppElement('#root');

function Calendar({ id }) {
  const scheduleId = id;
  const [createEvent] = useMutation(CREATEEVENT);
  const [deleteEvent] = useMutation(DELETEEVENT);
  const calendarRef = useRef(null);

  const [currentView, setView] = useState('dayGridMonth');
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArg, setSelectedArg] = useState(null); // Added state for storing selected arg

  const { loading, error, data } = useQuery(EVENTQUERY, {
    variables: { scheduleId },
  });
   if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const eventData = data.event ;
console.log(eventData);

  const formattedData = eventData.map((item) => ({
    id: item._id,
    title: item.title,
    start: new Date(parseInt(item.startDate)).toISOString(),
    end: new Date(parseInt(item.endDate)).toISOString(),
  })); 

  const openModal = (arg) => {
    setSelectedArg(arg); // Store the selected arg in the state
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleModalSubmit = async () => {
    const title = document.querySelector('input[type="text"]').value;
    const attendee = document.querySelector('input[type="email"]').value;
    if (title && selectedArg) {
      const startDate = selectedArg.startStr;
      const endDate = selectedArg.endStr;
      const description = '';
      const scheduleId = id;
      const mutationResponse = await createEvent({
        variables: { title, startDate, endDate, scheduleId, description, attendee },
      });
      const newEvent = {
        title,
        start: startDate,
        end: endDate,
      };
      setEvents([...events, newEvent]);

    }

    closeModal();
  };
  const handleDateSelect = (arg) => {
    if (arg.view.type === 'dayGridMonth') {
      calendarRef.current.getApi().changeView('timeGridDay');
      calendarRef.current.getApi().gotoDate(arg.date);
      setView('timeGridDay');
    }
  };

  const handleTimeSelect = (arg) => {
    if (arg.view.type === 'timeGridWeek' || arg.view.type === 'timeGridDay') {
      openModal(arg);
    }
  };

  const handleEventClick = async (arg) => {
    const { event } = arg;
    console.log(event._def.publicId)
    const shouldDelete = window.confirm(`Do you want to delete "${event.title}"?`);
    if (shouldDelete) {
      try {
        // Perform delete action
        const mutationResponse = await deleteEvent({
          variables: { eventId: event._def.publicId }, // Pass the eventId as a variable
        });

        // Update the events state to reflect the deletion
        setEvents([...events]);
        // setEvents((prevEvents) =>
        // prevEvents.filter((e) => e.id !== event._def.publicId)
      // );
      } catch (error) {
        console.log('Error deleting event:', error);
        // Handle any error that occurs during deletion
      }
    }
  };

  return (
    <div className="contentBody" id="contentBody">
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
          eventClick={handleEventClick}
          selectable={true}
          select={handleTimeSelect}
           events={[...formattedData, ...events]}
          slotDuration="01:00:00"
          slotLabelInterval={{ minutes: 60 }}
        />
      </section>
      <Donation />
      <Modal
        className="eventModal"
        overlayClassName="eventModalOverlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enter Event Title"
        appElement={document.getElementById('contentBody')}
      >
        <div>
        <h2>Enter event title:</h2>
        <input type="text"  id = "title"/>
        </div>
        <div>
        <h2>Attendees? </h2>
        <input type="email" id = "attendees" />
        </div>
        <div className= "modalBtns">
        <button onClick={handleModalSubmit}>Submit</button>
        <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Calendar;
