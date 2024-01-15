"use client";

import "./TeacherCoursesPage.css";
import Button from "@/generalComponents/button/Button.component";
import Modal from "@/components/modal/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import TeacherCoursesArea from "./teacherCoursesArea/TeacherCoursesArea";

const TeacherCoursesPage = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ coursesData, setCoursesData ] = useState([]);
    const { push } = useRouter();

    const onClickHome = () => {
        push("/teacher");
    };

    const onClickAddCourse = () => {
        setIsModalOpen(!isModalOpen);
    }

    useEffect(() => {
        const fetchCoursesData = async () => {
            const data = await fetchDataFromFirestore("courses");
            console.log(JSON.stringify(data, null, 2));
            setCoursesData(data);
        }
        fetchCoursesData();
    }, []);

    return (
        <section className="teacher-courses-section">
            <div className="add-new-course-div">
                <button className="go-home-button" onClick={onClickHome}>
                    <img src="/static/images/home.svg" alt="home" />
                </button>
                <Button label="+ Add new course" className="add-new-course-button" onClickHandler={onClickAddCourse} />
                {isModalOpen &&
                    <Modal setIsModalOpen={setIsModalOpen} />
                }
            </div>
            <TeacherCoursesArea coursesData={coursesData} />
        </section>
    );
};

export default TeacherCoursesPage;