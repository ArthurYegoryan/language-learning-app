import "./TeacherPostModal.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";

const TeacherPostModal = ({ post, onRequestClose }) => {
    return (
        <div className="t-post-modal">
            <div onClick={onRequestClose} className="t-post-overlay"></div>
            <div className="t-post-modal-content">
                <div className="t-post-title">
                    <P text={`${post.postName}`} className="t-post-modal-title-text" />
                </div>
                <div className="t-post">
                    <P text={`${post.postText}`} />
                </div>
                <Button label="Close" className="t-post-close-modal-button" onClickHandler={onRequestClose} />
            </div>            
        </div>
    );
};

export default TeacherPostModal;