import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function Loading({ className}) {
    return (
      <div className={"loading"+` ${className}`}>
          <h3><FontAwesomeIcon className="icon" icon={faSpinner} spinPulse/>Loading...</h3>
      </div>
    );
}