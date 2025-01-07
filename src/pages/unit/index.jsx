import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/Loading";
import { getDatabase, ref, get } from "firebase/database";
import app from '../../firebaseConfig';

const Unit = () => {
    const { id } = useParams(); // URL'dan ID olish
    const [data, setData] = useState(null); // Ma’lumotni saqlash uchun boshlang‘ich qiymat `null`
    const [isLoading, setIsLoading] = useState(true); // Yuklanish holati
    const [error, setError] = useState(null); // Xatoliklarni boshqarish
    const [link, setLink] = useState("");
    const [selectedEpisode, setSelectedEpisode] = useState(null); // Tanlangan epizod

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase(app);
                const animeRef = ref(db, `movies/animes/${id}`); // Firebase yo‘li
                const snapshot = await get(animeRef);

                if (snapshot.exists()) {
                    const animeData = snapshot.val();
                    setData(animeData); // Ma’lumotni state-ga saqlash
                } else {
                    setError("Anime topilmadi!"); // Ma’lumot mavjud bo‘lmasa
                }
            } catch (error) {
                setError(`Xatolik yuz berdi: ${error.message}`); // Xatoliklar bilan ishlash
            } finally {
                setIsLoading(false); // Yuklash holatini tugatish
            }
        };

        fetchData();
    }, [id]); // ID o'zgarsa, qayta so‘rov jo‘natiladi

    // Yuklash va xatolikni boshqarish
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    // Ma’lumotni ko‘rsatish
    return (
        <div className="dark:text-white xl:flex gap-3 justify-between mb-4 ">
            {/* Anime haqida umumiy ma’lumot */}
            <div className="max-w-[800px] w-full">
                <div className="flex mb-5  pr-2 items-center rounded-l-full sm:rounded-full bg-green-100 dark:bg-gray-800">
                    <div>
                        <img
                            className="w-20 min-w-20 h-20 md:w-28 md:min-w-28 md:h-28 rounded-full"
                            src={data?.img || "https://via.placeholder.com/150"} // Tasvir bo‘lmasa, zaxira tasvir
                            alt={data?.name || "Anime"}
                        />
                    </div>
                    {link ? (
                        <h2 className="text-sm ml-2 sm:text-lg md:text-2xl">
                            Смотреть {data?.name || "Anime"} {selectedEpisode}-серия
                        </h2>
                    ) : (
                        <h2 className="text-sm ml-2 max-w-[600px] sm:text-lg md:text-2xl break-words">
                            Смотреть {data?.name || "Anime"} все серии и сезоны
                        </h2>
                    )}
                </div>

                <div className="mb-5 px-3">
                    {link && (
                        <iframe
                            src={`${link}/preview`}
                            className="w-full h-[300px] sm:h-[300px] md:h-[500px] rounded-2xl"
                            frameBorder="0"
                            allow="autoplay; encrypted-media; fullscreen" // fullscreen qo‘shildi
                            allowFullScreen // allowfullscreen atributi
                        ></iframe>
                    )}
                </div>

                {/* Epizodlar ro‘yxati */}

                <ul className="grid grid-cols-3 md:grid-cols-4 p-4 gap-2">
                    {data?.episodes && Array.isArray(data.episodes) ? (
                        data.episodes.map((episode, index) => (
                            <li
                                onClick={() => {
                                    setLink(episode.link);
                                    setSelectedEpisode(index + 1);
                                }}
                                key={index}
                                className="mb-2 cursor-pointer text-sm sm:text-lg bg-green-100 dark:bg-gray-800 px-3 py-2 rounded-lg md:text-2xl"
                            >
                                {`${index + 1} серия`}
                            </li>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            Epizodlar mavjud emas.
                        </div>
                    )}
                </ul>
            </div>
            <div className="bg-green-100 dark:bg-gray-800 rounded-2xl p-4 w-[90%] ml-auto mr-auto lg:w-[800px] lg:ml-0 lg:mr-0 xl:max-w-[400px]">
                <p className="text-[12px] text-left sm:text-sm md:text-lg border-b py-4 mb-3 border-black dark:text-gray-300 dark:border-white">
                    Жанры: {data.janr?.length > 0 ? data.janr.map((genre) => genre.name).join(", ") : "Не указано"}
                </p>
                <p className="text-sm sm:text-lg md:text-2xl">{data.description}</p>
            </div>
        </div>
    );
};

export default Unit;
