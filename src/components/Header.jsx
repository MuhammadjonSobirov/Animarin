import { useState, useEffect } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import useStore from '../zustand/store';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebaseConfig";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  const { toggleDrawer, search, setSearch } = useStore();

  // Get initial dark mode setting from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  // Add or remove dark mode classes on mount and darkMode change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Listen for authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="w-32 flex items-center cursor-pointer">
          <img src="/logo.svg" alt="logo" />
        </div>

        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">Главная</Link>
          </li>
          <li>
            <Link to="/releases" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">Релизы</Link>
          </li>
          <li>
            <button onClick={toggleDrawer} className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">Жанры</button>
          </li>
        </ul>
        <form >
          <input value={search} onChange={(e) => setSearch(e.target.value)} className='bg-gray-100 px-4 hidden md:block py-2 rounded-lg dark:bg-gray-800 dark:text-white ' type="text" placeholder="Поиск" />
        </form>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
          >
            {darkMode ? (
              <MdOutlineLightMode className="w-6 h-6" />
            ) : (
              <MdDarkMode className="w-6 h-6" />
            )}
          </button>

          {/* Login/Profile button */}
          {user ? (
            <Link
              to="/profile"
              className="px-4 py-2 flex text-sm sm:text-base items-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <FaRegUser className='mr-2' />Профиль
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Войти
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={toggleDrawer}
            className="md:hidden text-gray-900 dark:text-gray-300 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;