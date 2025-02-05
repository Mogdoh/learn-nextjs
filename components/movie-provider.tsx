import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-provider.module.css";

interface Provider {
    id: number;
    logo_path: string;
    provider_name: string;
    link?: string;
}

interface ProviderResponse {
    results: {
        KR?: {
            flatrate?: Provider[];
            rent?: Provider[];
            buy?: Provider[];
        };
    };
}

async function getProviders(id: string) {
    console.log(id);
    const response = await fetch(`${API_URL}/${id}/providers`);
    return response.json();
}

export default async function MovieProvider({ id }: { id: string }) {
    const data: ProviderResponse = await getProviders(id);
    const providers = [
        ...(data?.results?.KR?.flatrate || []),
        ...(data?.results?.KR?.rent || []),
        ...(data?.results?.KR?.buy || []),
    ];

    if (providers.length === 0) {
        return <div>현재 이용 가능한 스트리밍 서비스가 없습니다.</div>;
    }

    return (
        <div>
            <ul className={styles.providerList}>
                {providers.map((provider) => (
                    <li key={provider.provider_name} className={styles.providerItem}>
                        {provider.logo_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                alt={provider.provider_name}
                                className={styles.providerLogo}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
