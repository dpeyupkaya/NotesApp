import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.data.success) {
      
        localStorage.setItem('token', response.data.token);

  
        navigate('/');

        
        window.location.reload();  
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-green-300 to-gray-800">
      <div className="border-2 border-black shadow-lg p-8 w-80 bg-white bg-opacity-50 backdrop-blur-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800" htmlFor="email">Email</label>
            <input
              type="text"
              onChange={(e) => SetEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white bg-opacity-80"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800" htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => SetPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-white bg-opacity-80"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-gray-800 py-2 rounded-md hover:bg-green-400 transition duration-300"
          >
            Login
          </button>
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-500 hover:text-green-700 transition duration-200 underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
