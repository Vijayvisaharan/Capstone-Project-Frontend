import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userServices from '../services/userServices'

import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await userServices.registerUser(firstName, lastName, email, password, role.toLowerCase());
            alert("Registration successful", "success");
            navigate("/login");
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || "Registration failed, please try again.";
            alert(errorMessage, "error");
            navigate("/register");
        }
    };
    // console.log('Registering user with data:', { firstName, lastName, email, role });
    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
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
                                    <div className="role-options ">
                                        <button
                                            className={`role-button ${role === 'Admin' ? 'active' : ''} btn btn-primary m-2`}
                                            onClick={() => handleRoleChange('Admin')}
                                        >
                                            Admin
                                        </button>
                                        <button
                                            className={`role-button ${role === 'User' ? 'active' : ''} btn btn-primary m-2`}
                                            onClick={() => handleRoleChange('User')}
                                        >
                                            User
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleRegister}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">FirstName</label>
                                        <input type="text" className='form-control' id="firstName" placeholder='Enter First Name'
                                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">LastName</label>
                                        <input type="text" className='form-control' id="lastName" placeholder='Enter Last Name'
                                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className='form-control' id="email" placeholder='Enter Email'
                                            value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className='form-control' id="password" placeholder='Enter Password'
                                            value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className='btn btn-primary mt-2'>Register</button>
                                </form>
                                <p className='mt-2'>Already have an account? <Link to="/login">Login</Link>  </p>
                                <p className='justify-content-end d-flex'><Link to="/">Back to Home</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
