import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faFire, faLaptopCode} from "@fortawesome/free-solid-svg-icons";
import useIsNew from "../../hooke/useIsNew.js";

export default function ProjectBanners({ item }) {
    const isNew = useIsNew(item.date);
    return (
      <>
          {item.status === 'upcoming' ? (
              <p className="banner coming"><FontAwesomeIcon className="icon" icon={faCalendar}/>Coming Soon</p>
              ) :
              isNew && (
                  <p className="banner new"><FontAwesomeIcon className="icon" icon={faFire}/>New</p>
              )
          }
          {item.status === 'dev' && (
              <p className="banner dev"><FontAwesomeIcon className="icon" icon={faLaptopCode}/>Dev</p>
          )}
      </>
    );
}