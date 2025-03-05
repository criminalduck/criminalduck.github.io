import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPatreon, faSteam, faYoutube} from "@fortawesome/free-brands-svg-icons";

export default function SocialButtons() {
    return (
        <>
            <li><a className="btn btn-primary btn-disabled" href="#" target="_blank" style={{padding: '0 0.5rem'}}><FontAwesomeIcon className="icon" icon={faYoutube}/></a></li>
            <li><a className="btn btn-primary btn-disabled" href="#" target="_blank" style={{padding: '0 0.4rem'}}><FontAwesomeIcon className="icon" icon={faPatreon}/></a></li>
            <li><a className="btn btn-primary btn-disabled" href="#" target="_blank" style={{padding: '0 0.3rem'}}><FontAwesomeIcon className="icon" icon={faSteam}/></a></li>
        </>
    );
}