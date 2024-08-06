import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userServices from '../services/userServices';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().oneOf(['admin', 'user'], 'Invalid role').required('Role is required'),
});

function Register(){
    const navigate = useNavigate();

    const handleRegister = async (values, { setSubmitting, setErrors }) => {
        try {
            const { firstName, lastName, email, password, role } = values;
            const res = await userServices.registerUser(firstName, lastName, email, password, role.toLowerCase());
            alert("Registration successful", "success");
            navigate("/login");
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || "Registration failed, please try again.";
            alert(errorMessage, "error");
            setErrors({ email: errorMessage });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header text-primary d-flex justify-content-between align-items-center">
                                <b>Register</b>
                                <div className="role-selector">
                                    <div className="role-options">
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <Formik
                                    initialValues={{ firstName: '', lastName: '', email: '', password: '', role: 'user' }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleRegister}
                                >
                                    {({ isSubmitting, setFieldValue, values, errors }) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name</label>
                                                <Field
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lastName">Last Name</label>
                                                <Field
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                            </div>
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
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="role">Role</label>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className={`role-button btn btn-primary m-2 ${values.role === 'admin' ? 'active' : ''}`}
                                                        onClick={() => setFieldValue('role', 'admin')}
                                                    >
                                                        Admin
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`role-button btn btn-primary m-2 ${values.role === 'user' ? 'active' : ''}`}
                                                        onClick={() => setFieldValue('role', 'user')}
                                                    >
                                                        User
                                                    </button>
                                                </div>
                                                <ErrorMessage name="role" component="div" className="invalid-feedback" />
                                            </div>
                                            <button type="submit" className='btn btn-primary mt-2' disabled={isSubmitting}>
                                                Register
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                                <p className='mt-2'>Already have an account? <Link to="/login">Login</Link></p>
                                <p className='justify-content-end d-flex'><Link to="/">Back to Home</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;


