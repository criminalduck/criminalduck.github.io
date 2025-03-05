import {Link} from "react-router-dom";
import { faCircleExclamation, faHouse } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function NotFoundPage() {
    return (
        <div className="container e404">
            <div className="error">
                <h1><FontAwesomeIcon className="icon" icon={faCircleExclamation}/></h1>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link className="btn btn-secondary" to="/"><FontAwesomeIcon className="icon" icon={faHouse}/>Go Back Home</Link>
            </div>
        </div>
    );
}