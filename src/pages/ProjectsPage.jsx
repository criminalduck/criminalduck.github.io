import {Suspense, lazy, useEffect, useState, useMemo} from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

import ProjectList from "../components/project/ProjectList.jsx";
import NotFoundPage from "./NotFoundPage";
import Loading from "../components/main/Loading.jsx";

import '../styles/projects-list.css';
import projData from "/public/data/proj-data.json";
import FeedbackPopup from "../components/main/FeedbackPopup.jsx";
import RecommendProjects from "../components/project/RecommendProjects.jsx";

const DynamicProject = ({ projectId }) => {
    const [loaded, setLoaded] = useState(false);
    const [ProjectComponent, setProjectComponent] = useState(() => NotFoundPage);

    useEffect(() => {
        let isMounted = true;

        import(`../pages/projects/${projectId}.jsx`)
            .then((module) => {
                if (isMounted) {
                    setProjectComponent(() => module.default);
                    setLoaded(true); // ✅ Set loaded when import is successful
                }
            })
            .catch(() => {
                if (isMounted) {
                    setProjectComponent(() => NotFoundPage);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [projectId]);

    return (
        <Suspense fallback={<Loading />}>
            <ProjectComponent projectId={projectId} />
            {loaded && (
                <FeedbackPopup projectID={projectId}>
                    {({ openModal }) => (
                        <>
                            <div className="project-feedback">
                                <h2>Feedback</h2>
                                <p>If you have any thoughts about my projects please tell me if you liked or disliked my project and you can send some feedback in the form below!</p>
                                <div className="options">
                                    <button className="btn btn-secondary" onClick={() => openModal("like")}><FontAwesomeIcon className="icon" icon={faThumbsUp}/></button>
                                    <button className="btn btn-secondary" onClick={() => openModal("dislike")}><FontAwesomeIcon className="icon" icon={faThumbsDown}/></button>
                                </div>
                            </div>
                        </>
                    )}
                </FeedbackPopup>
            )}
        </Suspense>
    );
};

export default function ProjectsPage() {
    const [searchParams] = useSearchParams();
    const { projectId } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        if (projectId) {
            /* console.log("Rendering ProjectsPage with projectId:", projectId); */
            const selectedProject = projData.find(
                (item) => item.id.toLowerCase() === projectId.toLowerCase()
            ) || null;
            setProject(selectedProject);
        }
    }, [projectId]);

    if (projectId) {
        if (!project) {
            return <NotFoundPage />;
        }
        return (
            <section id="projects">
                <div className="container">
                    <Link className="btn return-btn" to="/projects"><FontAwesomeIcon className="icon" icon={faArrowLeft}/>Back to Projects</Link>
                    <DynamicProject projectId={project.id} />
                    <div className="section-spacer"></div>
                    <RecommendProjects/>
                </div>
            </section>
        );
    }

    return (
        <section id="projects">
            <ProjectList searchParams={searchParams} />
        </section>
    );
}