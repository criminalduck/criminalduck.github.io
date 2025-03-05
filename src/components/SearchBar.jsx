import { useState } from "react";
import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    };
    const handleClear = () => {
        setSearchText("");
        onSearch("");
    };

    return (
        <li className="searchbar">
            <FontAwesomeIcon className="searchIcon icon" icon={faMagnifyingGlass}/>
            <input className="searchInput" placeholder="Search for Project Titles..." type="text" onChange={handleInputChange} value={searchText}/>
            <button className="clearBtn" onClick={handleClear}><FontAwesomeIcon className="icon" icon={faCircleXmark}/></button>
        </li>
    );
}