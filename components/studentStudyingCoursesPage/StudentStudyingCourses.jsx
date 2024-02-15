"use client";

import "./StudentStudyingCourses.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import { useEffect, useState } from "react";

const StudentStudyingCourses = () => {
    const [ studyingCourses, setStudyingCourses ] = useState([]);
    const [ isEmptyStudyingCourses, setIsEmptyStudyingCourses ] = useState(false);
    const [ teachers, setTeachers ] = useState([]);

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

    console.log("Users: ", JSON.stringify(teachers, null, 2));
    console.log("Studying courses: ", JSON.stringify(studyingCourses, null, 2));

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