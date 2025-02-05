import styles from "../styles/movie-credit.module.css";
import { API_URL } from "../app/(home)/page";

interface CreditMember {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
}

async function getCredit(id: string) {
    const response = await fetch(`${API_URL}/${id}/credits`);
    return response.json();
}

export default async function MovieCredit({ id }: { id: string }) {
    const credit = await getCredit(id);
    const departmentMap = {
        Acting: "배우",
        Directing: "감독",
        Crew: "영화제작",
        ["Visual Effects"]: "VFX 디자이너",
    };

    return (
        <div>
            <div className={styles.header}>
                <h2>Cast</h2>
            </div>
            <div className={styles.container}>
                <ul className={styles.castList}>
                    {credit.map((member) => (
                        <li key={member.id} className={styles.castItem}>
                            {member.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                    alt={member.name}
                                    width={185}
                                    height={278}
                                    className={styles.castImage}
                                />
                            ) : (
                                <div className={styles.noImage}></div>
                            )}
                            <div className={styles.castInfo}>
                                <p className={styles.name}>{member.name}</p>
                                <p className={styles.character}>{member.character}</p>
                                <p className={styles.deartment}>
                                    {departmentMap[member.known_for_department] ||
                                        member.known_for_department}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
