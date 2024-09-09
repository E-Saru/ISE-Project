// // src/App.js
// import React from 'react';
// import {  Route, Routes} from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import BookingForm from './components/BookingForm';
// import PaymentForm from './components/PaymentForm';
// import HomePage from './components/HomePage'; // Example home page component
// import './App.css';

// const App = () => {
//   return (
//       <div className="App">
//         <header className="App-header">
//           <h1>Movers Booking System</h1>
//           <nav className='Navigation'>
//             <Link to="/">Home</Link>
//             <Link to="/book">Book Movers</Link>
//             <Link to="/pay">Pay</Link>
//           </nav>
//         </header>
//         <main>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/book" element={<BookingForm />} />
//             <Route path="/pay" element={<PaymentForm />} />
//           </Routes>
//         </main>
//       </div>
//   );
// }

// export default App;



// src/App.js
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import PaymentForm from './components/PaymentForm';
import HomePage from './components/HomePage';
import SignupForm from './components/SignupForm';  // Import Signup
import LoginForm from './components/LoginForm';    // Import Login
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movers Booking System</h1>
        <nav className="Navigation">
          <Link to="/">Home</Link>
          <Link to="/book">Book Movers</Link>
          <Link to="/pay">Pay</Link>
          <Link to="/signup">Signup</Link>  {/* Signup Link */}
          <Link to="/login">Login</Link>    {/* Login Link */}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/pay" element={<PaymentForm />} />
          <Route path="/signup" element={<SignupForm />} />  {/* Signup Route */}
          <Route path="/login" element={<LoginForm />} />    {/* Login Route */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
