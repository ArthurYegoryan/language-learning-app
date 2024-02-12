import "./VideosModal.css";
import { addVideoInfoToFireStore } from "@/services/api/addVideoInfoToFireStore";
import { addVideoToStorage } from "@/services/api/addVideoToStorage";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import Button from "@/generalComponents/button/Button.component";
import P from "@/generalComponents/texts/P.component";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import { useSelector } from "react-redux";

const VideosModal = ({ course, onRequestClose }) => {
    const [ videosData, setVideosData ] = useState()
    const [ isModalVideoDataImageHovered, setIsModalVideoDataImageHovered ] = useState(false);
    const [ showVideoURL, setShowVideoURL ] = useState(false);
    const [ videoUrl, setVideoUrl ] = useState("");
    const [ videoUrlsForManuallyDownload, setVideoUrlsForManuallyDownload ] = useState({});

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
            data.map((videoData) => {
                videoData.isHovered = false
                videoData.isClicked = false
            });
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

    const downloadVideoFromStorage = async (userid, videoid) => {
        const storage = getStorage();
        const videoRef = ref(storage, `videos/${userid}/${videoid}.mp4`);
        console.log(`Storage: ${JSON.stringify(storage, null, 2)}`);
        console.log(`Video ref: ${videoRef}`);
        console.log(`Video path: videos/${userid}/${videoid}.mp4`);
        
        return await getDownloadURL(videoRef)
            .then((url) => {
                console.log(`URL: ${url}`);
                setVideoUrl(url);
            })
            .catch((error) => {
                console.error("Occured error, please try again!");
            });
    };

    const onClickVideoImageHandler = async (userid, videoData) => {
        await downloadVideoFromStorage(userid, videoData.videoStorageID);
        videosData.map((data) => {
            if (data.id === videoData.id) {
                videoData.isClicked = true;
                setShowVideoURL(true);
            }
        });        
    };

    return (
        <div className="t-videos-modal">
            <div onClick={onRequestClose} className="t-videos-overlay"></div>
            <div className="t-videos-modal-content">
                <div className="t-add-video-div">
                    <div className="t-video-info-div">
                        <Input type="text" 
                               placeholder="Enter video name" 
                               classNameDiv="t-video-name-input-div" 
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
                    <div className="t-videos-description-div">
                        <Input type="text" 
                               placeholder="Enter video description" 
                               classNameDiv="t-video-description-input-div" 
                               onChangeHandler={(evt) => {
                                   setVideoDescription(evt.target.value);
                                   setVideoInfo({
                                       ...videoInfo,
                                       videoDescription
                                   })
                               }}/>
                    </div>
                    <Button label="+ Upload new video" className="t-upload-video-button" onClickHandler={onClickUploadButton} />
                    {videoEmptyError &&
                        <P text="Video isn't choosen, please check!" className="t-video-error-text" />
                    }
                    {videoNameEmptyError &&
                        <P text="Video name can't be empty!" className="t-video-error-text" />
                    }
                    {isVideoUploaded &&
                        <P text="Video uploaded successfully!" className="t-video-upload-success-text" />
                    }
                    {videoUploadError &&
                        <P text="Failed to upload video, please try again!" className="t-video-error-text" />
                    }
                </div> 

                <div className="modal-title">
                    <P text={`${course.courseName} videos!`} className="t-modal-title-text" />
                </div>
                <div className="modal-videos-div">
                    {videosData &&
                        videosData.map((videoData) => {
                            return (
                                <div className="modal-video-container" key={videoData.id}>
                                    <div className="modal-video-data">
                                        <a 
                                            href={videoUrl}
                                            download={videoData.videoName}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="modal-video-data-image"
                                                onMouseOver={() => {
                                                    onMouseOverHandler(videoData);
                                                }}
                                                onMouseOut={() => {
                                                    onMouseOutHandler();
                                                }}
                                                onClick={() => {
                                                    onClickVideoImageHandler(userid, videoData);
                                                }}
                                            >
                                                {videoData.isHovered && isModalVideoDataImageHovered &&
                                                    <img src="static/images/download.svg" alt="download" />
                                                }
                                                {!videoData.isHovered &&
                                                    <img src={`static/images/${course.languageType}.svg`} alt="video" />
                                                }
                                            </div>
                                        </a>
                                        <div className="modal-video-data-name-description">
                                            <P text={videoData.videoName} className="modal-video-data-name" />
                                            <p>{"("}</p>
                                            <P text={videoData.videoDescription} className="modal-video-data-description" />
                                            <p>{")"}</p>
                                        </div>
                                    </div>
                                    {videoData.isClicked && showVideoURL &&
                                        <>
                                            <P text="If there is a problem with download, here is video link, you can download manually:"
                                               className="video-download-error-text" />
                                               {console.log(`Video url: ${JSON.stringify(videoUrl)}`)}
                                            <a href={videoUrl}
                                               target="_blank"
                                               className="video-download-manually-link"
                                            >
                                                Video download link
                                            </a>
                                        </>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <Button label="Close" className="t-close-modal-button" onClickHandler={onRequestClose} />
            </div>            
        </div>
    );
};

export default VideosModal;