import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { useState } from 'react';
import notesAppImage from '../images/notes_app.jpg';

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isSignupHovered, setIsSignupHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setSearchText('');
    setQuery('');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setQuery(value);
  };

  return (
    <nav
      className="bg-gray-800 p-4 text-white flex justify-between items-center"
      style={{ backgroundImage: `url(${notesAppImage})` }}
    >
      <div className="text-xl font-bold">
        <Link to="/">NotesApp</Link>
      </div>
      {user && (
        <input
        type="text"
        value={searchText}
        placeholder="Search notes..."
        onChange={handleSearchChange}
        className="bg-gray-600 bg-opacity-50 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
      />
      
      )}
      <div>
        {!user ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-400 px-6 py-3 text-lg font-semibold rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center"
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
            >
              {isLoginHovered ? 'Start Up ' : 'Login'}
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
            <Link
              to="/register"
              className="bg-yellow-500 hover:bg-yellow-400 px-6 py-3 text-lg font-semibold rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center"
              onMouseEnter={() => setIsSignupHovered(true)}
              onMouseLeave={() => setIsSignupHovered(false)}
            >
              {isSignupHovered ? 'Register Now' : 'Signup'}
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        ) : (
          <>
            <span className="mr-4 text-lg font-semibold text-white py-2 px-4 border border-white rounded-md ">
              {user.name}
            </span>
            <button
              className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
