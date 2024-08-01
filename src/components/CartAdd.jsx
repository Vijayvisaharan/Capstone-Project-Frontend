import React, { useEffect } from 'react';
import { Button, Card, FormControl, InputGroup ,Carousel} from 'react-bootstrap';
import { useCart } from '../components/CartProvider';
import { Link } from 'react-router-dom';
import { useState } from 'react';
  const defaultImage = 'https://picsum.photos/800/420?text=No+Image'
function CartAdd() {
  const { cartItems, updateQuantity, removeFromCart, fetchCartItems } = useCart();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchCartItems();
    const initialQuantities = {};
    if (Array.isArray(cartItems)) {
    cartItems.forEach(item => {
      initialQuantities[item._id] = item.quantity;
    })};
    setQuantities(initialQuantities);
  }, []);

  const handleDecreaseQuantity = (artId) => {
    setQuantities(prevQuantities => {
      const newQuantity = Math.max(1, (prevQuantities[artId] || 1) - 1);
      updateQuantity(artId, newQuantity);
      return { ...prevQuantities, [artId]: newQuantity };
    });
  };

  const handleIncreaseQuantity = (artId) => {
    setQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[artId] || 1) + 1;
      updateQuantity(artId, newQuantity);
      return { ...prevQuantities, [artId]: newQuantity };
    });
  };

  const handleQuantityChange = (artId, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantities(prevQuantities => {
        updateQuantity(artId, newQuantity);
        return { ...prevQuantities, [artId]: newQuantity };
      });
    }
  };
  const handleRemoveItem = async (artId) => {
    await removeFromCart(artId);
  };
  const getUniqueCartItems = () => {
    const uniqueItems = {};
    if (Array.isArray(cartItems)) {
      cartItems.forEach(item => {
        if (item._id) {

          if (uniqueItems[item._id]) {
            uniqueItems[item._id].quantity += item.quantity;
          } else {
            uniqueItems[item._id] = { ...item };
          }
        }
      });
    }
    return Object.values(uniqueItems);
  };
  const uniqueCartItems = getUniqueCartItems();

  return (
    <>
      {Array.isArray(uniqueCartItems) && uniqueCartItems.length === 0 ? (
        <div>No items in the cart</div>
      ) : (
        uniqueCartItems.map(art => (
          <Card key={art._id} style={{ width: '18rem' }} className="mb-3">
            <Card.Body>
            <div id={`carouselExample${art._id}`} className="carousel slide">
                <div className="carousel-inner">
                  {art.images && art.images.length > 0 ? (
                    <Carousel>
                      {art.images.map((imageItem, i) => (
                        <Carousel.Item key={i}>
                          <img
                            src={`/images/${imageItem}`}
                            height={50}
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
                      height={50}
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
              <Card.Title>
                <Link to={`/details/${art._id}`}>{art.title}</Link>
              </Card.Title>
              <Card.Text>
                <span className="text-success">${art.price}</span>
              </Card.Text>
              <InputGroup className="mb-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => handleDecreaseQuantity(art._id)}
                >
                  -
                </Button>
                <FormControl
                  className="text-center"
                  value={quantities[art._id] || art.quantity}
                  onChange={(e) => handleQuantityChange(art._id, e)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleIncreaseQuantity(art._id)}
                >
                  +
                </Button>
              </InputGroup>
              <Button variant="danger" onClick={() => handleRemoveItem(art._id)}>
                Remove
              </Button>
              <Card.Title className='text-center mt-3' style={{ backgroundColor: 'lightgray' }}>
                <div className='text-center'>  Total Amount  :  ${((quantities[art._id] || 1) * art.price).toFixed(2)} </div>
              </Card.Title>
            </Card.Body>
          </Card>
        ))
      )}
    </>
  );
}

export default CartAdd;