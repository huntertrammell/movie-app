export const getTrendingMovies = async () => {
  const api = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=b20fd857a48febf56f02e2bba3f75e22"
  );

    const data = await api.json();
    
    return data.results;
};
