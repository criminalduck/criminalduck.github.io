import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleInfo, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

import ProjectsLink from "./ProjectsLink";

export default function ProjectItem({ item, searchResultId }) {
    return (
        <li className={`project-item ${item.id === searchResultId ? "search-active" : ""}`}>
            <div className="column">
                <h2>{item.title} <span>- {item.date}</span></h2>
                <p>{item.description}</p>
                <ul className="buttons">
                    <li><ProjectsLink className="btn btn-secondary" projectId={item.id}><FontAwesomeIcon className="icon" icon={faCircleInfo}/>More Info</ProjectsLink></li>
                    <li><button className="btn btn-secondary"><FontAwesomeIcon className="icon" icon={faThumbsUp}/></button></li>
                    <li><button className="btn btn-secondary"><FontAwesomeIcon className="icon" icon={faThumbsDown}/></button></li>
                </ul>
            </div>
            <img src={`/images/${item.images[0] || "default-image.webp"}`} alt={item.id} loading="lazy" />
        </li>
    );
}