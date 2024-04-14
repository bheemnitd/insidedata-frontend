// // MessageBox.js
// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
//
// const MessageBox = () => {
//   const [message, setMessage] = useState('');
//
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     // Handle sending the message (you may want to implement this part)
//     console.log('Sending message:', message);
//     setMessage('');
//   };
//
//   return (
//     <Form onSubmit={handleSendMessage}>
//       <Form.Group>
//         <Form.Control
//           type="text"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Send
//       </Button>
//     </Form>
//   );
// };
//
// export default MessageBox;
