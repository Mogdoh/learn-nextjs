import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-provider.module.css";

interface Provider {
    provider_id: number;
    logo_path: string;
    provider_name: string;
    display_priority: number;
}

interface ProviderResponse {
    KR?: {
        link: string;
        flatrate?: Provider[];
        buy?: Provider[];
        rent?: Provider[];
    };
}

async function getProviders(id: string) {
    const response = await fetch(`${API_URL}/${id}/providers`);
    return response.json();
}

export default async function MovieProvider({ id }: { id: string }) {
    const data: ProviderResponse = await getProviders(id);
    const krData = data.KR;

    console.log("Flatrate:", krData?.flatrate);
    console.log("Rent:", krData?.rent);
    console.log("Buy:", krData?.buy);

    if (!krData) {
        return <div>현재 이용 가능한 스트리밍 서비스가 없습니다.</div>;
    }

    return (
        <div className={styles.container}>
            {/* Flatrate 섹션 */}
            {krData.flatrate && krData.flatrate.length > 0 && (
                <div className={styles.section}>
                    <h3>스트리밍</h3>
                    <ul className={styles.providerList}>
                        {krData.flatrate.map((provider) => (
                            <li key={provider.provider_id} className={styles.providerItem}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className={styles.providerLogo}
                                />
                                <span>{provider.provider_name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Rent 섹션 */}
            {krData.rent && krData.rent.length > 0 && (
                <div className={styles.section}>
                    <h3>대여</h3>
                    <ul className={styles.providerList}>
                        {krData.rent.map((provider) => (
                            <li key={provider.provider_id} className={styles.providerItem}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className={styles.providerLogo}
                                />
                                <span>{provider.provider_name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Buy 섹션 */}
            {krData.buy && krData.buy.length > 0 && (
                <div className={styles.section}>
                    <h3>구매</h3>
                    <ul className={styles.providerList}>
                        {krData.buy.map((provider) => (
                            <li key={provider.provider_id} className={styles.providerItem}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className={styles.providerLogo}
                                />
                                <span>{provider.provider_name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
