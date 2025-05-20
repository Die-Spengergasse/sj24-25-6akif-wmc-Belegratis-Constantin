import { getDetailedMovie } from '../moviesApiClient';
import MovieDetailView from './MovieDetailView';

export default async function MoviesDetailPage({
                                                   params,
                                               }: {
    params: Promise<{ imdbID: string }>
}) {
    const imdbID = (await params).imdbID;
    const movie = await getDetailedMovie(imdbID);
    return (
        <div>
            {typeof movie === 'undefined' ? (
                <div><p>Movie could not be found</p></div>
            ) : (
                <MovieDetailView movie={movie} />
            )}
        </div>
    )
}