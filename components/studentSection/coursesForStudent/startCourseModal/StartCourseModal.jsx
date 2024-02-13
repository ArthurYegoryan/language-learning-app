import "./StartCourseModal.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";

const StartCourseModal = ({ course, onRequestClose }) => {
    console.log("Course: ", course);

    return (
        <div className="s-start-course-modal">
            <div onClick={onRequestClose} className="s-start-course-overlay"></div>
            <div className="s-start-course-modal-content">
                <div className="s-start-course-modal-title">
                    <P text="Congratulations!" className="s-start-course-modal-title-text" />
                </div>
                <div className="s-start-course-modal-text-div">
                    <P text={`You have started studying ${course.courseName}!`} className="s-start-course-modal-general-text" />
                    <P text="Good luck :) !!!" className="s-start-course-modal-good-luck" />
                </div>
                <div className="s-start-course-modal-button-div">
                    <Button label="Nice!" className="s-start-course-modal-button" onClickHandler={onRequestClose} />
                </div>                
            </div>            
        </div>
    );
};

export default StartCourseModal;