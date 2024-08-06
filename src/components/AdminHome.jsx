import React, { useState } from 'react'
import { useEffect } from 'react'
import { Carousel, Card, Button } from 'react-bootstrap';
import artServices from '../services/artServices'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function AdminHome() {

    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            }
            finally {
                setLoading(false);
            }
        };

        fetchArts();
    }, []);    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (arts.length === 0) {
        return <div>No arts available</div>; 
    }

    const handleDelete = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this art?')) {
                await artServices.deleteArt(id); 
                alert('Art deleted successfully!'); 
                setArts(arts.filter((art) => art._id !== id))     
            }
        } catch (err) {
            console.error('Error deleting art:', err);
            alert('Failed to delete art.');
        }
    };

    const defaultImage = 'https://picsum.photos/800/420?text=No+Image'

    return (
        <>


            <div className="container-fluid-flex " style={{ backgroundColor: "#f2f2f2" }}>
                <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center">
                    {arts.map((art) => (
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
                                                id="carousel-img"
                                            />
                                        )}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExample${art._id}`} data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselExample${art._id}`} data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <Card.Body>
                                    <Card.Title>{art.title}</Card.Title>
                                    <Card.Text>
                                        Price: ${art.price}
                                    </Card.Text>
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
                                    >
                                        <Link to={`/AdminDashboard/edit/${art._id || ''}`} style={{ color: 'white', textDecoration: 'none' }}>
                                            Update
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="justify-content-end mt-2 ms-4"
                                        disabled={!art._id}
                                        onClick={() => handleDelete(art._id)}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminHome
