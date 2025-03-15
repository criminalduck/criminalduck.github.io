import {useEffect, useRef} from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SlideItem from "./SlideItem.jsx";
import ErrorLoadDisplayFailed from "../errors/ErrorLoadDisplayFailed.jsx";
import Loading from "../main/Loading.jsx";

export default function Slider({ currentIndex, setCurrentIndex, filteredData }) {
    const cycleRef = useRef(null);

    useEffect(() => {
        if (filteredData.length === 0) return;
        clearInterval(cycleRef.current);
        cycleRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
        }, 10000);
        return () => clearInterval(cycleRef.current);
    }, [filteredData, setCurrentIndex]); // No `currentIndex` dependency to prevent unnecessary re-renders

    const resetCycle = () => clearInterval(cycleRef.current);

    const nextSlide = () => {
        resetCycle();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
    };

    const prevSlide = () => {
        resetCycle();
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1));
    };

    return (
        <>
            <button className="slider-btn prev" onClick={prevSlide}>
                <FontAwesomeIcon className="icon" icon={faArrowLeft} />
            </button>
            <div className="display-box">
                <div className="display-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <SlideItem key={item.id} item={item} isActive={index === currentIndex} />
                        ))
                    ) : (
                        <>
                            <ErrorLoadDisplayFailed />
                            <Loading />
                        </>
                    )}
                </div>
            </div>
            <button className="slider-btn next" onClick={nextSlide}>
                <FontAwesomeIcon className="icon" icon={faArrowRight} />
            </button>
        </>
    );
}