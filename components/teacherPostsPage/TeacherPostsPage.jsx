"use client";

import "./TeacherPostsPage.css";
import TeacherAddPostModal from "./teacherAddPostModal/TeacherAddPostModal";
import Button from "@/generalComponents/button/Button.component";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TeachersPostsArea from "./teacherPostsArea/TeacherPostsArea";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";

const TeacherPostsPage = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ postsData, setPostsData ] = useState([]);
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
            data.map((post) => post.isSelected = false);
            console.log(JSON.stringify(data, null, 2));
            setPostsData(data);
        }
        fetchPostsData();
    }, []);

    return (
        <section className="teacher-posts-section">
            <div className="add-new-post-div">
                <button className="go-home-button" onClick={onClickHome}>
                    <img src="/static/images/home.svg" alt="home" />
                </button>
                <Button label="+ Add new post" className="add-new-post-button" onClickHandler={onClickAddCourse} />
                {isModalOpen &&
                    <TeacherAddPostModal setIsModalOpen={setIsModalOpen} />
                }
            </div>
            <TeachersPostsArea postsData={postsData} />
        </section>
    );
};

export default TeacherPostsPage;