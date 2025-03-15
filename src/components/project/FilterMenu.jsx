import {useEffect, useState} from "react";
import React from "react";
import {faFilterCircleXmark, faShuffle, faTag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import filtersData from "/public/data/filters.json";
import Loading from "../main/Loading.jsx";
import {Tooltip} from "react-tooltip";

export default function FilterMenu({ isDropdownOpen, activeFilters, setActiveFilters, availableFilters }) {

    // Function to toggle a filter when clicked
    const toggleFilter = (filter) => {
        setActiveFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    const [previousRandomFilter, setPreviousRandomFilter] = useState(null);
    // Random filter logic
    const handleRandomFilter = () => {
        const available = availableFilters.filter(filter => filter !== previousRandomFilter);
        const randomFilter = available[Math.floor(Math.random() * available.length)];
        setActiveFilters([randomFilter]);
        setPreviousRandomFilter(randomFilter);
    };

    useEffect(() => {
        if (!filtersData) {
            return <Loading/>;
        }
    })

    return (
        <div id="filter-menu" className={isDropdownOpen ? "dropdown-show" : "dropdown"}>
            <li className="tools">
                <button id="clear-filter" className="btn btn-secondary" onClick={() => setActiveFilters([])} data-tooltip-id="clear-tooltip" data-tooltip-content="Clear Filters">
                    <FontAwesomeIcon className="icon" icon={faFilterCircleXmark}/>
                </button>
                <Tooltip id="clear-tooltip" />
                <button id="random-filter" className="btn btn-secondary" onClick={() => handleRandomFilter()} data-tooltip-id="random-tooltip" data-tooltip-content="Random Filter">
                    <FontAwesomeIcon className="icon" icon={faShuffle}/>
                </button>
                <Tooltip id="random-tooltip" />
            </li>

            {Object.keys(filtersData).map((category, index, array) => (
                <React.Fragment key={category}>
                    <li className="filter-list">
                        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <ul>
                            {filtersData[category].map(filter => (
                                <li key={filter.id}>
                                    <button
                                        className={`btn btn-secondary ${
                                            availableFilters.includes(filter.id) ? (activeFilters.includes(filter.id) ? "btn-pressed" : "") : "btn-disabled"
                                        }`}
                                        onClick={availableFilters.includes(filter.id) ? () => toggleFilter(filter.id) : null}
                                    >
                                        <FontAwesomeIcon className="icon" icon={faTag}/>{filter.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                    {index < array.length - 1 && <li className="spacer"></li>}
                </React.Fragment>
            ))}
        </div>
    );
}