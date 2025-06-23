import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: transparent;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ContactCard = styled.div`
  // background: rgba(255, 255, 255, 0.05);
  // border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #64ffda;
  transition: all 0.3s ease;

  // &:hover {
  //   transform: translateY(-5px);
  //   background: rgba(255, 255, 255, 0.1);
  // }
`;

const CardTitle = styled.h3`
  color:rgb(255, 255, 255);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #64ffda;
`;

const ContactGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  // background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    // background: rgba(255, 255, 255, 0.1);
    transform: translateX(15px);
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  color: #64ffda;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgb(0, 255, 195);

  &:hover {
    background: #64ffda;
    color: #000;
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgb(0, 255, 195);
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const ContactValue = styled.div`
  color: white;
  font-weight: 500;
`;

const ContactLink = styled.a`
  color: #64ffda;
  text-decoration: none;
  display: block;
  transition: color 0.2s ease;

  &:hover {
    color: #4cd8b2;
    text-decoration: underline;
  }
`;

interface Contact {
  type: string;
  value: string;
  link?: string;
  icon: string;
}

interface ContactsProps {
  contacts: Contact[];
}

const Contacts: React.FC<ContactsProps> = ({ contacts }) => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <FaGithub />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'email':
        return <FaEnvelope />;
      case 'phone':
        return <FaPhone />;
      case 'location':
        return <FaMapMarkerAlt />;
      default:
        return <FaEnvelope />;
    }
  };

  return (
    <ContactContainer>
      <ContactCard>
        <CardTitle>Get In Touch</CardTitle>
        <ContactGrid>
          {contacts.map((contact, index) => (
            <ContactItem key={index}>
              <ContactIcon>
                {getIcon(contact.icon)}
              </ContactIcon>
              <ContactInfo>
                {contact.icon.toLowerCase() === 'email' ? (
                  <ContactLink 
                    href={`mailto:${contact.value}`}
                  >
                    {contact.value}
                  </ContactLink>
                ) : contact.link ? (
                  <ContactLink 
                    href={contact.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {contact.value}
                  </ContactLink>
                ) : (
                  <ContactValue>{contact.value}</ContactValue>
                )}
              </ContactInfo>
            </ContactItem>
          ))}
        </ContactGrid>
      </ContactCard>
    </ContactContainer>
  );
};

export default Contacts;
