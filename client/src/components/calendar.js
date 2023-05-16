import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { useQuery, useMutation } from '@apollo/client';
import Donation from './donation';

import { EVENTQUERY } from '../utils/queries';
import { CREATEEVENT } from '../mutations';
Modal.setAppElement('#root');

function Calendar({ id }) {
  const scheduleId = id;
  const { loading, error, data } = useQuery(EVENTQUERY, {
    variables: { scheduleId },
  });
  const [createEvent] = useMutation(CREATEEVENT);
  const calendarRef = useRef(null);

  const [currentView, setView] = useState('dayGridMonth');
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArg, setSelectedArg] = useState(null); // Added state for storing selected arg

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
console.log(data)
  const eventData = data.event;


  const formattedData = eventData.map((item) => ({
    title: item.title,
    start: new Date(parseInt(item.startDate)).toISOString(),
    
// "2023-05-28T00:00:00.000+00:00"
// Mon Feb 19 55370 19:00:00 GMT
    end: new Date(parseInt(item.endDate)).toISOString(),
  }));

 // console.log(formattedData)

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
  const test = [...formattedData, ...events]
  console.log(test);
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

  const handleEventClick = (arg) => {
    const { event } = arg;
    const shouldDelete = window.confirm(`Do you want to delete "${event.title}"?`);
    if (shouldDelete) {
      console.log(event)
      // TODO: Perform delete action
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
          events={test}
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
