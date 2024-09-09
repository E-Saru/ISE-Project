import React, { useState } from 'react';
import { bookMovers } from '../api';

const BookingForm = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [movers, setMovers] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = { date, time, movers, user_id: 1 };
        try {
            const response = await bookMovers(bookingData);
            alert('Booking successful!');  // Inform the user
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert('Booking failed!');
        }
    };

    return (
        <div>
        <h2>Book a Mover</h2>
        <form onSubmit={handleSubmit}>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
            <input type="number" value={movers} onChange={e => setMovers(e.target.value)} min="1" required />
            <button type="submit">Book Movers</button>
        </form>
        </div>
    );
};

export default BookingForm;
