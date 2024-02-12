import "./TeacherPostsArea.css";
import Button from "@/generalComponents/button/Button.component";
import P from "@/generalComponents/texts/P.component";
import { useState } from "react";
import TeacherPostModal from "./teacherPostModal/TeacherPostModal";

const TeachersPostsArea = ({ postsData }) => {
    const [ postModal, setPostModal ] = useState(false);
    const [ selectedPost, setSelectedPost ] = useState({});

    const openClosePostModal = () => {
        setPostModal(!postModal);
    };

    const onClickViewPost = (id) => {
        postsData.map((post) => {
            if (post.id === id) {
                setSelectedPost({
                    ...post,
                    isSelected: true
                });
                openClosePostModal();
            }
        });
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
                                <div className="teacher-post-short-text-div" onClick={() => onClickViewPost(post.id)}>
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
                                                onClickViewPost(post.id);
                                            }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                {postModal &&
                    <TeacherPostModal post={selectedPost} onRequestClose={openClosePostModal}/>
                }
            </div>
        </div>
    );
};

export default TeachersPostsArea;