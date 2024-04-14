// import {Button, Card, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
// import "./Home.css"
// import NavBarComponent from "../components/Navbar";
//
// const Boat = () => {
// return (
//   <div>
//     <NavBarComponent/>
//      {/* The rest of your application */}
//      <Container fluid className='h-100'>
//        <Row className='justify-content-center h-100'>
//          <Col md={4} xl={3} className='chat'>
//            <Card className='mb-sm-3 mb-md-0 contacts_card'>
//              <Card.Header>
//                <InputGroup>
//                  <FormControl type='text' placeholder='Search...' className='form-control search'/>
//                  <div className='input-group-prepend'>
//                    <span className='input-group-text search_btn'><i className='fas fa-search'></i></span>
//                  </div>
//                </InputGroup>
//              </Card.Header>
//              <Card.Body className='contacts_body'>
//                <ul className='contacts'>
//                  {/* Add your friend list items here */}
//                </ul>
//              </Card.Body>
//              <Card.Footer></Card.Footer>
//            </Card>
//          </Col>
//          <Col md={8} xl={6} className='chat'>
//            <Card>
//              <Card.Header className='msg_head'>
//                <div className='d-flex bd-highlight'>
//                  <div className='img_cont'>
//                    <img src='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
//                         className='rounded-circle user_img'/>
//                    <span className='online_icon'></span>
//                  </div>
//                  <div className='user_info'>
//                    <span>Chat with Khalid</span>
//                    <p>1767 Messages</p>
//                  </div>
//                  <div className='video_cam'>
//                    <span><i className='fas fa-video'></i></span>
//                    <span><i className='fas fa-phone'></i></span>
//                  </div>
//                </div>
//                <span id='action_menu_btn'><i className='fas fa-ellipsis-v'></i></span>
//                <div className='action_menu'>
//                  <ul>
//                    <li><i className='fas fa-user-circle'></i> View profile</li>
//                    <li><i className='fas fa-users'></i> Add to close friends</li>
//                    <li><i className='fas fa-plus'></i> Add to group</li>
//                    <li><i className='fas fa-ban'></i> Block</li>
//                  </ul>
//                </div>
//              </Card.Header>
//              <Card.Body className='msg_card_body'>
//                <div className='d-flex justify-content-start mb-4'>
//                  <div className='img_cont_msg'>
//                    <img src='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
//                         className='rounded-circle user_img_msg'/>
//                  </div>
//                  <div className='msg_cotainer'>
//                    Hi, how are you Samim?
//                    <span className='msg_time'>8:40 AM, Today</span>
//                  </div>
//                </div>
//                {/* Add more message blocks as needed */}
//              </Card.Body>
//              <Card.Footer>
//                <InputGroup>
//                  <div className='input-group-append'>
//                    <Button variant='outline-secondary' className='attach_btn'><i
//                        className='fas fa-paperclip'></i></Button>
//                  </div>
//                  <FormControl as='textarea' className='type_msg' placeholder='Type your message...'/>
//                  <div className='input-group-append'>
//                    <Button variant='outline-secondary' className='send_btn'><i className='fas fa-location-arrow'></i></Button>
//                  </div>
//                </InputGroup>
//              </Card.Footer>
//            </Card>
//          </Col>
//        </Row>
//      </Container>
//   </div>
// )};
//
// export default Boat