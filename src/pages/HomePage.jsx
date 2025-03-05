import About from "./sections/About";
import Home from "./sections/Home";

export default function HomePage() {
    return (
        <>
            <Home/>
            <div className="section-spacer"></div>
            <About/>
        </>
    );
}