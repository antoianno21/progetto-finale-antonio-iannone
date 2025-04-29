    import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    } from "react-router";

    
import Home from "../pages/Home";
import Genre from "../pages/Genre";
import Game from "../pages/Game";

    const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route path="/" element={<Home />}/>
            <Route path="/games/:genre" element={<Genre />}/>
            <Route path="/games/:id/:game" element={<Game />}/>
        </Route>
    )
    );

    export default router;