"use client";

import "./TeacherVideoPage.css";
import Button from "@/generalComponents/button/Button.component";
import Modal from "@/components/modal/Modal";
import { useState } from "react";

const TeacherVideoPage = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const onClickAddCourse = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <section className="teacher-courses-section">
            <div className="add-new-course-div">
                <Button label="Add new course" onClickHandler={onClickAddCourse} />
                {isModalOpen &&
                    <Modal setIsModalOpen={setIsModalOpen} />
                }
            </div>
            <div className="teacher-courses-area">

            </div>
        </section>
    );
};

export default TeacherVideoPage;