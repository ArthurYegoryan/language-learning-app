"use client";

import "./TeacherPostsPage.css";
import TeacherAddPostModal from "./teacherAddPostModal/TeacherAddPostModal";
import Button from "@/generalComponents/button/Button.component";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TeacherPostsPage = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const { push } = useRouter();

    const onClickHome = () => {
        push("/teacher");
    };

    const onClickAddCourse = () => {
        setIsModalOpen(!isModalOpen);
    }

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
        </section>
    );
};

export default TeacherPostsPage;