import "./StudentStudyingCourseModal.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const StudentStudyingCourseModal = ({ studyingCourse, teachers, onRequestClose }) => {
    const [ videosData, setVideosData ] = useState()
    const [ isModalVideoDataImageHovered, setIsModalVideoDataImageHovered ] = useState(false);
    const [ showVideoURL, setShowVideoURL ] = useState(false);
    const [ videoUrl, setVideoUrl ] = useState("");
    const [ emptyDataText, setEmptyDataText ] = useState(false);
    const { userid } = useSelector((state) => state.auth.value);

    useEffect(() => {
        const fetchVideosData = async () => {
            const teacherVideos = await fetchDataFromFirestore("teachersVideos");

            console.log("Studying course: ", JSON.stringify(studyingCourse, null, 2));
            console.log("Teacher videos: ", JSON.stringify(teacherVideos, null, 2));

            const courseVideos = teacherVideos.filter((videoData) => {
                return studyingCourse.courseId === videoData.courseID;
            });

            if (!courseVideos.length) {
                setEmptyDataText(true);
            } else {
                courseVideos.map((videoData) => {
                    videoData.isHovered = false
                    videoData.isClicked = false
                });
                // console.log("Course videos data:");
                // console.log(JSON.stringify(courseVideos, null, 2));
                setVideosData(courseVideos);
            }
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
        <div className="s-studying-course-videos-modal">
            <div onClick={onRequestClose} className="s-studying-course-videos-overlay"></div>
            <div className="s-studying-course-videos-modal-content">
                <div className="s-studying-course-modal-title">
                    <P text={`${studyingCourse.courseName} videos!`} className="s-studying-course-modal-title-text" />
                </div>
                <div className="s-studying-course-modal-videos-div">
                    {videosData &&
                        videosData.map((videoData) => {
                            return (
                                <div className="s-studying-course-modal-video-container" key={videoData.id}>
                                    <div className="s-studying-course-modal-video-data">
                                        <a 
                                            href={videoUrl}
                                            download={videoData.videoName}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="s-studying-course-modal-video-data-image"
                                                onMouseOver={() => {
                                                    onMouseOverHandler(videoData);
                                                }}
                                                onMouseOut={() => {
                                                    onMouseOutHandler();
                                                }}
                                                onClick={() => {
                                                    onClickVideoImageHandler(studyingCourse.teacherId, videoData);
                                                }}
                                            >
                                                {videoData.isHovered && isModalVideoDataImageHovered &&
                                                    <img src="static/images/download.svg" alt="download" />
                                                }
                                                {!videoData.isHovered &&
                                                    <img src={studyingCourse.languageType === "c#" ? `static/images/c_sharp.svg` : 
                                                              studyingCourse.languageType === "c++" ? `static/images/c_plus.svg` :
                                                              `static/images/${studyingCourse.languageType}.svg`} 
                                                         alt="video" 
                                                    />
                                                }
                                            </div>
                                        </a>
                                        <div className="s-studying-course-modal-video-data-name-description">
                                            <P text={videoData.videoName} className="s-studying-course-modal-video-data-name" />
                                            <p>{"("}</p>
                                            <P text={videoData.videoDescription} className="s-studying-course-modal-video-data-description" />
                                            <p>{")"}</p>
                                        </div>
                                    </div>
                                    {videoData.isClicked && showVideoURL &&
                                        <>
                                            <P text="If there is a problem with download, here is video link, you can download manually:"
                                               className="s-studying-course-video-download-error-text" />
                                               {console.log(`Video url: ${JSON.stringify(videoUrl)}`)}
                                            <a href={videoUrl}
                                               target="_blank"
                                               className="s-studying-course-video-download-manually-link"
                                            >
                                                Video download link
                                            </a>
                                        </>
                                    }
                                </div>
                            )
                        })
                    }
                    {emptyDataText &&
                        <div className="s-studying-course-empty-video-text-div">
                            <P text="There in't any video in this course yet!" />
                        </div>
                    }
                </div>
                <div className="s-studying-course-close-modal-button-div">
                    <Button label="Close" className="s-studying-course-close-modal-button" onClickHandler={onRequestClose} />
                </div>                
            </div>            
        </div>
    );
};

export default StudentStudyingCourseModal;