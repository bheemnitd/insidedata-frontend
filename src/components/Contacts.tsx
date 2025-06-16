import React from 'react';
import styled from 'styled-components';

const TabContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ContactCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const CardTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #00fff7;
`;

const ContactLink = styled.a`
  color: #00fff7;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: #00d4c7;
    text-decoration: underline;
  }
`;

const ContactText = styled.p`
  color: #444;
  margin: 0;
  line-height: 1.6;
`;

interface Contact {
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

interface ContactsProps {
  contact: Contact;
}

const Contacts: React.FC<ContactsProps> = ({ contact }) => {
  return (
    <TabContent>
      <h2>Contact Information</h2>
      <ContactGrid>
        <ContactCard>
          <CardTitle>Email</CardTitle>
          <ContactLink href={`mailto:${contact.email}`}>
            {contact.email}
          </ContactLink>
        </ContactCard>

        <ContactCard>
          <CardTitle>Phone</CardTitle>
          <ContactLink href={`tel:${contact.phone}`}>
            {contact.phone}
          </ContactLink>
        </ContactCard>

        <ContactCard>
          <CardTitle>Location</CardTitle>
          <ContactText>{contact.address}</ContactText>
        </ContactCard>

        <ContactCard>
          <CardTitle>Social Links</CardTitle>
          <ContactLink href={contact.linkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </ContactLink>
          <ContactLink href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </ContactLink>
          <ContactLink href={contact.portfolio} target="_blank" rel="noopener noreferrer">
            Portfolio
          </ContactLink>
        </ContactCard>
      </ContactGrid>
    </TabContent>
  );
};

export default Contacts;
