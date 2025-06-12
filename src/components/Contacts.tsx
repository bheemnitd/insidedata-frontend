import React from 'react';

const contact = {
  email: 'youremail@example.com',
  phone: '+91 12345 67890',
  linkedIn: 'https://linkedin.com/in/yourusername',
  github: 'https://github.com/yourusername',
};

export default function ContactTab() {
  return (
    <>
      <h2>Contact Me</h2>
      <p>Email: <a href={`mailto:${contact.email}`} style={{ color: '#00fff7' }}>{contact.email}</a></p>
      <p>Phone: {contact.phone}</p>
      <p>LinkedIn: <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#00fff7' }}>LinkedIn Profile</a></p>
      <p>GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{ color: '#00fff7' }}>GitHub Profile</a></p>
    </>
  );
}
