import { getTrendingMovies } from "./api"
import { IMovie } from "../interface/movies.interface";
import { observeMovies } from "./observeMovies";

class PopulateMovies {
    constructor() {
        this.init()
    }

    async init() {
        const movies = await getTrendingMovies()
        
        movies.forEach((movie: IMovie) => {
            this.generateCard(movie)
        })

        observeMovies()
    }

    generateCard(movie: IMovie) {
        const container = document.getElementById("movies")

        const content = `
            <section class="movie">
                <div class="movie__backdrop">
                    <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt aria-hidden="true" />
                    <div></div>
                </div>
                <div class="movie__data">
                    <div class="movie__data--general">
                        <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title} Poster"/>
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

        container.insertAdjacentHTML('beforeend', content)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const page = new PopulateMovies()
})