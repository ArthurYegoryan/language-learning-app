"use client";

import "./TeacherCoursesPage.css";
import Button from "@/generalComponents/button/Button.component";
import TeacherAddCourseModal from "@/components/teacherCoursesPage/teacherAddCourseModal/TeacherAddCourseModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import TeacherCoursesArea from "./teacherCoursesArea/TeacherCoursesArea";

const TeacherCoursesPage = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isCoursesChanged, setIsCoursesChanged ] = useState(false);
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
            data.map((course) => course.isSelected = false);
            console.log(JSON.stringify(data, null, 2));
            setCoursesData(data);
        }
        fetchCoursesData();
    }, [isCoursesChanged]);

    return (
        <section className="teacher-courses-section">
            <div className="add-new-course-div">
                <button className="go-home-button" onClick={onClickHome}>
                    <img src="/static/images/home.svg" alt="home" />
                </button>
                <Button label="+ Add new course" className="add-new-course-button" onClickHandler={onClickAddCourse} />
                {isModalOpen &&
                    <TeacherAddCourseModal setIsModalOpen={setIsModalOpen} 
                                           isCoursesChanged={isCoursesChanged} 
                                           setIsCoursesChanged={setIsCoursesChanged}
                    />
                }
            </div>
            <TeacherCoursesArea coursesData={coursesData} />
        </section>
    );
};

export default TeacherCoursesPage;