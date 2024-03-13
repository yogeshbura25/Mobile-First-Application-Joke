import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const HomePage = ({ username }) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10'
    )
      .then((response) => response.json())
      .then((data) => {
        setJokes(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const emojis = ['😀', '😂', '🤣', '😃', '😄', '😆', '😉', '😊', '😎', '🙂'];

  const userName= JSON.parse(localStorage.getItem("current_user"))["username"]
  console.log(userName)

  return (
    <div>
      <Navbar bg="light" expand="lg" className="navbar" md={6} lg={4} xl={3}>
        <Navbar.Brand href="#home" className="navbar-brand">
          Jokes Logo
        </Navbar.Brand>
        <Nav className="logout">
          <Nav.Link onClick={handleLogout} className="navbar-link">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container fluid className="project-section">
        <Row className="mb-5 rowclass" style={{ justifyContent: 'center', paddingBottom: '10px' }}>
            <div className='userName d-flex align-items-center justify-content-center'>
            <h2>Hi {userName}! Here are so many jokes for you</h2>
            </div>
       
          {isLoading ? (
            <div className="spinner d-flex align-items-center justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            jokes.jokes.map((joke, index) => (
              <Col key={index} md={6} lg={4} xl={3} className="project-card">
                 
                <Card className="project-card-view">
                   
                  <Card.Body style={{ margin: '10px' }}>
                    <Card.Title className="card-title">
                      {joke.category} joke {emojis[index]}
                    </Card.Title>
                    <Card.Text style={{ textAlign: 'justify' }} className="card-joke">
                      {joke.joke}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;