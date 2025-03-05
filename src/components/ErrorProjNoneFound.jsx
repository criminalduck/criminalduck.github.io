import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ErrorProjNoneFound() {
    return (
        <div className="error">
            <h1><FontAwesomeIcon className="icon" icon={faCircleExclamation}/></h1>
            <h1 className="title">! No Items Found !</h1>
        </div>
    );
}