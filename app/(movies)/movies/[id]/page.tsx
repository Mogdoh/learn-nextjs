import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import MovieCredit from "../../../../components/movie-credit";
import MovieProviders from "../../../../components/movie-provider";
import { title } from "process";
import { API_URL } from "../../../constants";

interface Props {
    params: {
        id: string;
    };
}

async function getMovie(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieDetail({ params }: Props) {
    const resolvedParams = await params;
    const movieId = resolvedParams.id;

    return (
        <div>
            <Suspense fallback={<h1>Loading movie info</h1>}>
                <MovieInfo id={movieId} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie videos</h1>}>
                <MovieVideos id={movieId} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie credit</h1>}>
                <MovieCredit id={movieId} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie providers</h1>}>
                <MovieProviders id={movieId} />
            </Suspense>
        </div>
    );
}

export async function generateMetadata({ params }: Props) {
    const resolvedParams = await params;
    const movie = await getMovie(resolvedParams.id);
    return {
        title: movie.title,
    };
}
