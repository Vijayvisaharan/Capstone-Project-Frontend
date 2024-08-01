import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userServices from '../services/userServices'

import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await userServices.loginUser(email, password);
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
                                <form onClick={handleLogin}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2">Login</button>
                                </form>
                                <p className='mt-2'>Don't have an account? <Link to="/register">Register</Link></p>
                                <p className='justify-content-end d-flex'><Link to="/">Back to Home</Link></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
