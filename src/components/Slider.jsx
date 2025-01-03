import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDatabase, ref, get } from "firebase/database";
import app from '../firebaseConfig';
import LoadingSpinner from "./Loading";
import { useNavigate } from "react-router-dom";

const HomePageSlider = () => {
  const [data, setData] = useState([]); // Ma'lumotni saqlash uchun state
  const [isLoading, setIsLoading] = useState(true); // Yuklanish holati
  const [error, setError] = useState(null); // Xatoliklarni boshqarish
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const starCountRef = ref(db, 'movies/animes'); // Firebase yo'li
        const snapshot = await get(starCountRef);
        const myData = snapshot.val();

        if (myData) {
          const temporaryArray = Object.keys(myData).map((key) => ({ ...myData[key], animeId: key }));
          setData(temporaryArray); // Ma'lumotni state ga saqlash
        } else {
          setError("No anime data found.");
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false); // Yuklanish tugadi
      }
    };

    fetchData();
  }, []); // Faqat component o'zgarishda ma'lumotni olish

  const settings = {
    dots: false, // Pastdagi nuqtalarni olib tashlash
    infinite: true, // Cheksiz aylanish
    speed: 500, // Tezlik (ms)
    slidesToShow: 1, // Bir vaqtning o'zida ko'rsatiladigan slaydlar soni
    slidesToScroll: 1, // Har bir aylanishda nechta slayd ko'rsatilishini belgilaydi
    autoplay: true, // Avtomatik aylanish
    autoplaySpeed: 3000, // Har bir slayd uchun o'tish vaqti (ms)
    arrows: false, // Har bir slayd uchun o'tish vaqti (ms)
  };

  // Yuklanayotgan holatni ko'rsatish
  if (isLoading) {
    return <div><LoadingSpinner /></div>;
  }

  // Xatolik yuz berganda
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto bg-gray-100 py-0 rounded-2xl mb-5">
      <Slider {...settings}>
        {data.map((anime, index) => (
          <div key={index} className="relative max-h-[600px]">
            <img
              src={anime.s_img || "https://via.placeholder.com/1200x400"} // Tasvir bo'lmasa zaxira tasvir
              alt={anime.name}
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs md:text-xl lg:text-3xl font-bold">
            <button onClick={() => navigate(`/unit/${anime.animeId}`)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded-2xl">смотреть</button>
              <h3>{anime.name}</h3>
              <p>{anime.season} сезон {anime.episode_count} эпизод</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePageSlider;
