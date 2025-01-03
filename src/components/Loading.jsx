import { FiLoader } from "react-icons/fi";

const LoadingSpinner = () => {
    return (
      <div className="flex justify-center  items-center h-screen">
        <div className="animate-spin text-[#ff0000]"><FiLoader /></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  