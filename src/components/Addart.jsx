import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import artServices from '../services/artServices';
import { useNavigate, Link } from 'react-router-dom';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  category: Yup.string().required('Category is required'),
  artist: Yup.string().required('Artist is required'),
  images: Yup.string().url('Invalid URL format').required('Image URL is required'),
  location: Yup.string().required('Location is required'),
});

function Addart() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      artist: '',
      images: '',
      location: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await artServices.createArt(
          values.title,
          values.description,
          values.price,
          values.category,
          values.artist,
          values.images,
          values.location
        );
        alert(res.message, "success");
        navigate("/AdminDashboard");
      } catch (error) {
        console.error('Registration error:', error);
        const errorMessage = error.response?.data?.message || "Registration failed, please try again.";
        alert(errorMessage, "error");
      }
    },
  });

  return (
    <div>
      <div className='container mt-5'>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header text-primary d-flex justify-content-between align-items-center">
                <b>AddArt</b>
              </div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      placeholder="Title"
                      {...formik.getFieldProps('title')}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="text-danger">{formik.errors.title}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      className="form-control"
                      placeholder="Description"
                      {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-danger">{formik.errors.description}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      id="price"
                      className="form-control"
                      placeholder="Price"
                      {...formik.getFieldProps('price')}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <div className="text-danger">{formik.errors.price}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      className="form-control"
                      {...formik.getFieldProps('category')}
                    >
                      <option value="" label="Select category" />
                      <option value="painting" label="Painting" />
                      <option value="sculpture" label="Sculpture" />
                      <option value="photography" label="Photography" />
                      <option value="drawing" label="Drawing" />
                      <option value="other" label="Other" />
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                      <div className="text-danger">{formik.errors.category}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="artist">Artist</label>
                    <input
                      type="text"
                      id="artist"
                      className="form-control"
                      placeholder="Artist"
                      {...formik.getFieldProps('artist')}
                    />
                    {formik.touched.artist && formik.errors.artist ? (
                      <div className="text-danger">{formik.errors.artist}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="images">Images</label>
                    <input
                      type="text"
                      id="images"
                      className="form-control"
                      placeholder="Image URL"
                      {...formik.getFieldProps('images')}
                    />
                    {formik.touched.images && formik.errors.images ? (
                      <div className="text-danger">{formik.errors.images}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      className="form-control"
                      placeholder="Location"
                      {...formik.getFieldProps('location')}
                    />
                    {formik.touched.location && formik.errors.location ? (
                      <div className="text-danger">{formik.errors.location}</div>
                    ) : null}
                  </div>
                  <button type="submit" className="btn btn-primary mt-4" style={{ width: "100%" }}>
                    Add
                  </button>
                </form>

                <p className='justify-content-end d-flex mt-2'>
                  <Link to="/AdminDashboard/Adminhome">Back to Home</Link>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addart;
