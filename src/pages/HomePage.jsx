import PageNav from "./../components/PageNav";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <PageNav />
            <h1> WorldWise </h1>
            <Link to="/app">Go to app</Link>
        </div>
    );
}

export default HomePage;
