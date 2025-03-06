import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBorderAll, faCaretRight, faGear, faList} from "@fortawesome/free-solid-svg-icons";

import FilterMenu from "./FilterMenu.jsx";
import SearchBar from "../other/SearchBar.jsx";

export default function ToolBar({ onSearch, onLayoutChange, activeFilters, setActiveFilters, availableFilters }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    useEffect(() => {
        if (activeFilters.length > 0) {
            setIsDropdownOpen(true);
        }
    }, [activeFilters]);

    const [layoutMode, setLayoutMode] = useState('list');
    const toggleLayout = (mode) => {
        setLayoutMode(mode);
        onLayoutChange(mode);
    };

    return (
        <>
            <ul className="toolbar">
                <li className="main">
                    <p><FontAwesomeIcon className="icon" icon={faGear} spin/></p>
                    <button id="dropdown-toggle" className={isDropdownOpen ? "arrow-rotate" : ""} onClick={toggleDropdown}><FontAwesomeIcon className="icon" icon={faCaretRight}/></button>
                </li>
                <SearchBar onSearch={onSearch} />
                <li className="layout">
                    <button id="layout-list" onClick={() => toggleLayout('list')}><FontAwesomeIcon className="icon" icon={faList}/></button>
                    <button id="layout-grid" onClick={() => toggleLayout('grid')}><FontAwesomeIcon className="icon" icon={faBorderAll}/></button>
                </li>
            </ul>
            <FilterMenu activeFilters={activeFilters} setActiveFilters={setActiveFilters} availableFilters={availableFilters} isDropdownOpen={isDropdownOpen} />
        </>
    );
}