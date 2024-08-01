import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import artServices from '../services/artServices';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  category: Yup.string().oneOf(['painting', 'sculpture', 'photography', 'drawing', 'other'], 'Invalid category').required('Category is required'),
  artist: Yup.string().required('Artist is required'),
  images: Yup.string().url('Invalid URL format').required('Image URL is required'),
  location: Yup.string().required('Location is required')
});

function Editart() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [art, setArt] = useState(null); 
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!art) return <div>No art found</div>;

  const handleSubmit = async (values) => {
    try {
      await artServices.updateArt(id, values); 
      alert('Art updated successfully!');
      navigate("/AdminDashboard/Adminhome");
    } catch (err) {
      console.error('Error updating art:', err);
      alert('Failed to update art.');
    }
  };

  return (
    <div className='container mt-5'>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-primary d-flex justify-content-between align-items-center">
              <b>Edit Art</b>
            </div>
            <div className="card-body">
              <Formik
                initialValues={art}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        placeholder="Title"
                      />
                      <ErrorMessage name="title" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <Field
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Description"
                      />
                      <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Price</label>
                      <Field
                        type="text"
                        id="price"
                        name="price"
                        className="form-control"
                        placeholder="Price"
                      />
                      <ErrorMessage name="price" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <Field as="select" id="category" name="category" className="form-control">
                        <option value="" label="Select category" />
                        <option value="painting" label="Painting" />
                        <option value="sculpture" label="Sculpture" />
                        <option value="photography" label="Photography" />
                        <option value="drawing" label="Drawing" />
                        <option value="other" label="Other" />
                      </Field>
                      <ErrorMessage name="category" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="artist">Artist</label>
                      <Field
                        type="text"
                        id="artist"
                        name="artist"
                        className="form-control"
                        placeholder="Artist"
                      />
                      <ErrorMessage name="artist" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="images">Images</label>
                      <Field
                        type="text"
                        id="images"
                        name="images"
                        className="form-control"
                        placeholder="Image URL"
                      />
                      <ErrorMessage name="images" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <Field
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        placeholder="Location"
                      />
                      <ErrorMessage name="location" component="div" className="text-danger" />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-4"
                      style={{ width: "100%" }}
                    >
                      Update
                    </button>
                  </Form>
                )}
              </Formik>
              <p className='justify-content-end d-flex mt-2'>
                <Link to="/AdminDashboard/Adminhome">Back to Home</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editart;

