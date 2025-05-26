"use server"

import { Movie } from "../types/Movie";
import {MovieDetail} from "@/app/types/MovieDetail";

export async function getMovies(title: string): Promise<Movie[]|undefined> {
    try {
        //title = title.replace(/\s/g, '');
        title = title.trim();
        const response = await fetch(`https://www.omdbapi.com/?apikey=cd2aa4ca&s=${title}`);
        const data = await response.json();
        const movies = data.Search as Movie[];
        return movies;
    }
    catch {
        return undefined;
    }
}

export async function getDetailedMovie(imdbID: string): Promise<MovieDetail | undefined> {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=cd2aa4ca&i=${imdbID}&plot=full`);
        const data = await response.json();
        const movie = data as MovieDetail;
        return movie;
    }
    catch {
        return undefined;
    }
}