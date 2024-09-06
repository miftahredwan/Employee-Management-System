import React from 'react';

const Profile = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width:"100%",
    padding: '20px',
    backgroundColor: '#f5f5f5',
    color: '#333',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '10px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const infoStyle = {
    fontSize: '16px',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Company Profile</h1>
        <div style={infoStyle}>
          <strong>Company Name:</strong> BaajiTechSoftwareSolutions
        </div>
        <div style={infoStyle}>
          <strong>Address:</strong> BoleMichael RingRoad, AddisAbaba, Ethiopia
        </div>
        <div style={infoStyle}>
          <strong>Contact:</strong> baajitech@gmail.com
        </div>
        <div style={infoStyle}>
          <strong>Website:</strong> <a href="https://baajitech.net" style={{ color: '#007bff', textDecoration: 'none' }}>baajitech.net</a>
        </div>
        <div style={infoStyle}>
          <strong>Work Ethic:</strong> At Baajitech, we believe in a strong work ethic characterized by transparency, integrity, and excellence. Our team is committed to delivering superior results through collaboration, continuous improvement, and a customer-first approach.
        </div>
      </div>
    </div>
  );
};

export default Profile;
