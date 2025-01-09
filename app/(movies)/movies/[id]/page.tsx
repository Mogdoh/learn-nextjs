import { Suspense } from "react";
import { API_URL } from "../../../(home)/page";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import MovieCredit from "../../../../components/movie-credit";
import MovieProviders from "../../../../components/movie-provider";
import { title } from "process";

interface IParams {
    params: { id: string };
}

async function getMovie(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export async function generateMetadata({ params: { id } }: IParams) {
    const movie = await getMovie(id);
    return {
        title: movie.title,
    };
}

export default async function MovieDetail({ params: { id } }: { params: { id: string } }) {
    return (
        <div>
            <Suspense fallback={<h1>Loading movie info</h1>}>
                <MovieInfo id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie vieods</h1>}>
                <MovieVideos id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie credit</h1>}>
                <MovieCredit id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie provides</h1>}>
                <MovieProviders id={id} />
            </Suspense>
        </div>
    );
}
