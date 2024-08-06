import React, { useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import AdminHome from './AdminHome'
import Home from './Home'
import Addart from './Addart'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import userServices from '../services/userServices';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import Editart from './Editart'
import '../admin.css'
function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userServices.getUserProfile();
        setUser(user);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const handleClick = () => {
    navigate('/AdminDashboard/add');
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div>
      <Navbar className="admin-navbar" bg="light" expand="lg">
        <Container>
          <Row className="w-100 align-items-center">
            <Col>
          
              {user && (
                <Navbar.Brand className="me-auto " style={{ fontSize: '4rem', fontFamily: 'Roboto, sans-serif' }}>
                   <i className="bi bi-person-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
              </i>
                  <span className="navbar-title" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 'bold' }}>  {user.firstName} {user.lastName}</span>

                </Navbar.Brand>
              )}
            </Col>
            <Col className="d-flex justify-content-center ms-5 " style={{ fontSize: '3rem', fontFamily: 'Roboto, sans-serif' }}>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" style={{ fontSize: '4rem', fontFamily: 'Roboto, sans-serif', color: "blue", marginRight: '100px' }}>
                  <span className="navbar-title" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 'bold' }}>  Home</span></Nav.Link>
                <Nav.Link as={Link} to="/AdminDashboard/Adminhome" style={{ fontSize: '4rem', fontFamily: 'Roboto, sans-serif', color: "blue", marginRight: '100px' }}>
                  <span className="navbar-title" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 'bold' }}> Admin</span></Nav.Link>
              </Nav>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button variant="primary" style={{ fontSize: '2rem', fontFamily: 'Dancing Script, cursive', color: "white" }}onClick={handleClick}>ADD</Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <div className="admin-content"> 
      <Routes>
        <Route path="Adminhome" element={<AdminHome />} />
        <Route path="/" element={<Home />} />
        <Route path="add" element={<Addart />} />
        <Route path="edit/:id" element={<Editart />} />
      </Routes>
      </div> 
    </div>
  )
}

export default AdminDashboard
