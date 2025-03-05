import ProjectsLink from "./ProjectsLink.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";

export default function SlideItem({ item, isActive }) {
    return (
        <li className={`slider-item ${isActive ? "current" : ""}`} style={{ backgroundImage: `url('src/assets/${item.images[1] || "default-image.jpg"}')` }}>
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
                    <img src={`src/assets/${item.images[0] || "default-image.jpg"}`} alt={`${item.id}-cover`}/>
                    <img src={`src/assets/${item.images[2] || "default-image.jpg"}`} alt={`${item.id}-image2`}/>
                </div>
            </div>
        </li>
    );
}