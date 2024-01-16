import "./VideosModal.css";
import { db } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import Button from "@/generalComponents/button/Button.component";
import P from "@/generalComponents/texts/P.component";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import { useSelector } from "react-redux";

const addVideoToFireStore = async (videoInfo) => {
    console.log(JSON.stringify(videoInfo, null, 2));
    try {
        const docRefVideo = await addDoc(collection(db, "teachersVideos"), videoInfo);
        console.log("Video add with id: " + docRefVideo);
        return true;
    } catch (err) {
        console.error("Error adding document ", err);
        return  false;
    }
}

const VideosModal = ({ course, onRequestClose }) => {
    const [ video, setVideo ] = useState("");
    const [ videoName, setVideoName ] = useState("");
    const [ videoEmptyError, setVideoEmptyError ] = useState(false);
    const [ videoNameEmptyError, setVideoNameEmptyError ] = useState(false);
    const [ isVideoUploaded, setIsVideoUploaded ] = useState(false);
    const { username } = useSelector((state) => state.auth.value);

    const videoInfo = {
        videoName,
        video,
        courseID: course.id,
        user: username
    };
    

    const onClickUploadButton = async (evt) => {
        evt.preventDefault();

        console.log(video);
        console.log("Video: " + JSON.stringify(video, null, 2));
        console.log("Video info: " + JSON.stringify(videoInfo, null, 2));

        if (!video) {
            setVideoEmptyError(true);
        } else if (!videoName) {
            setVideoNameEmptyError(true);
        } else {
            const added = await addVideoToFireStore(videoInfo);

            if (added) {
                setVideo("");
                setVideoName("");
            }
        }
    }

    return (
        <div className="modal">
            <div onClick={onRequestClose} className="overlay"></div>
            <div className="modal-content">
                <div className="add-video-div">
                    <div className="video-info-div">
                        <Input type="text" 
                               placeholder="Enter video name" 
                               classNameDiv="video-name-input-div" 
                               onChangeHandler={(evt) => {
                                    setVideoNameEmptyError(false);
                                    setVideoName(evt.target.value);
                               }} />
                        <input type="file" 
                               onChange={(evt) => {
                                    setVideoEmptyError(false);
                                    setVideo(evt.target.files[0]);
                               }} />
                    </div>                    
                    <Button label="+ Upload new video" className="upload-video-button" onClickHandler={onClickUploadButton} />
                    {videoEmptyError &&
                        <P text="Video isn't choosen, please check!" className="video-error-text" />
                    }
                    {videoNameEmptyError &&
                        <P text="Video name can't be empty!" className="video-error-text" />
                    }
                    {isVideoUploaded &&
                        <P text="Video uploaded successfully!" className="video-upload-success-text" />
                    }
                </div> 

                <div className="modal-title">
                    <P text={`${course.courseName} videos!`} className="modal-title-text" />
                </div>
                
                <p>{course.id}</p>
                {console.log("Courses data: " + JSON.stringify(course, null, 2))}
                {console.log("Course ID: " + course.id)}
                <Button label="Close" className="close-modal-button" onClickHandler={onRequestClose} />
            </div>            
        </div>
    );
};

export default VideosModal;