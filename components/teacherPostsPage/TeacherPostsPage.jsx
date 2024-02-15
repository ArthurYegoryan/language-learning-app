"use client";

import "./TeacherPostsPage.css";
import TeacherAddPostModal from "./teacherAddPostModal/TeacherAddPostModal";
import Button from "@/generalComponents/button/Button.component";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TeachersPostsArea from "./teacherPostsArea/TeacherPostsArea";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import { useSelector } from "react-redux";
import P from "@/generalComponents/texts/P.component";

const TeacherPostsPage = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ postsData, setPostsData ] = useState([]);
    const [ emptyDataText, setEmptyDataText ] = useState(false);
    const [ isPostsChanged, setIsPosChanged ] = useState(false);
    const { userid } = useSelector((state) => state.auth.value)
    const { push } = useRouter();

    const onClickHome = () => {
        push("/teacher");
    };

    const onClickAddCourse = () => {
        setIsModalOpen(!isModalOpen);
    }

    useEffect(() => {
        const fetchPostsData = async () => {
            const data = await fetchDataFromFirestore("posts");
            const teacherPosts = data.filter((post) => post.userid === userid);

            if (!teacherPosts.length) {
                setEmptyDataText(true);
            } else {
                teacherPosts.map((post) => post.isSelected = false);
                console.log(JSON.stringify(teacherPosts, null, 2));
                setPostsData(teacherPosts);
            }            
        }
        fetchPostsData();
    }, [isPostsChanged]);

    return (
        <section className="teacher-posts-section">
            <div className="add-new-post-div">
                <button className="go-home-button" onClick={onClickHome}>
                    <img src="/static/images/home.svg" alt="home" />
                </button>
                <Button label="+ Add new post" className="add-new-post-button" onClickHandler={onClickAddCourse} />
                {isModalOpen &&
                    <TeacherAddPostModal setIsModalOpen={setIsModalOpen} 
                                         setIsPostsChanged={setIsPosChanged} 
                                         setEmptyDataText={setEmptyDataText} 
                    />
                }
            </div>            
            <TeachersPostsArea postsData={postsData} />
            {emptyDataText &&
                <div className="teacher-empty-post-text-div">
                    <P text="You havn't any post yet!" />
                </div>
            }
        </section>
    );
};

export default TeacherPostsPage;