import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";

import ProjectsLink from "../project/ProjectsLink.jsx";

export default function SlideItem({ item, isActive }) {
    return (
        <li className={`slider-item ${isActive ? "current" : ""}`} style={{ backgroundImage: `url('/images/${item.images[1] || "default-image.webp"}')` }}>
            <div className="header">
                <p className="main-tag">{item.tags[0].toUpperCase()}</p>
                <h1>{item.title}</h1>
            </div>
            <div className="main">
                <div className="column">
                    <p>{item.description}</p>
                    <ProjectsLink className="btn btn-secondary" projectId={item.id}><FontAwesomeIcon className="icon" icon={faCircleInfo}/>More Info</ProjectsLink>
                </div>
                <div className="column">
                    <img src={`/images/${item.images[0] || "default-image.webp"}`} alt={`${item.id}-cover`}/>
                    <img src={`/images/${item.images[2] || "default-image.webp"}`} alt={`${item.id}-image2`}/>
                </div>
            </div>
        </li>
    );
}