import { useEffect, useState } from "react";
import LoadingSpinner from "./Loading";
import useStore from "../zustand/store";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";

const Read = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { addFavorite, removeFavorite } = useStore();

  const { search, selectedGenres, favorites } = useStore(); // Zustand

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const starCountRef = ref(db, "movies/animes");
        const snapshot = await get(starCountRef);
        const myData = snapshot.val();

        if (myData) {
          const temporaryArray = Object.keys(myData).map((key) => ({
            ...myData[key],
            animeId: key,
          }));
          setData(temporaryArray);
        } else {
          setData([]);
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  // Filtratsiya
  const filteredDataByGenre = data.filter((item) => {
    const matchesGenres =
      selectedGenres.length === 0 ||
      (item.janr && item.janr.some((genre) => selectedGenres.includes(genre.name)));

    const matchesSearch = item.name?.toLowerCase().includes((search || "").toLowerCase());

    return matchesGenres && matchesSearch;
  });

  const toggleFavorite = (anime) => {
    if (favorites.some((fav) => fav.animeId === anime.animeId)) {
      removeFavorite(anime.animeId);
    } else {
      addFavorite(anime);
    }
  };


  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Все аниме
      </h2>

      {filteredDataByGenre.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>По вашему запросу ничего не найдено</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDataByGenre.map((item) => {
            const isFavorite = favorites.some((fav) => fav.animeId === item.animeId);

            return (
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

                  {/* Favorit tugmasi */}
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-2 right-2"
                  >
                    {favorites.some((fav) => fav.animeId === item.animeId) ? (
                      <FaStar className="text-yellow-500 text-4xl" />
                    ) : (
                      <FaRegStar className="text-yellow-500 text-4xl" />
                    )}
                  </button>

                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Read;
