// import React, { useState } from 'react';
// import { bookMovers } from '../api';

// const BookingForm = () => {
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     const [movers, setMovers] = useState(1);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const bookingData = { date, time, movers, user_id: 1 };
//         try {
//             const response = await bookMovers(bookingData);
//             alert('Booking successful!');  // Inform the user
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//             alert('Booking failed!');
//         }
//     };

//     return (
//         <div>
//         <h2>Book a Mover</h2>
//         <form onSubmit={handleSubmit}>
//             <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
//             <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
//             <input type="number" value={movers} onChange={e => setMovers(e.target.value)} min="1" required />
//             <button type="submit">Book Movers</button>
//         </form>
//         </div>
//     );
// };

// export default BookingForm;



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

    // Define inline styles
    const styles = {
        container: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9'
        },
        header: {
            textAlign: 'center',
            color: '#333'
        },
        form: {
            display: 'flex',
            flexDirection: 'column'
        },
        label: {
            marginBottom: '15px',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px'
        },
        button: {
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s'
        },
        buttonHover: {
            backgroundColor: '#0056b3'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Book a Mover</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Time:
                    <input
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Movers:
                    <input
                        type="number"
                        value={movers}
                        onChange={e => setMovers(e.target.value)}
                        min="1"
                        required
                        style={styles.input}
                    />
                </label>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Book Movers
                </button>
            </form>
        </div>
    );
};

export default BookingForm;

