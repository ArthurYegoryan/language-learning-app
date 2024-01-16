import Button from "@/generalComponents/button/Button.component";
import "./TeacherCoursesArea.css";
import P from "@/generalComponents/texts/P.component";
import { useState } from "react";
import VideosModal from "./videosModal/VideosModal";

const TeacherCoursesArea = ({ coursesData }) => {
    const [ videosModal, setVideosModal ] = useState(false);
    const [ selectedCourse, setSelectedCourse ] = useState({});

    const openCloseVideosModal = () => {
        setVideosModal(!videosModal);
    };

    const onClickRelatedVideos = (id) => {
        coursesData.map((course) => {
            if (course.id === id) {
                setSelectedCourse({
                    ...course,
                    isSelected: true
                });
                openCloseVideosModal();
            }
        });
        console.log("onClickRelatedVideos");
    };

    return (
        <div className="teacher-courses-area">
            <P text="My Courses" className="teacher-courses-header-text" />
            <div className="teacher-courses-container">
                {coursesData.map((course) => {
                    return (
                        <div className="teacher-course-card" key={course.id}>
                            <P text={course.courseName} className="teacher-course-card-coursename" />
                            <div className="teacher-course-card-image-info">
                                <div className="teacher-course-card-image">
                                    <img src={`static/images/${course.languageType}.svg`} alt={`${course.languageType}`} />
                                </div>
                                <div className="teacher-course-card-info">
                                    <P text={`Creation time: ` + course.createdAt} />
                                </div>
                                <div className="see-related-videos-div">
                                    <Button label="See related videos" 
                                            className="see-related-videos-button" 
                                            onClickHandler={() => {
                                                console.log("Clicked course id: " + course.id);
                                                onClickRelatedVideos(course.id);
                                            }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                {videosModal &&
                    <VideosModal course={selectedCourse} onRequestClose={openCloseVideosModal}/>
                }
            </div>
        </div>
    );
};

export default TeacherCoursesArea;