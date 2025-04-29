import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "../pages/home/Home.module.css"


const url =
        "https://api.rawg.io/api/genres?key=8a1e2bfd098c496697fcedad3a008932";

        const style = {
            height: "300px",
            overflowY: "scroll"
        }


export function Sidebar() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
    const fetchGenres = async () => {
        
        const response = await fetch (url);
        const json = await response.json ();
        setGenres (json.results);
    }
    fetchGenres();
    }, []);


    return (
    <div className={styles.sidebar}>
        <details className="dropdown">
        <summary>Genres</summary>
        <ul style={style}>
            {genres.map((genre) =>(
                <li key={genre.id}>{genre.name}
                    <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                </li>
            ))}
        </ul>
        </details>
    </div>
    );
}
