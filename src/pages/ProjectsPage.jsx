import { Suspense, lazy, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import ProjectList from "../components/ProjectList.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

import '../styles/projects-list.css';
import projData from "../data/proj-data.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading.jsx";

const DynamicProject = ({ projectId }) => {
    try {
        const ProjectComponent = lazy(() =>
            import(`./pages/projects/${projectId}Project.jsx`)
        );
        return <ProjectComponent />;
    } catch (error) {
        console.error("Error loading project component:", error);
        return <NotFoundPage />;
    }
};

export default function ProjectsPage() {
    const [searchParams] = useSearchParams();
    const { projectId } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        console.log("Rendering ProjectsPage with projectId:", projectId);
        if (projectId) {
            const selectedProject = projData.find((item) => item.id === projectId) || null;
            setProject(selectedProject);
        }
    }, [projectId]);

    if (projectId) {
        if (!project) {
            return <NotFoundPage />;
        }
        return (
            <div>
                <Link className="btn btn-secondary return-btn" to="/projects"><FontAwesomeIcon className="icon" icon={faArrowLeft}/>Back to Projects</Link>
                <Suspense fallback={<Loading/>}>
                    <DynamicProject projectId={project.id} />
                </Suspense>
            </div>
        );
    }

    return (
        <>
            <section id="projects">
                <ProjectList searchParams={searchParams} />
            </section>
        </>
    );
}