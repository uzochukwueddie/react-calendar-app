import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';

import EventForm from './EventForm';
import AppContext from '../../context/App/appContext';

const EditEvent = () => {
    const [color, setColor] = useState('');
    const [eventname, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [checkbox, setCheckBox] = useState(false);
    const [showtime, setShowTime] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const appContext = useContext(AppContext);
    const { events, colors, selectedEvent, colorObj, editSelectedEvent } = appContext;

    useEffect(() => {
        if (Object.keys(selectedEvent).length) {
            setColor(selectedEvent.bgColor);
            setEventName(selectedEvent.title);
            setDescription(selectedEvent.description);
            setCheckBox(selectedEvent.allDay);
            const start = `${moment(new Date(selectedEvent.start)).format()}`;
            let end = '';
            if (!selectedEvent.allDay) {
                setShowTime(false);
                end = `${moment(new Date(selectedEvent.end)).format()}`;
            } else {
                setShowTime(true);
                end = `${moment(new Date(selectedEvent.end)).format('YYYY-MM-DD')}`;
            }
            setStartDate(new Date(start));
            setEndDate(new Date(end));
        }
        // eslint-disable-next-line
    }, [selectedEvent, events]);

    const inputChange = (event) => {
        const attributeName = event.target.getAttribute('name');
        if (attributeName === 'event-name') {
            setEventName(event.target.value);
        }

        if (attributeName === 'description') {
            setDescription(event.target.value);
        }
    }

    const onCheckBoxChange = e => {
        if (e.target.checked === true) {
            setShowTime(true);
            setCheckBox(true);
        } else {
            setShowTime(false);
            setCheckBox(false);
        }
    }
    const onInputChange = (propertyName) => event => {
        if (propertyName === 'startdate') {
            setStartDate(event);
        }

        if (propertyName === 'enddate') {
            setEndDate(event);
        }
    }

    const handleChange = event => {
        if (event.target.value !== 'Select color') {
            setColor(event.target.value);
        } else {
            setColor('');
        }
    }

    const editEvent = () => {
        const event = setEvent(selectedEvent.id);
        editSelectedEvent(event);
    }

    const setEvent = id => {
        const start = `${moment(startDate).format()}`;
        let end = '';
        if (!checkbox) {
            end = `${moment(startDate).format()}`;
        } else {
            end = `${moment(startDate).format('YYYY-MM-DD')}`;
        }

        const event = {
            id,
            title: eventname,
            description,
            start,
            end,
            allDay: checkbox,
            bgColor: color,
            backgroundColor: colorObj[color]
        };

        return event;
    }

    const closeModal = () => {}

    return (
        <div>
            <EventForm 
                modalId="edit-event"
                title="Edit Event"
                description={description}
                closeModal={closeModal}
                eventname={eventname}
                inputChange={inputChange}
                checkbox={checkbox}
                onCheckBoxChange={onCheckBoxChange}
                showtime={showtime}
                startDate={startDate}
                endDate={endDate}
                onInputChange={onInputChange}
                color={color}
                colors={colors}
                handleChange={handleChange}
                eventType={editEvent}
                colorObj={colorObj}
                buttonText="Update"
            />
        </div>
    )
}

export default EditEvent;
