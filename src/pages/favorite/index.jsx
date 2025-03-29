import { FaStar } from "react-icons/fa";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const { favorites, removeFavorite } = useStore();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Избранное
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Пока ничего нет
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <li
              key={item.animeId}
              className="bg-white border mx-auto w-[100%] relative max-w-72 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  onClick={() => navigate(`/unit/${item.animeId}`)}
                  className="w-full cursor-pointer max-h-96 mb-3 rounded-lg shadow-lg"
                  src={item.img || "https://via.placeholder.com/96"}
                  alt={item.name || "Anime rasmi"}
                />
                <div className="p-2">
                  <h5
                    onClick={() => navigate(`/unit/${item.animeId}`)}
                    className="mb-2 cursor-pointer text-sm lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {item.name || "Anime name"}
                  </h5>
                  <p className="text-[12px] hidden md:text-sm mb-3 md:block text-gray-600 dark:text-gray-300">
                    Жанры:{" "}
                    {item.janr?.length > 0
                      ? item.janr.map((genre) => genre.name).join(" , ")
                      : "Не указано"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Сезон: {item.season || "N/A"}, Серия: {item.episode_count || "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => removeFavorite(item.animeId)}
                  className="absolute top-2 right-2"
                >
                  <FaStar className="text-yellow-500 text-4xl" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorite;
