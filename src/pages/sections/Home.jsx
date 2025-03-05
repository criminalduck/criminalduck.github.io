import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGamepad, faGlobe, faRobot} from "@fortawesome/free-solid-svg-icons";

import SurpriseMeBtn from "../../components/SurpriseMeBtn.jsx";
import ProjectsLink from "../../components/ProjectsLink.jsx";

import '../../styles/home.css';
import filtersData from "../../data/filters.json";
import projData from "../../data/proj-data.json";
import displayIds from "../../data/display-ids.json";

export default function Home() {
    const fieldIcons = [
        { field: "gamedev", icon: faGamepad },
        { field: "website", icon: faGlobe },
        { field: "mod", icon: faRobot }
    ];

    return(
        <>
            <section id="home">
                <div className="container">
                    <div className="row">
                        <h2>Top Projects</h2>
                        <div className="tab-list">
                            {displayIds.slice(0, 6).map(id => {
                                const project = projData.find((item) => item.id === id)
                                {/*<ProjectsLink className="filter-tab" key={id} projectId={id} style={{ backgroundImage: `url('src/assets/${project.images[1] || "default-image.jpg"}')` }}>
                                        <h3>{project.title}</h3>
                                    </ProjectsLink>*/}
                                return (
                                    <ProjectsLink className="filter-tab" key={id} projectId={id}>
                                        <img src={`src/assets/${project.images[0] || "default-image.jpg"}`} alt={project.id + "-cover"} loading='lazy'/>
                                        <h3>{project.title}</h3>
                                    </ProjectsLink>
                                )
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <h2>Fields</h2>
                        <div className="tab-list">
                            {filtersData.field.map(filter => (
                                <ProjectsLink className="filter-tab" key={filter.id} filterValue={filter.id}>
                                    <h3><FontAwesomeIcon className="icon" icon={fieldIcons.find(item => item.field === filter.id).icon}/></h3>
                                    <h3>{filter.label}</h3>
                                </ProjectsLink>
                            ))}
                        </div>
                    </div>
                    <div className="buttons">
                        <ProjectsLink className="btn btn-secondary">View All</ProjectsLink>
                        <SurpriseMeBtn/>
                    </div>
                </div>
            </section>
        </>
    );
}