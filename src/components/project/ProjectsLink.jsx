import { Link } from "react-router-dom";

export default function ProjectsLink({ filterValue, searchValue, projectId, children, className, style}) {
    let linkTo;
    if (projectId) {
        linkTo = `/projects/${projectId}`;
    } else if (filterValue) {
        linkTo = `/projects?filter=${filterValue}`;
    } else if (searchValue) {
        linkTo = `/projects?search=${searchValue}`;
    } else {
        linkTo = "/projects";
    }

    return (
        <Link className={className} to={linkTo} style={style}>
            {children}
        </Link>
    );
}