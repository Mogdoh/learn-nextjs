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
    const response = await fetch(`${API_URL}/${id}/providers`);
    return response.json();
}

export default async function MovieProvider({ id }: { id: string }) {
    const data = await getProviders(id);

    return (
        <div>
            <ul className={styles.providerList}>
                {data.map((provider) => (
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
