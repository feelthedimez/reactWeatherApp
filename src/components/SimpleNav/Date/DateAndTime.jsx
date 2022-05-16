import React, { useState, useEffect } from 'react';

const DateAndTime = () => {

    const [getDateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);


    const dateString = getDateState.toLocaleDateString('en-ZA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });


    const timeString = getDateState.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });


    return <div>
        <p>{timeString}</p>
        <p>{dateString}</p>
    </div>

}

export default DateAndTime;