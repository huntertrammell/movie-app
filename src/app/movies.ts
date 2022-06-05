import { getTrendingMovies } from "./api";
import { IMovie } from "../interface/movies.interface";

const BACKDROP = "data-backdrop-src";
const POSTER = "data-poster-src";
class PopulateMovies {
  count: number;
  activeId: number;
  movies: IMovie[];

  constructor() {
    this.count = 0;
    this.activeId;
    this.movies;

    this.init();
  }

  async init() {
    this.movies = await getTrendingMovies();
    const nextBtn = document.querySelector("[data-movie-next]");
    const prevBtn = document.querySelector("[data-movie-prev]");

    this.movies.forEach((movie: IMovie) => {
      this.generateCard(movie);
      this.count++;
    });

    this.observeMovies();

    nextBtn.addEventListener("click", () => this.nextMovie());

    prevBtn.addEventListener("click", () => this.prevMovie());
  }

  generateCard(movie: IMovie) {
    const container = document.getElementById("movies");

    const content = `
            <section class="movie" data-movie id="movie_${this.count}" data-movie-id="${this.count}">
                <div class="movie__backdrop">
                    <img src="https://placeholder.pics/svg/300/000000-000000/000000" data-backdrop-src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" src="" alt aria-hidden="true" />
                    <div></div>
                </div>
                <div class="movie__data">
                    <div class="movie__data--general">
                        <img src="https://placeholder.pics/svg/300/000000-000000/000000" data-poster-src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title} Poster"/>
                    </div>
                    <div class="movie__data--meta">
                        <h2>${movie.title}</h2>
                        <ul>
                            <li><span>Release Date:</span> ${movie.release_date}</li>
                            <li><span>Avg review:</span> ${movie.vote_average} / 10
                        </ul>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            </section>
        `;

    container.insertAdjacentHTML("beforeend", content);
  }

  observeMovies() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const container = entry.target.closest("[data-movie]");

          if (entry.isIntersecting) {
            this.activeId = +container.getAttribute("data-movie-id");

            const backdrop = container.querySelector(
              `[${BACKDROP}]`
            ) as HTMLImageElement;

            const poster = container.querySelector(
              `[${POSTER}]`
            ) as HTMLImageElement;

            backdrop.src = backdrop.getAttribute(BACKDROP);
            backdrop.classList.add("fade-in");
            poster.src = poster.getAttribute(POSTER);

            entry.target.classList.add("fade-in-delay");
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
  }

  nextMovie() {
    if (this.activeId > 0) {
      document.getElementById(`movie_${this.activeId - 1}`).scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  prevMovie() {
    if (this.activeId < this.movies.length - 1) {
      document.getElementById(`movie_${this.activeId + 1}`).scrollIntoView({
        behavior: "smooth",
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const page = new PopulateMovies();
});
