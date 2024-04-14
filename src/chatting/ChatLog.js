// ChatLog.js
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ChatLog = () => {
  const messages = [
    { id: 1, sender: 'Friend 1', content: 'Hello!' },
    { id: 2, sender: 'You', content: 'Hi there!' },
    { id: 3, sender: 'Friend 1', content: 'How are you?' },
  ];

  return (
    <Card>
      <Card.Header>Chat Log</Card.Header>
      <ListGroup variant="flush">
        {messages.map((message) => (
          <ListGroup.Item key={message.id}>
            <strong>{message.sender}:</strong> {message.content}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default ChatLog;
