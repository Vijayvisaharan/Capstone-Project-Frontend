import React, { useState, useEffect } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import artServices from '../services/artServices';
import { useCart } from '../components/CartProvider';
import { useLocation } from 'react-router-dom';

function Home() {
  const { addToCart, cartItems } = useCart();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const res = await artServices.getAllArts();
        console.log("Fetched arts data:", res);

        if (res && Array.isArray(res.arts)) {
          setArts(res.arts);
        } else {
          console.error("Unexpected data format:", res);
          setError("Unexpected data format received.");
        }
      } catch (err) {
        setError('Failed to fetch art data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArts();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {

        const response = await artServices.searchByCategory(query);
        if (response.data && Array.isArray(response.data.arts)) {
          setArts(response.data.arts);
          console.error("Unexpected data format:", response);
          setError("Unexpected data format received.");
        }
      } catch (err) {
        setError(err.message || 'Failed to load items');
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchItems();
    }
  }, [query])

  const handleAddToCart = async (artId) => {
    try {

      // const isInCart = cartItems && Array.isArray(cartItems).some(item => item._id === artId); 

      // if (isInCart) {
      //     alert('Item is already in the cart');
      //     return; 
      // }
      await addToCart(artId);
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (arts && arts.length === 0) {
    return <div>No arts available</div>;
  }

  const defaultImage = 'https://picsum.photos/800/420?text=No+Image';

  return (
    <div className="container-fluid-flex" style={{ backgroundColor: "#f2f2f2" }}>
      <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center">
        {arts && arts.map(art => (
          <div key={art._id} className="col mb-5 mt-4 m-2">
            <Card className="h-100 shadow-lg bg-body-tertiary">
              <div id={`carouselExample${art._id}`} className="carousel slide">
                <div className="carousel-inner">
                  {art.images && art.images.length > 0 ? (
                    <Carousel>
                      {art.images.map((imageItem, i) => (
                        <Carousel.Item key={i}>
                          <img
                            src={`/images/${imageItem}`}
                            height={200}
                            className="d-block w-100"
                            alt={art.title ? `${art.title} image ${i + 1}` : `Art image ${i + 1}`}
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = defaultImage; 
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      src={defaultImage}
                      height={200}
                      className="d-block w-100"
                      alt="Default Art Image"
                    />
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carouselExample${art._id}`}
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carouselExample${art._id}`}
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <Card.Body>
                <Card.Title>{art.title}</Card.Title>
                <Card.Text>
                  Price: ${art.price}
                </Card.Text>
                <Card.Text>Location: {art.location}</Card.Text>
                <Button
                  variant="info"
                  className="mt-2"
                  disabled={!art._id}
                >
                  <Link to={`/details/${art._id || ''}`} style={{ color: 'white', textDecoration: 'none' }}>
                    View Details
                  </Link>
                </Button>
                <Button
                  variant="primary"
                  className="mt-2 ms-4"
                  disabled={!art._id}
                  onClick={() => handleAddToCart(art._id)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
