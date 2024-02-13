import "./StartCourseErrorModal.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";

const StartCourseErrorModal = ({ onRequestClose }) => {
    return (
        <div className="s-start-course-error-modal">
            <div onClick={onRequestClose} className="s-start-course-error-overlay"></div>
            <div className="s-start-course-error-modal-content">
                <div className="s-start-course-error-modal-title">
                    <P text="Sorry, accured error while starting course!" className="s-start-course-error-modal-title-text" />
                    <P text="Please, try again!" className="s-start-course-error-modal-title-text" />
                </div>
                <div className="s-start-course-error-modal-icon-div">
                    <img src="static/images/error.svg" alt="error" className="s-start-course-error-modal-icon" />
                </div>
                <div className="s-start-course-error-modal-button-div">
                    <Button label="Ok!" className="s-start-course-error-modal-button" onClickHandler={onRequestClose} />
                </div>                
            </div>            
        </div>
    );
};

export default StartCourseErrorModal;