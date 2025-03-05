import {faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ViewMore({ onLoadMore, total, loaded }) {
    return (
        <div className="view-more">
            <p>Showing {loaded} out of {total} Results</p>
            <button className="btn btn-secondary" onClick={onLoadMore}>
                <FontAwesomeIcon className="icon" icon={faEye}/> View More
            </button>
        </div>
    );
}