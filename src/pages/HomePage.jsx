import About from "./sections/About.jsx";
import Home from "./sections/Home.jsx";

export default function HomePage() {
    return (
        <>
            <Home/>
            <div className="section-spacer"></div>
            <About/>
        </>
    );
}