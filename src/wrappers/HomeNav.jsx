import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, Button, Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom'
import '../sidebar.css';
import { useState } from 'react'
import userServices from '../services/userServices';
import { useNavigate } from 'react-router-dom';
import CartAdd from '../components/CartAdd';
import { useCart } from '../components/CartProvider';
import { useLocation } from 'react-router-dom';
import '../home.css'

function HomeNav() {
  const { cartItems, totalAmount, quantity } = useCart();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query') || '';

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

  const handleLogout = () => {
    userServices.logoutUser()
      .then((res) => {
        alert(res.message || "Logout successful");
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });

  }
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?query=${query}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };
  return (
    <>


      <div className="promo-banner">
        <Container fluid className="text-center" style={{ height: '30px' }}>
          <span>Get 20% off on your first order! Use code: OFF20</span>
        </Container>
      </div>

      <Navbar bg="light" expand="lg" className="navbar-custom" style={{ backgroundColor: "#E5F1EE", height: "120px" }}>
        <Container fluid>

          <Navbar.Brand as={Link} to="/" className="me-auto" style={{ fontSize: '4rem', fontFamily: 'Roboto, sans-serif' }}>
            <span className="navbar-title" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 'bold' }}> A r t V i s t a</span>
          </Navbar.Brand>
          {user && user.role === 'admin' && (
            <div>
              <Link to="/AdminDashboard/Adminhome">
                <Button variant="danger" className="mt-2 ms-4" style={{ marginRight: '20px' }}>
                  Admin
                </Button>
              </Link>
            </div>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ms-auto">
              <form className="d-flex align-items-center">
                <input
                  type="text-"
                  className="form-control me-2"
                  placeholder="Search by category..."
                  style={{ width: '250px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="btn btn-outline" type="submit" onClick={handleSearch}>Search</Button>
              </form>

              <Dropdown className="d-flex align-items-center ms-3">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    <path d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/register">New customer? Sign UP</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/login">
                    Login
                    <i className="bi bi-box-arrow-left m-4">
                      <svg xmlns="http://www.w3.org/2000/svg" color='blue' width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                        <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                      </svg>
                    </i>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                    <i className="bi bi-box-arrow-right m-4">
                      <svg xmlns="http://www.w3.org/2000/svg" color='blue' width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                        <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                      </svg>
                    </i>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Button className="btn btn-primary ms-3" type="button" onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                <span className="ms-2">Cart</span>
                <span className="badge bg-dark text-white ms-1 rounded-pill" id="count">{cartItems && cartItems.length}</span>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-content">
          <button className="btn btn-light position-absolute top-0 end-0" onClick={closeSidebar}>
            <i className="bi bi-x-square">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-square-mute" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </i>
          </button>
          {user ? (
            <div className='text-info' style={{ backgroundColor: 'lite-grey', padding: '5px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
              <h1>{user.firstName} {user.lastName}</h1>
            </div>
          ) : (
            <div className='text-info' style={{ backgroundColor: 'lite-grey', padding: '5px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
              <h1>Your cart</h1>
            </div>
          )}
          <ul className="mt-2">
            <CartAdd />
          </ul>
          <div className="fixed-section">
            <div className="order-comment-section">
              <label htmlFor="order-comment">Order Comment:</label>
              <textarea id="order-comment" name="orderComment" rows="4" placeholder="Add your comment here..."></textarea>
            </div>

            <div className="checkout-button-container">
              <button className='btn btn-primary' onClick={() => navigate('/checkout')}>
                <i className="bi bi-cart-check">Checkout {'    '} ${totalAmount}</i></button>
            </div>
          </div>
        </div>
      </div>
      <main className={`main-content ${isSidebarVisible ? 'with-sidebar' : ''}`}>
        <Outlet />
      </main>
      <footer className="footer">
        <Button variant="link">Help</Button>
        <Button variant="link">Shipping Policy</Button>
        <Button variant="link">Privacy Policy</Button>
        <Button variant="link">Terms of Service</Button>
        <Button variant="link">Contact Information</Button>
      </footer>
    </>
  )
}

export default HomeNav

