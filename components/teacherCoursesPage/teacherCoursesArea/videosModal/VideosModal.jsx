import "./VideosModal.css";
import { addVideoInfoToFireStore } from "@/services/api/addVideoInfoToFireStore";
import { addVideoToStorage } from "@/services/api/addVideoToStorage";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import Button from "@/generalComponents/button/Button.component";
import P from "@/generalComponents/texts/P.component";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import { useSelector } from "react-redux";

const VideosModal = ({ course, onRequestClose }) => {
    const [ videosData, setVideosData ] = useState()
    const [ isModalVideoDataImageHovered, setIsModalVideoDataImageHovered ] = useState(false);
    const [ hoveredVideoData, setHoveredVideoData ] = useState({});

    const [ video, setVideo ] = useState("");
    const [ videoStorageID, setVideoStorageID ] = useState("");
    const [ videoName, setVideoName ] = useState("");
    const [ videoDescription, setVideoDescription ] = useState("");
    const [ videoEmptyError, setVideoEmptyError ] = useState(false);
    const [ videoNameEmptyError, setVideoNameEmptyError ] = useState(false);
    const [ isVideoUploaded, setIsVideoUploaded ] = useState(false);
    const [ videoUploadError, setVideoUploadError ] = useState(false);
    const { userid } = useSelector((state) => state.auth.value);
    const [ videoInfo, setVideoInfo ] = useState({
                                            videoStorageID,
                                            videoName,
                                            videoDescription,
                                            courseID: course.id,
                                            user: userid
                                        });
    

    const onClickUploadButton = async (evt) => {
        evt.preventDefault();

        if (!video) {
            setVideoEmptyError(true);
        } else if (!videoName) {
            setVideoNameEmptyError(true);
        } else {
            console.log("Video uploading...");

            const videoUuid = uuid();
            setVideoStorageID(videoUuid);
            videoInfo.videoStorageID = videoUuid;
            console.log("Video info:");
            console.log(JSON.stringify(videoInfo, null, 2));

            const addedVideo = await addVideoToStorage(userid, video, videoUuid);
            
            setTimeout(async () => {
                if (addedVideo) {
                    const added = await addVideoInfoToFireStore(videoInfo);
    
                    if (added) {
                        setVideo("");
                        setVideoStorageID("");
                        setVideoName("");
                        setVideoDescription("");
                        setIsVideoUploaded(true);
                    }
                } else {
                    setVideoUploadError(true);
                }
            }, 10000);
        };
    }

    useEffect(() => {
        const fetchVideosData = async () => {
            const data = await fetchDataFromFirestore("teachersVideos");
            data.map((videoData) => videoData.isHovered = false)
            console.log("Videos data:");
            console.log(JSON.stringify(data, null, 2));
            setVideosData(data);
        }
        fetchVideosData();
    }, []);

    const onMouseOverHandler = (videoData) => {
        videosData.map((data) => {
            if (data.id === videoData.id) {
                videoData.isHovered = true;
                setIsModalVideoDataImageHovered(true);
            }
        });
    };

    const onMouseOutHandler = () => {
        videosData.map((data) => {
            data.isHovered = false;
        });
        setIsModalVideoDataImageHovered(false);
    };

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
                                    setVideoInfo({
                                        ...videoInfo,
                                        videoName
                                    })
                               }} />
                        <input type="file" 
                               onChange={(evt) => {
                                    setVideoEmptyError(false);
                                    setVideo(evt.target.files[0]);
                               }} />
                    </div>
                    <div className="videos-description-div">
                        <Input type="text" 
                               placeholder="Enter video description" 
                               classNameDiv="video-description-input-div" 
                               onChangeHandler={(evt) => {
                                   setVideoDescription(evt.target.value);
                                   setVideoInfo({
                                       ...videoInfo,
                                       videoDescription
                                   })
                               }}/>
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
                    {videoUploadError &&
                        <P text="Failed to upload video, please try again!" className="video-error-text" />
                    }
                </div> 

                <div className="modal-title">
                    <P text={`${course.courseName} videos!`} className="modal-title-text" />
                </div>
                <div className="modal-videos-div">
                    {videosData &&
                        videosData.map((videoData) => {
                            return (
                                <div className="modal-video-data" key={videoData.id}>
                                    <div className="modal-video-data-image"
                                        onMouseOver={() => {
                                            onMouseOverHandler(videoData);
                                        }}
                                        onMouseOut={() => {
                                            onMouseOutHandler()
                                        }}
                                    >
                                        {videoData.isHovered && isModalVideoDataImageHovered &&
                                            <img src="static/images/download.svg" alt="download" />
                                        }
                                        {!videoData.isHovered &&
                                            <img src={`static/images/${course.languageType}.svg`} alt="video" />
                                        }
                                    </div>
                                    <div className="modal-video-data-name-description">
                                        <P text={videoData.videoName} className="modal-video-data-name" />
                                        <p>{"("}</p>
                                        <P text={videoData.videoDescription} className="modal-video-data-description" />
                                        <p>{")"}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Button label="Close" className="close-modal-button" onClickHandler={onRequestClose} />
            </div>            
        </div>
    );
};

export default VideosModal;