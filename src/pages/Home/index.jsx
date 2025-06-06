    import useFetchSolution from "../../components/hooks/useFetchSolution";
    import styles from "./Home.module.css";
    import GameCard from "../../components/GameCard";
    import { useEffect } from "react";
    import { useInView } from "react-intersection-observer";
    import SearchGame from "./components/SearchGame";

    // https://api.rawg.io/api/games?key=API_KEY&search=

    export default function Home() {

    const initialUrl = `https://api.rawg.io/api/games?key=8a1e2bfd098c496697fcedad3a008932&dates=2024-01-01,2019-12-31&page=1`;

    const { games } = useFetchSolution(initialUrl);
    
    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (games.items.length && inView && !games.isLoading) {
        games.loadMore();
        }
    }, [inView, games]);
    
    return (
        <div className={styles.main}>
        <div>
            <div className={styles.heading}>
            <div style={{ width: "50%" }}>
                <h1>New and trending</h1>
                <p>Based on player counts and release date</p>
            </div>
            <div style={{ width: "50%" }}>
                <SearchGame />
            </div>
            </div>
            {games.isLoading && (
            <img
                style={{ width: "100%", height: "100vh" }}
                alt="loading"
                id="loadingImages"
                src="https://imgur.com/lefvQyi"
            />
            )}
            <div className={styles.games_wrapper}>
            {games &&
                games.items.map((game) => <GameCard key={game.id} game={game} />)}
            </div>
            <div ref={ref} aria-busy="true" className="loading"></div>
        </div>
        </div>
    );
    }
