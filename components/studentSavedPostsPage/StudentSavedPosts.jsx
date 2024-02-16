"use client";

import "./StudentSavedPosts.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import TeacherPostModal from "../teacherPostsPage/teacherPostsArea/teacherPostModal/TeacherPostModal";

const StudentSavedPosts = () => {
    const [ studentSavedPosts, setStudentSavedPosts ] = useState([]);
    const [ isEmptySavedPosts, setIsEmptySavedPosts ] = useState(false);
    const [ teachers, setTeachers ] = useState([]);
    const [ postModal, setPostModal ] = useState(false);
    const [ selectedPost, setSelectedPost ] = useState({});
    const { userid } = useSelector((state) => state.auth.value);
    const { push } = useRouter();

    const onClickHome = () => {
        push("/student");
    }

    const openClosePostModal = () => {
        setPostModal(!postModal);
    };

    const onClickViewPost = (id) => {
        studentSavedPosts.map((post) => {
            if (post.id === id) {
                setSelectedPost({
                    ...post,
                    isSelected: true
                });
                openClosePostModal();
            }
        });
    };

    useEffect(() => {
        const fetchSavedPostsData = async () => {
            const savedPosts = await fetchDataFromFirestore("savedPosts");
            const users = await fetchDataFromFirestore("users");

            const teachers = users.filter(user => user.role === "teacher");

            setTeachers(teachers);

            console.log("Saved posts: ", JSON.stringify(savedPosts, null, 2));
            console.log("User id: ", userid);

            const studentSavedPosts = savedPosts.filter(savedPost => savedPost.studentId === userid);

            if (studentSavedPosts.length) {
                setStudentSavedPosts(studentSavedPosts);
            } else {
                setIsEmptySavedPosts(true);
            }            

            console.log("Student saved posts: ", studentSavedPosts);
        };
        fetchSavedPostsData();
    }, []);

    const getUsernameByID = (post) => {
        console.log("Test");
        console.log("Teachers: ", JSON.stringify(teachers, null, 2));
        console.log("Current post: ", JSON. stringify(post, null, 2));

        console.log(JSON.stringify(teachers.filter((teacher) => teacher.id === post.authorId)[0].username, null, 2));

        return teachers.filter((teacher) => teacher.id === post.authorId)[0].username;
    };

    return (
        <div className="saved-posts-section">
            <button className="saved-posts-go-home-button" onClick={onClickHome}>
                <img src="/static/images/home.svg" alt="home" />
            </button>
            <div className="saved-posts-cards">
                {studentSavedPosts.map((studentSavedPost) => {
                    return (
                        <div className="saved-posts-card" key={studentSavedPost.id}>
                            <div className="saved-posts-card-coursename-div">
                                <P text={studentSavedPost.postName} className="saved-posts-card-postname" />
                            </div>
                            <div className="saved-posts-card-container">
                                <div className="saved-posts-short-text-div" onClick={() => onClickViewPost(studentSavedPost.id)}>
                                    <P text={studentSavedPost.postText.length > 3 ? 
                                                         studentSavedPost.postText.split(" ").slice(0, 3).join(" ") + "..." : 
                                                         studentSavedPost.postText}
                                       className="saved-posts-text" 
                                    />
                                    <div className="saved-posts-arrow-down-icon-div">
                                        <img src="/static/images/downArrow.svg" alt="down-arrow" className="saved-posts-arrow-down-icon" />
                                    </div>
                                </div>
                                <div className="saved-posts-card-info">
                                    <div className="saved-posts-author-info">
                                        <P text="Author" className="saved-posts-info-author" />
                                        <P text={getUsernameByID(studentSavedPost)} className="saved-posts-info-authorname" />
                                    </div>
                                    <P text={`Creation time: ` + studentSavedPost.createdAt} />
                                </div>
                                <div className="saved-posts-buttons-div">
                                    <Button label="View post" 
                                            className="saved-posts-view-post-button" 
                                            onClickHandler={() => {
                                                onClickViewPost(studentSavedPost.id);
                                            }}
                                    />
                                    <Button label="Delete post" 
                                            className="saved-posts-delete-post-button" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {isEmptySavedPosts &&
                <div className="saved-posts-empty-text-div">
                    <P text="You haven't saved any posts yet!" />
                </div>                
            }
            {postModal &&
                <TeacherPostModal post={selectedPost} onRequestClose={openClosePostModal}/>
            }
        </div>
    );
};

export default StudentSavedPosts;