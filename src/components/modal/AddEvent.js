import React, { useState, useContext } from 'react';
import moment from 'moment';

import EventForm from './EventForm';
import AppContext from '../../context/App/appContext';

const AddEvent = () => {
    const [color, setColor] = useState('');
    const [eventname, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [checkbox, setCheckBox] = useState(false);
    const [showtime, setShowTime] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const appContext = useContext(AppContext);
    const { addEvent, events, colors, colorObj } = appContext;

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

    const createEvent = () => {
        const event = setEvent(events.length+1);
        // add event to events array using context
        addEvent(event);
        reset();
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

    const reset = () => {
        setColor('');
        setEventName('');
        setDescription('');
        setCheckBox(false);
        setShowTime(false);
        setStartDate(new Date());
        setEndDate(new Date());
    }

    const closeModal = () => {
        reset();
    }

    return (
        <div>
            <EventForm 
                modalId="add-event"
                title="Add Event"
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
                eventType={createEvent}
                colorObj={colorObj}
                buttonText="Save"
            />
        </div>
    )
}

export default AddEvent;
