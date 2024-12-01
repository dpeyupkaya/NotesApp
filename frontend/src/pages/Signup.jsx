import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-yellow-200 to-gray-800 animate-background">
      <div className="border-2 border-black shadow-lg p-8 w-80 bg-white bg-opacity-50 backdrop-blur-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800" htmlFor="name">Name</label>
            <input
              type="text"
              onChange={(e) => SetName(e.target.value)}
              placeholder="Enter Name"
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800" htmlFor="email">Email</label>
            <input
              type="text"
              onChange={(e) => SetEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 border-2  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800" htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => SetPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border-2  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-800 py-2 rounded-md hover:bg-yellow-400 transition duration-300"
          >
            Sign Up
          </button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-500 hover:text-yellow-700 transition duration-200 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
