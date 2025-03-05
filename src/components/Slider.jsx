import {useState, useEffect, useRef} from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SlideItem from "./SlideItem";
import Bullet from "./Bullet";
import ErrorLoadDisplayFailed from "./ErrorLoadDisplayFailed";
import Loading from "./Loading.jsx";

import '../styles/slider.css'
import projData from "../data/proj-data.json";
import displayIds from "../data/display-ids.json"

export default function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const [loadFailed, setLoadFailed] = useState(false);
    const cycleRef = useRef(null);

    useEffect(() => {
        if (displayIds.length === 0 || projData.length === 0) {
            setLoadFailed(true);
            return;
        }
        const filtered = projData.filter(item => displayIds.includes(item.id));
        if (filtered.length === 0) {
            setLoadFailed(true);
            return;
        }
        setFilteredData(filtered);
        setCurrentIndex(0);
    }, []);

    // Auto-cycling
    useEffect(() => {
        if (filteredData.length === 0) return;
        clearInterval(cycleRef.current);
        cycleRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
        }, 10000);
        return () => clearInterval(cycleRef.current);
    }, [filteredData, currentIndex]);

    const resetCycle = () => {
        clearInterval(cycleRef.current);
    };

    const nextSlide = () => {
        resetCycle();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
    };

    const prevSlide = () => {
        resetCycle();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <section id="slider">
                <div className="container">
                    <button className="slider-btn prev" onClick={prevSlide}><FontAwesomeIcon className="icon" icon={faArrowLeft}/></button>
                    <div className="display-box">
                        <div className="display-slider" style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <SlideItem key={item.id} item={item} isActive={index === currentIndex}/>
                                ))
                            ) : (
                                <>
                                    {loadFailed ? <ErrorLoadDisplayFailed/> : <Loading/>}
                                </>
                            )}
                        </div>
                    </div>
                    <button className="slider-btn next" onClick={nextSlide}><FontAwesomeIcon className="icon" icon={faArrowRight}/></button>
                </div>
                <ul className="bullet-list">
                    {filteredData.map((_, index) => (
                        <Bullet key={index} isActive={index === currentIndex} onClick={() => setCurrentIndex(index)}/>
                    ))}
                </ul>
            </section>
        </>
    );
}