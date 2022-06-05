export const observeMovies = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("movie--active");
        }
      });
    },
    {
      root: document.body,
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.99,
    }
  );

  const movies = document.querySelectorAll(".movie__data");

  movies.forEach((movie) => {
    observer.observe(movie);
  });
};
