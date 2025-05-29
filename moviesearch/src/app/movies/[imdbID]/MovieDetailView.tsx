import { MovieDetail } from "@/app/types/MovieDetail";
import styles from "./MovieDetailView.module.css";


interface MovieDetailViewProps {
    movie: MovieDetail;
}

export default async function MoviesDetailPage( {movie}: MovieDetailViewProps) {


    return (
        <div className={styles.movieDetail}>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
            <p>{movie.Plot}</p>
            <ul>
                {movie.Ratings.map(rating => (
                    <li key={rating.Source}>{rating.Source}: {rating.Value}</li>
                ))}
            </ul>
        </div>
    )
}