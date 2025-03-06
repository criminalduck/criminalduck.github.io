import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faHouse, faUser, faFolder } from "@fortawesome/free-solid-svg-icons";

import SocialButtons from "./SocialButtons.jsx";
import SurpriseMeBtn from "./SurpriseMeBtn.jsx";

export default function Navbar() {
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const offset = 80;

        if (window.location.pathname === '/') {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionPosition = section.offsetTop;
                window.scrollTo({
                    top: sectionPosition - offset,
                    behavior: 'smooth',
                });
            }
        } else {
            navigate('/');
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: sectionPosition - offset,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    };

    return (
        <nav id="navbar">
            <Link className="logo" to="/"><FontAwesomeIcon className="icon" icon={faCode}/>Portfolio</Link>
            <ul className="main-menu">
                <li><button className="btn btn-primary" onClick={() => scrollToSection('home')}><FontAwesomeIcon className="icon" icon={faHouse}/>Home</button></li>
                <li><button className="btn btn-primary" onClick={() => scrollToSection('about')}><FontAwesomeIcon className="icon" icon={faUser}/>About</button></li>
                <li><Link className="btn btn-primary" to="/projects"><FontAwesomeIcon className="icon" icon={faFolder}/>Projects</Link></li>
                <li><SurpriseMeBtn/></li>
                <li className="spacer"></li>
                <SocialButtons/>
            </ul>
        </nav>
    );
}