import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import MovieCredit from "../../../../components/movie-credit";
import MovieProviders from "../../../../components/movie-provider";
import { API_URL } from "../../../constants";
import { Metadata } from "next";

type MovieDetailPageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getMovie(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieDetail(props: MovieDetailPageProps) {
    const { id } = await props.params;

    return (
        <div>
            <Suspense fallback={<h1>Loading movie info</h1>}>
                <MovieInfo id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie videos</h1>}>
                <MovieVideos id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie credit</h1>}>
                <MovieCredit id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading movie providers</h1>}>
                <MovieProviders id={id} />
            </Suspense>
        </div>
    );
}

export async function generateMetadata(props: MovieDetailPageProps): Promise<Metadata> {
    const { id } = await props.params;
    const movie = await getMovie(id);
    return {
        title: movie.title,
    };
}
