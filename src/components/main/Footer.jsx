import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faCompass, faEnvelope, faFire, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import SocialButtons from "./SocialButtons.jsx";
import ProjectsLink from "../project/ProjectsLink.jsx";
import useIsNew from "../../hooke/useIsNew.js";

import displayIds from "/public/data/display-ids.json";
import projData from "/public/data/proj-data.json";

export default function Footer() {
    const newProjects = projData.filter((project) => useIsNew(project.date));
    return (
        <section id="footer">
            <div className="container">
                <div className="nav">
                    <Link className="logo" to="/"><FontAwesomeIcon className="icon" icon={faCode}/>Portfolio</Link>
                    <ul><SocialButtons/></ul>
                </div>
                <div className="section-spacer"></div>
                <ul className="main">
                    <ul>
                        <li><h3><FontAwesomeIcon className="icon" icon={faCompass}/>Navigation</h3></li>
                        <li><Link className="btn btn-primary" to="/#home">Home</Link></li>
                        <li><Link className="btn btn-primary" to="/#about">About</Link></li>
                        <li><Link className="btn btn-primary" to="/projects">Projects</Link></li>
                    </ul>
                    {projData.length > 0 && (
                        <ul>
                            <li><h3><FontAwesomeIcon className="icon" icon={faFolderOpen}/>Top Projects</h3></li>
                            {displayIds.slice(0, 5).map(id => (
                                <li key={id}><ProjectsLink className="btn btn-primary" projectId={id}>
                                    {projData.find((item) => item.id === id).title}
                                </ProjectsLink></li>
                            ))}
                        </ul>
                    )}
                    {newProjects.length > 0 && (
                        <ul>
                            <li><h3><FontAwesomeIcon className="icon" icon={faFire}/>New Projects</h3></li>
                            {newProjects.slice(0, 5).map((project) => (
                                <li key={project.id}>
                                    <ProjectsLink className="btn btn-primary" projectId={project.id}>
                                        {project.title}
                                    </ProjectsLink>
                                </li>
                            ))}
                        </ul>
                    )}
                    {/*<ul>
                        <li><h3><FontAwesomeIcon className="icon" icon={faLink}/>Other</h3></li>
                        <li><Link className="btn btn-primary" to="/#home">Home</Link></li>
                    </ul>*/}
                </ul>
                <p><FontAwesomeIcon className="icon" icon={faEnvelope}/>Contact Us at studio@email.com</p>
            </div>
        </section>
    );
}