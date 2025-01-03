import useStore from "../zustand/store";

const GenreFilter = ({ genres }) => {
  const { selectedGenres = [], setSelectedGenres } = useStore(); // Устанавливаем значение по умолчанию как пустой массив

  const handleCheckboxChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      // Если жанр уже выбран, убираем его из массива
      setSelectedGenres(selectedGenres.filter((selected) => selected !== genre));
    } else {
      // Если жанра нет в массиве, добавляем его
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div
      className="grid  gap-2 max-h-[300px] md:max-h-[400px] lg:max-h-[600px] overflow-y-auto rounded-lg p-4 bg-white dark:bg-gray-800"
    >
      {genres.map((genre, index) => (
        <label key={index} className="text-md flex items-center space-x-2">
          <input
            type="checkbox"
            value={genre}
            checked={selectedGenres.includes(genre)}
            onChange={() => handleCheckboxChange(genre)}
            className="form-checkbox h-4 w-4 text-blue-600 rounded"
          />
          <span className="text-gray-700 dark:text-gray-300">{genre}</span>
        </label>
      ))}
    </div>
  );
};

export default GenreFilter;
