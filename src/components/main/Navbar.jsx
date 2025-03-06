import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faHouse, faUser, faFolder } from "@fortawesome/free-solid-svg-icons";

import SocialButtons from "./SocialButtons.jsx";
import SurpriseMeBtn from "./SurpriseMeBtn.jsx";

export default function Navbar() {
    return (
        <nav id="navbar">
            <Link className="logo" to="/"><FontAwesomeIcon className="icon" icon={faCode}/>Portfolio</Link>
            <ul className="main-menu">
                <li><Link className="btn btn-primary" to="/#home"><FontAwesomeIcon className="icon" icon={faHouse}/>Home</Link></li>
                <li><Link className="btn btn-primary" to="/#about"><FontAwesomeIcon className="icon" icon={faUser}/>About</Link></li>
                <li><Link className="btn btn-primary" to="/projects"><FontAwesomeIcon className="icon" icon={faFolder}/>Projects</Link></li>
                <li><SurpriseMeBtn/></li>
                <li className="spacer"></li>
                <SocialButtons/>
            </ul>
        </nav>
    );
}