const filterData = (data) => {
    return data.filter((item) => {
      const matchesGenres =
        selectedGenres.length === 0 ||
        (item.genres && item.genres.some((genre) => selectedGenres.includes(genre.name)));
  
      const matchesSearch = item.title?.toLowerCase().includes((search || "").toLowerCase());
  
      return matchesGenres && matchesSearch;
    });
  };
  
  const filteredDataByGenre = filterData(data);
  