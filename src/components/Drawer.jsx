import { Link } from "react-router-dom";
import useStore from "../zustand/store";
import GenreFilter from "./GenreFilter";

const Drawer = () => {
    const { search, setSearch } = useStore();

    const genres = [
        "Приключения", "Боевик", "Комедия", "Повседневность", "Романтика",
        "Драма", "Фантастика", "Фэнтези", "Мистика", "Детектив", "Триллер",
        "Психология", "Боевые искусства", "Вампиры", "Военное", "Демоны",
        "Игры", "История", "Космос", "Магия", "Меха", "Музыка", "Пародия",
        "Полиция", "Самураи", "Сёдзё", "Сёнен", "Спорт", "Суперсила",
        "Ужасы", "Школа"
    ];

    return (
        <div className="p-2 flex flex-col items-center">
            <div className="w-52">
                <img src="/public/logo.svg" alt="logo" />
            </div>
            <form >
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='bg-gray-100 px-4 py-2 rounded-lg md:hidden dark:bg-gray-700 dark:text-white ' type="text" placeholder="Поиск" />
            </form>
            <ul className="mt-4 flex gap-5 text-xl mb-5 md:hidden">
                <li>
                    <Link to="/" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">Главная</Link>
                </li>
                <li>
                    <Link to="/releases" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">релизы</Link>
                </li>
            </ul>
            {/* Genre Selector */}
            <h3 className="text-gray-900 dark:text-gray-300 mb-5">Жанры</h3>
            <GenreFilter genres={genres} />
        </div>
    )
}

export default Drawer