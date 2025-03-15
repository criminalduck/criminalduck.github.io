import { useState, useEffect } from "react";

import Slider from "../slider/Slider.jsx";
import ErrorLoadDisplayFailed from "../errors/ErrorLoadDisplayFailed.jsx";

import projData from "/public/data/proj-data.json";
import '../../styles/slider.css'

export default function RecommendProjects({ projectTags, projectId }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (projData.length === 0) {
            return <ErrorLoadDisplayFailed />;
        }
        const filtered = projData
            .filter(item => item.id !== projectId && item.tags.some(tag => projectTags.includes(tag)))
            .slice(0, 4);
        if (filtered.length === 0) {
            return <></>;
        }
        setFilteredData(filtered);
        setCurrentIndex(0);
    }, []);

    return (
        <section id="slider">
            <h1>SIMILAR PROJECTS</h1>
            <div className="container">
                <Slider currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} filteredData={filteredData} />
            </div>
            <ul className="project-bullet-list">
                {filteredData.map((item, index) => (
                    <li
                        key={index}
                        className={`project-bullet ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <img src={`/images/${item.images[0] || "default-image.webp"}`} alt={item.id} loading="lazy" />
                        <h2>{item.title}</h2>
                        <h3>{item.tags[0].toUpperCase()}</h3>
                    </li>
                ))}
            </ul>
        </section>
    );
}