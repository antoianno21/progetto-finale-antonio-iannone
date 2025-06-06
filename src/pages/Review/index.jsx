    import styles from "./review.module.css";
    import { useParams, Link } from "react-router";
    import supabase from "../../supabase/client";
    import { Toaster, toast } from "sonner";
    import useFetchSolution from "../../components/hooks/useFetchSolution";

    export default function Review() {
    const { id } = useParams();

        const initialUrl = `https://api.rawg.io/api/games/${id}?key=8a1e2bfd098c496697fcedad3a008932`;

    const { loading, data: game, error } = useFetchSolution(initialUrl);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const review = event.currentTarget;
        const { title, content } = Object.fromEntries(new FormData(review));
        const { error } = await supabase
        .from("reviews")
        .insert([
            {
            review_title: title,
            review_content: content,
            game_id: id,
            game_name: game.name
            },
        ])
        .select();
        if (error) {
        review.reset();
        toast.error("Recensione lasciata male 😡");
        } else {
        review.reset();
        toast.success("Recensione caricata correttamente 🥰");
        }
    };

    return (
        <div className={styles.review_block}>
        {loading && (
            <img
            style={{ width: "100%", height: "100vh" }}
            alt="loading"
            id="loadingImages"
            src="https://imgur.com/lefvQyi"
            />
        )}
        {error && <h1>{error}</h1>}
        <h1>
            Write a comment about{" "}
            <Link to={`/games/${id}/${game && game.name}`}>
            {game && game.name}
            </Link>
        </h1>
        <div style={{ width: "70%" }}>
            <form onSubmit={handleReviewSubmit}>
            <fieldset>
                <label>
                Review title
                <input name="title" required />
                </label>
                <label>
                Review text
                <textarea type="text" name="content" required />
                </label>
            </fieldset>
            <input type="submit" value="Pubblish review" />
            </form>
            <Toaster position="bottom-center" />
        </div>
        </div>
    );
    }

