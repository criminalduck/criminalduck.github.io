import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleInfo, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

import ProjectsLink from "./ProjectsLink";
import ProjectBanners from "./ProjectBanners";
import useFormattedDate from "../../hooke/useFormattedDate.js";

export default function ProjectItem({ item, searchResultId }) {
    const formattedDate = useFormattedDate(item.date);
    return (
        <li className={`project-item ${item.id === searchResultId ? "search-active" : ""}`}>
            <div className="column">
                <h2>{item.title} {item.status !== 'upcoming' && (<span className="sub-text">{`- ${formattedDate}`}</span>)}
                    <span><ProjectBanners item={item}/></span> </h2>
                <p>{item.description}</p>
                {item.status === "upcoming" ? (item.date && (
                    <p className="upcoming-notice">
                        Estimated Release Date : <span>{formattedDate}</span>
                    </p>
                )) :
                    <ul className="buttons">
                        <li><ProjectsLink className="btn btn-secondary" projectId={item.id}>
                            <FontAwesomeIcon className="icon" icon={faCircleInfo}/> More Info
                        </ProjectsLink></li>
                        <li><button className="btn btn-secondary"><FontAwesomeIcon className="icon" icon={faThumbsUp}/></button></li>
                        <li><button className="btn btn-secondary"><FontAwesomeIcon className="icon" icon={faThumbsDown}/></button></li>
                    </ul>
                }
            </div>
            <img src={`/images/${item.images[0] || "default-image.webp"}`} alt={item.id} loading="lazy" />
        </li>
    );
}