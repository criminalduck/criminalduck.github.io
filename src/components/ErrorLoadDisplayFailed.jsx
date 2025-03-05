import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ErrorLoadDisplayFailed() {
    return (
        <div className="error">
            <h1><FontAwesomeIcon className="icon" icon={faCircleExclamation}/></h1>
            <h1 className="title">! Failed to load Display data !</h1>
            <p className="sub-text">Try Refreshing the Page</p>
        </div>
    );
}