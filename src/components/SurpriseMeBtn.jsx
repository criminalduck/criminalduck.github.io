import { Link } from "react-router-dom";
import {useState} from "react";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import projData from "../data/proj-data.json";

export default function SurpriseMeBtn() {
    const [randomId, setRandomId] = useState(null);
    if (randomId === null) {getLink()}
    function getLink() {
        const randNum = Math.floor(Math.random() * projData.length);
        setRandomId(projData[randNum].id);
    }
    return (
        <Link className="btn btn-secondary" onClick={getLink} to={`/projects/${randomId}`} style={{ padding: "0.5rem 1rem" }}><FontAwesomeIcon className="icon" icon={faBolt}/>Surprise Me</Link>
    );
}