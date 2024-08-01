import { useEffect, useState } from 'react';
import React from 'react'
import { Carousel, Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import artServices from '../services/artServices';

function Details() {
  const { id } = useParams();
  const [art, setArt] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await artServices.getArt(id);
        setArt(res.art); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchArt();
    }
  }, [id]);
  console.log(art)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!art) return <div>No art found</div>;

  const defaultImage = 'https://picsum.photos/800/420?text=No+Image'

  return (
    <div>
      <Card className="mt-2"style={{ width: '100%', maxWidth: '1200px', height: '650px', margin: 'auto' }}>
        <Card.Body>

          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-inner">
              {art.images && art.images.length > 0 ? (
                <Carousel id={`carouselExample${art._id}`} >
                  {art.images.map((imageItem, i) => (
                    <Carousel.Item key={i}>
                      <img
                        src={`/images/${imageItem}`}
                        height={300}
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
                  height={300}
                  className="d-block w-100"
                  alt="Default Art Image"
                  id="carousel-img"
                />
              )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <Card.Text>Title: {art.title}</Card.Text>
          <Card.Text>Price: ${art.price}</Card.Text>
          <Card.Text>Location: {art.location || 'Location not available'}</Card.Text>
          <Card.Text>Artist: {art.artist || 'Unknown artist'}</Card.Text>
          <Card.Text>{art.description}</Card.Text>
          <Card.Text>Date: {art.date}</Card.Text>
          <Button
            variant="primary"
            className="mt-2 ms-4"
            disabled={!art._id}
          >
            Add to Cart
          </Button>
          <Button 
         variant="secondary" 
          className="mt-2 ms-4"
          disabled={!art._id}
          onClick={() => window.history.back()}>
            Back
          </Button>
        </Card.Body>
      </Card>

    </div>
  )
}

export default Details
