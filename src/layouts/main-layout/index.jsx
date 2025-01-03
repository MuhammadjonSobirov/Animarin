import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
import useStore from '../../zustand/store';
import { IoClose } from "react-icons/io5";
import Drawer from '../../components/Drawer';
const MainLayout = () => {
  const { drawer, toggleDrawer } = useStore();
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/public/24a3bc7f939ba49ecc054061dccbac61.jpg)",
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>

      <div className="relative z-10 flex flex-col w-full min-h-screen dark:bg-black dark:bg-opacity-50">
        {/* Header with Drawer Button */}
        <Header />

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg dark:bg-gray-800 transform transition-transform duration-300 ease-in-out z-20 ${drawer ? 'translate-x-0' : '-translate-x-64'
            }`}
        >
          {/* Drawer Content */}
          <Drawer />
          <button
            onClick={toggleDrawer}
            className="absolute top-5 text-2xl right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoClose />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow pt-10 sm:px-28 text-center overflow-y-auto">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
