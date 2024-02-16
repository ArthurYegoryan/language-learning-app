"use client";

import "./StudentStudyingCourses.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import { useEffect, useState } from "react";
import StudentStudyingCourseModal from "./studentStudyingCourseModal/StudentStudyingCourseModal";

const StudentStudyingCourses = () => {
    const [ studyingCourses, setStudyingCourses ] = useState([]);
    const [ isEmptyStudyingCourses, setIsEmptyStudyingCourses ] = useState(false);
    const [ teachers, setTeachers ] = useState([]);
    const [ isOpenStudyingCourseModal, setIsOpenStudyingCourseModal ] = useState(false);
    const [ selectedStudyingCourse, setSelectedStudyingCourse ] = useState({});

    useEffect(() => {
        const fetchCoursesData = async () => {
            const studyingCourses = await fetchDataFromFirestore("studyingCourses");
            const users = await fetchDataFromFirestore("users");

            const teachers = users.filter(user => user.role === "teacher");

            setTeachers(teachers);

            if (studyingCourses.length) {
                setStudyingCourses(studyingCourses);
            } else {
                setIsEmptyStudyingCourses(true);
            }           
        }
        fetchCoursesData();
    }, []);

    const getUsernameByID = (course) => {
        return teachers.filter((elem) => elem.id === course.teacherId)[0].username;
    }

    const openCloseStudyingCourseModal = () => {
        setIsOpenStudyingCourseModal(!isOpenStudyingCourseModal);
    }

    const studyingCourseButtonHandler = (course) => {
        studyingCourses.map((studyingCourse) => {
            if (studyingCourse.id === course.id) {
                setSelectedStudyingCourse({
                    ...studyingCourse,
                    isSelected: true
                });
                openCloseStudyingCourseModal();
            }
        });
    }

    return(
        <div className="studying-courses-section">
            <div className="studying-courses-cards">
                {
                    studyingCourses.map((course) => {
                        return (
                            <div className="studying-course-card" key={course.id}>
                                <div className="studying-course-card-coursename-div">
                                    <P text={course.courseName} className="studying-course-card-coursename" />
                                </div>
                                <div className="studying-course-content">
                                    <div className="studying-course-image">
                                        <img src={course.languageType === "c#" ? `static/images/c_sharp.svg` : 
                                              course.languageType === "c++" ? `static/images/c_plus.svg` :
                                              `static/images/${course.languageType}.svg` 
                                             } 
                                         alt={`${course.languageType}`} />
                                    </div>
                                    <div className="studying-course-info">
                                        <div className="studying-course-author-info">
                                            <P text="Author ->" className="studying-course-info-author" />
                                            <P text={getUsernameByID(course)} className="studying-course-info-authorname" />
                                        </div>
                                        <div className="studying-course-createdAt-info">
                                            <P text="Created at ->" className="studying-course-info-createdAt-text" />
                                            <P text={course.createdAt} className="studying-course-info-createdAt-time" />
                                        </div>
                                        <div className="studying-course-buttons">
                                            <Button label="View videos" 
                                                    className="studying-course-view-video-button"
                                                    onClickHandler={() => studyingCourseButtonHandler(course)}
                                            />
                                            {isOpenStudyingCourseModal &&
                                                <StudentStudyingCourseModal studyingCourse={selectedStudyingCourse} 
                                                                            teachers={teachers}
                                                                            onRequestClose={openCloseStudyingCourseModal} />
                                            }
                                            <Button label="Stop studying" 
                                                    className="studying-course-stop-studying-button" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {isEmptyStudyingCourses &&
                    <P text="You haven't started any courses yet!" className="studying-courses-empty-text" />                
                }
            </div>            
        </div>
    );
};

export default StudentStudyingCourses;