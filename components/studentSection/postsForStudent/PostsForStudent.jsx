import "./PostsForStudent.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import TeacherPostModal from "@/components/teacherPostsPage/teacherPostsArea/teacherPostModal/TeacherPostModal";
import { addSavedPostToFireStore } from "@/services/api/addSavedPostToFireStore";
import { v4 as uuid } from "uuid";

const PostsForStudent = () => {
    const [ postsdata, setPostsData ] = useState([]);
    const [ savedPostsdata, setSavedPostsData ] = useState([]);
    const [ postModal, setPostModal ] = useState(false);
    const [ selectedPost, setSelectedPost ] = useState({});
    const [ isSavedPostAdded, setIsSavedPostAdded ] = useState(false);
    let { userid } = useSelector((state) => state.auth.value);

    if (!userid) userid = localStorage.getItem("userid");

    useEffect(() => {
        const fetchPostsData = async () => {
            const postsdata = await fetchDataFromFirestore("posts");

            setPostsData(postsdata);
        };
        fetchPostsData();
    }, []);

    useEffect(() => {
        const fetchPostsData = async () => {
            const savedPostsData = await fetchDataFromFirestore("savedPosts");

            setSavedPostsData(savedPostsData);
        };
        fetchPostsData();
    }, [isSavedPostAdded]);

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

    const savedPostHandler = (post) => {
        let isSaved = false;

        savedPostsdata.map((savedPost) => {
            if (savedPost.postId === post.id && savedPost.studentId === userid) {
                isSaved = true;
            }
        });

        return isSaved;
    }

    const onClickSaveButton = async (post) => {
        const savedPostData = {
            id: uuid(),
            postName: post.postName,
            postText: post.postText,
            createdAt: post.createdAt,
            postId: post.id,
            authorId: post.userid,
            studentId: userid,
        };

        const added = await addSavedPostToFireStore(savedPostData);

        if (added) {
            setIsSavedPostAdded(true);
        }
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
                                    {savedPostHandler(post) ?
                                        <button disabled className="s-all-post-saved-button">Saved</button> :
                                        <Button label="Save" 
                                            className="s-all-save-post-button"
                                            onClickHandler={() => onClickSaveButton(post)}
                                        />
                                    }                                    
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