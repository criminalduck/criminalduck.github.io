import { faCircleExclamation, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };
    return (
        <div className="container e404">
            <div className="error">
                <h1><FontAwesomeIcon className="icon" icon={faCircleExclamation}/></h1>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <button className="btn btn-secondary" onClick={goBack}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft} /> Go Back
                </button>
            </div>
        </div>
    );
}