import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBug,
    faEnvelope,
    faPaperPlane,
    faPlane,
    faThumbsDown,
    faThumbsUp,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/feedback-form.css";

export default function FeedbackPopup({ children, projectID }) {
    const [isOpen, setIsOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState("");
    const [logo, setLogo] = useState(null);

    // Function to open modal with feedback type
    const openModal = (type) => {
        setFeedbackType(type);
        setIsOpen(true);

        if (type === "like") {
            setLogo(faThumbsUp);
        } else if (type === "dislike") {
            setLogo(faThumbsDown);
        } else if (type === "contact") {
            setLogo(faEnvelope)
        } else if (type === "bug") {
            setLogo(faBug);
        }
    };

    return (
        <>
            {children({ openModal })}

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2><FontAwesomeIcon className="icon" icon={logo}/>Send Feedback</h2>
                        <form
                            action="https://formsubmit.co/glasseyheston@gmail.com"
                            method="POST"
                        >
                            {/* Param Hidden Fields */}
                            <input type="hidden" name="project_id" value={projectID} />
                            <input type="hidden" name="feedback_type" value={feedbackType} />

                            {feedbackType === "bug" && (
                                <textarea
                                    name="bug-field"
                                    placeholder="Website or Project Title..."
                                    className="bug-field"
                                    required
                                />
                            )}

                            <textarea
                                name="message"
                                placeholder="Write your feedback..."
                                required
                            />

                            {/* FormSubmit Hidden Fields */}
                            <input type="hidden" name="_captcha" value="true" />

                            <div className="modal-actions">
                                <button type="submit">
                                    <FontAwesomeIcon className="icon" icon={faPaperPlane} /> Send
                                </button>
                                <button type="button" className="close-btn" onClick={() => setIsOpen(false)}>
                                    <FontAwesomeIcon className="icon" icon={faXmark} /> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}