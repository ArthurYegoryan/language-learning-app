import "./PostsForStudent.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import TeacherPostModal from "@/components/teacherPostsPage/teacherPostsArea/teacherPostModal/TeacherPostModal";

const PostsForStudent = () => {
    const [ postsdata, setPostsData ] = useState([]);
    const [ postModal, setPostModal ] = useState(false);
    const [ selectedPost, setSelectedPost ] = useState({});

    useEffect(() => {
        const fetchPostsData = async () => {
            const postsdata = await fetchDataFromFirestore("posts");

            setPostsData(postsdata);
            console.log("Posts data: ", postsdata);
        };
        fetchPostsData();
    }, []);

    const openClosePostModal = () => {
        setPostModal(!postModal);
    };

    const onClickViewPost = (id) => {
        postsdata.map((post) => {
            if (post.id === id) {
                setSelectedPost({
                    ...post,
                    isSelected: true
                });
                openClosePostModal();
            }
        });
    };

    const onClickSaveButton = (post) => {
        console.log("Post saved");
    }

    return (
        <div className="s-all-posts">
            <P text="All Posts" className="s-all-posts-header-text" />
            <div className="s-all-posts-container">
                {postsdata.map((post) => {
                    return (
                        <div className="s-all-post-card" key={post.id}>
                            <P text={post.postName} className="s-all-post-card-postname" />
                            <div className="s-all-post-card-container">
                                <div className="s-all-post-short-text-div" onClick={() => onClickViewPost(post.id)}>
                                    <P text={post.postText.length > 3 ? post.postText.split(" ").slice(0, 3).join(" ") + "..." : post.postText}
                                       className="s-all-post-text" 
                                    />
                                    <div className="s-all-post-arrow-down-icon-div">
                                        <img src="/static/images/downArrow.svg" alt="down-arrow" className="s-all-post-arrow-down-icon" />
                                    </div>
                                </div>
                                <div className="s-all-post-card-info">
                                    <P text={`Creation time: ` + post.createdAt} />
                                </div>
                                <div className="s-all-view-post-div">
                                    <Button label="View post" 
                                            className="s-all-view-post-button" 
                                            onClickHandler={() => {
                                                onClickViewPost(post.id);
                                            }}
                                    />
                                    <Button label="Save" 
                                            className="s-all-save-post-button"
                                            onClickHandler={() => onClickSaveButton()} />
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

export default PostsForStudent;