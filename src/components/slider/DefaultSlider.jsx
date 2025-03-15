import { useState, useEffect } from "react";

import Slider from "../slider/Slider.jsx";
import BulletList from "../slider/BulletList.jsx";
import ErrorLoadDisplayFailed from "../errors/ErrorLoadDisplayFailed.jsx";

import projData from "/public/data/proj-data.json";
import displayIds from "/public/data/display-ids.json";
import '../../styles/slider.css'

export default function DefaultSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const [loadFailed, setLoadFailed] = useState(false);

    useEffect(() => {
        if (displayIds.length === 0 || projData.length === 0) {
            setLoadFailed(true);
            return;
        }
        const filtered = projData.filter((item) => displayIds.includes(item.id));
        if (filtered.length === 0) {
            setLoadFailed(true);
            return;
        }
        setFilteredData(filtered);
        setCurrentIndex(0);
    }, []);

    if (loadFailed) return <ErrorLoadDisplayFailed />;

    return (
        <section id="slider">
            <div className="container">
                <Slider currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} filteredData={filteredData} />
            </div>
            <BulletList totalSlides={filteredData.length} currentIndex={currentIndex} onBulletClick={setCurrentIndex} />
        </section>
    );
}