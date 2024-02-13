import "./CoursesForStudent.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import StartCourseModal from "./startCourseModal/StartCourseModal";

const CoursesForStudent = () => {
    const [ coursesData, setCoursesData ] = useState([]);
    const [ selectedCourse, setSelectedCourse ] = useState({});
    const [ openCloseStartCourseModal, setOpenCloseStartCourseModal ] = useState(false);
    const { userid } = useSelector((state) => state.auth.value);

    useEffect(() => {
        const fetchCoursesData = async () => {
            const data = await fetchDataFromFirestore("courses");
            console.log("Data: ", data);
            setCoursesData(data);
        };
        fetchCoursesData()
    }, []);

    const onClickStartCourse = (course) => {
        console.log("Clicked course id: " + course.id);
        setSelectedCourse(course);
        setOpenCloseStartCourseModal(true);
    };

    return (
        <div className="s-all-courses">
            <P text="All Courses" className="s-all-courses-header-text" />
            <div className="s-all-courses-container">
                {coursesData.map((course) => {
                    return (
                        <div className="s-all-course-card" key={course.id}>
                            <P text={course.courseName} className="s-all-course-card-coursename" />
                            <div className="s-all-course-card-image-info">
                                <div className="s-all-course-card-image">
                                    <img src={course.languageType === "c#" ? `static/images/c_sharp.svg` : 
                                              course.languageType === "c++" ? `static/images/c_plus.svg` :
                                              `static/images/${course.languageType}.svg` 
                                             } 
                                         alt={`${course.languageType}`} />
                                </div>
                                <div className="s-all-course-card-info">
                                    <P text={`Creation time: ` + course.createdAt} />
                                </div>
                                <div className="s-start-course-button-div">
                                    <Button label="Start the course!"
                                            className="s-start-course-button" 
                                            onClickHandler={() => onClickStartCourse(course)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                {openCloseStartCourseModal &&
                    <StartCourseModal course={selectedCourse} onRequestClose={() => setOpenCloseStartCourseModal(false)}/>
                }
            </div>
        </div>
    );
};

export default CoursesForStudent;