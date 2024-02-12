import "./TeacherPostsArea.css";
import Button from "@/generalComponents/button/Button.component";
import P from "@/generalComponents/texts/P.component";
import { useState } from "react";

const TeachersPostsArea = ({ postsData }) => {
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
        <div className="teacher-posts-area">
            <P text="My Posts" className="teacher-posts-header-text" />
            <div className="teacher-posts-container">
                {postsData.map((post) => {
                    return (
                        <div className="teacher-post-card" key={post.id}>
                            <P text={post.postName} className="teacher-post-card-postname" />
                            <div className="teacher-post-card-container">
                                <div className="teacher-post-short-text-div" onClick={() => console.log("Mtanq")}>
                                    <P text={post.postText.length > 3 ? post.postText.split(" ").slice(0, 3).join(" ") + "..." : post.postText}
                                       className="teacher-post-text" 
                                    />
                                    <div className="teacher-post-arrow-down-icon-div">
                                        <img src="/static/images/downArrow.svg" alt="down-arrow" className="teacher-post-arrow-down-icon" />
                                    </div>
                                </div>
                                <div className="teacher-post-card-info">
                                    <P text={`Creation time: ` + post.createdAt} />
                                </div>
                                <div className="view-post-div">
                                    <Button label="View post" 
                                            className="view-post-button" 
                                            onClickHandler={() => {
                                                console.log("Mtanq");
                                            }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* {videosModal &&
                    // <VideosModal course={selectedCourse} onRequestClose={openCloseVideosModal}/>
                } */}
            </div>
        </div>
    );
};

export default TeachersPostsArea;