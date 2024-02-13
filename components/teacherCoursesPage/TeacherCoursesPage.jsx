"use client";

import "./TeacherCoursesPage.css";
import Button from "@/generalComponents/button/Button.component";
import P from "@/generalComponents/texts/P.component";
import TeacherAddCourseModal from "@/components/teacherCoursesPage/teacherAddCourseModal/TeacherAddCourseModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import TeacherCoursesArea from "./teacherCoursesArea/TeacherCoursesArea";
import { useSelector } from "react-redux";

const TeacherCoursesPage = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isCoursesChanged, setIsCoursesChanged ] = useState(false);
    const [ coursesData, setCoursesData ] = useState([]);
    const [ emptyDataText, setEmptyDataText ] = useState(false);
    const { userid } = useSelector((state) => state.auth.value)
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
            const teacherCourses = data.filter((course) => course.userid === userid);

            if (!teacherCourses.length) {
                setEmptyDataText(true);
            } else {
                teacherCourses.map((course) => course.isSelected = false);
                console.log(JSON.stringify(teacherCourses, null, 2));
                setCoursesData(teacherCourses);
            }            
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
                                           setEmptyDataText={setEmptyDataText}
                    />
                }
            </div>
            <TeacherCoursesArea coursesData={coursesData} />
            {emptyDataText &&
                <div className="teacher-empty-course-text-div">
                    <P text="You havn't any course yet!" />
                </div>
            }
        </section>
    );
};

export default TeacherCoursesPage;