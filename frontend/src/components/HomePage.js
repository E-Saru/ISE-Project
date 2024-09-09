// // src/components/HomePage.js
// import React from 'react';

// const HomePage = () => {
//   return (
//     <div>
//       <h2>Welcome to the Movers Booking System</h2>
//       <p>Use the navigation links to book movers or make payments.</p>
//     </div>
//   );
// }

// export default HomePage;




import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Define inline styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      lineHeight: '1.6',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center'
    },
    heroSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    heroTitle: {
      fontSize: '36px',
      margin: '0 0 10px 0'
    },
    heroSubtitle: {
      fontSize: '24px',
      margin: '0 0 20px 0'
    },
    section: {
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
      fontSize: '28px',
      margin: '0 0 10px 0'
    },
    sectionContent: {
      fontSize: '16px',
      margin: '0'
    },
    button: {
      display: 'inline-block',
      padding: '10px 20px',
      marginTop: '20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
      textAlign: 'center'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    ul: {
      listStyleType: 'disc',
      paddingLeft: '20px'
    },
    li: {
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to the Movers Booking System</h1>
        <p style={styles.heroSubtitle}>Your one-stop solution for booking movers and managing payments.</p>
        <a
          href="#features"
          style={styles.button}
          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Explore Features
        </a>
      </div>

      {/* Features Section */}
      <div style={styles.section} id="features">
        <h2 style={styles.sectionTitle}>Our Features</h2>
        <p style={styles.sectionContent}>
          Discover the benefits of using our system:
          <ul style={styles.ul}>
            <li style={styles.li}>Seamless booking process</li>
            <li style={styles.li}>Flexible scheduling options</li>
            <li style={styles.li}>Secure payment methods</li>
            <li style={styles.li}>24/7 customer support</li>
          </ul>
        </p>
      </div>

      {/* Testimonials Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>What Our Users Say</h2>
        <div style={styles.testimonial}>
          <p style={styles.testimonialContent}>"An excellent service that made our move stress-free. Highly recommended!"</p>
          <p style={styles.testimonialAuthor}>- Alex Johnson</p>
        </div>
        <div style={styles.testimonial}>
          <p style={styles.testimonialContent}>"Professional and reliable. The booking process was a breeze."</p>
          <p style={styles.testimonialAuthor}>- Emily Davis</p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Ready to Get Started?</h2>
        <p style={styles.sectionContent}>Sign up today and start managing your moves with ease. Click the button below to join us!</p>
        <a
          href="#signup"
          style={styles.button}
          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          <Link to="/signup">Signup</Link> 
        </a>
      </div>
    </div>
  );
};

export default HomePage;
