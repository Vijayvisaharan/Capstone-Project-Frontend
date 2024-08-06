import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userServices from '../services/userServices';


const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (values, { setSubmitting, setErrors }) => {
        try {
            const res = await userServices.loginUser(values.email, values.password);
            if (res && res.message) {
                alert(res.message, "success");
            }
            if (res && res.role) {
                if (res.role.toLowerCase() === 'admin') {
                    navigate("/AdminDashboard/Adminhome");
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || "Login failed, please try again.";
            alert(errorMessage, "error");
            setErrors({ email: errorMessage });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                            <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleLogin}
                                >
                                    {({ isSubmitting,errors }) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    c className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                            </div>
                                            <button type="submit" className='btn btn-primary mt-2' disabled={isSubmitting}>
                                                Login
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                                <p className='mt-2'>Don't have an account? <Link to="/register">Register</Link></p>
                                <p className='justify-content-end d-flex'><Link to="/">Back to Home</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

