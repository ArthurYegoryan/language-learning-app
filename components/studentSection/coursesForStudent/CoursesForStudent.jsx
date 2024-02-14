import "./CoursesForStudent.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromFirestore } from "@/services/api/fetchDataFromFirestore";
import { v4 as uuid } from "uuid";
import StartCourseModal from "./startCourseModal/StartCourseModal";
import StartCourseErrorModal from "./startCourseErrorModal/StartCourseErrorModal";
import { addStudyingCourseToFirestore } from "@/services/api/addStudyingCourseToFirestore";

const CoursesForStudent = () => {
    const [ coursesData, setCoursesData ] = useState([]);
    const [ studyingCoursesData, setStudyingCoursesData ] = useState([]);
    const [ startedCourse, setStartedCourse ] = useState([]);
    const [ isStartedCourse, setIsStartedCourse ] = useState(false);
    const [ openCloseStartCourseModal, setOpenCloseStartCourseModal ] = useState(false);
    const [ openCloseStartCourseErrorModal, setOpenCloseStartCourseErrorModal ] = useState(false);
    const { userid } = useSelector((state) => state.auth.value);

    useEffect(() => {
        const fetchCoursesData = async () => {
            const coursesdata = await fetchDataFromFirestore("courses");
            const studyingCoursesData = await fetchDataFromFirestore("studyingCourses");

            setCoursesData(coursesdata);
            setStudyingCoursesData(studyingCoursesData);
        };
        fetchCoursesData();
    }, [isStartedCourse]);

    const courseSelectedHandler = (course) => {
        let isSelected = false;
        
        studyingCoursesData.map((studyingCourse) => {
            if (studyingCourse.courseId === course.id && studyingCourse.studentId === userid) {
                isSelected = true;
            }
        });

        return isSelected;
    }

    const onClickStartCourse = async (course) => {
        const studyingCourseInfo = {
            id: uuid(),
            courseName: course.courseName,
            createdAt: course.createdAt,
            courseId: course.id,
            teacherId: course.userid,
            studentId: userid,
            languageType: course.languageType
        };

        const added = await addStudyingCourseToFirestore(studyingCourseInfo);

        if (added) {
            setOpenCloseStartCourseModal(true);
            setIsStartedCourse(true);
            setStartedCourse(course);
        } else {
            setOpenCloseStartCourseErrorModal(true);
        }
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
                                    { courseSelectedHandler(course) ?
                                        <button disabled 
                                                className="s-course-started-button" 
                                        >
                                            Course is started!
                                        </button> :
                                        <Button label="Start the course!"
                                            className="s-start-course-button" 
                                            onClickHandler={() => onClickStartCourse(course)}
                                        />
                                    }                                    
                                </div>
                            </div>
                        </div>
                    );
                })}
                {openCloseStartCourseModal &&
                    <StartCourseModal course={startedCourse} onRequestClose={() => setOpenCloseStartCourseModal(false)}/>
                }
                {openCloseStartCourseErrorModal &&
                    <StartCourseErrorModal onRequestClose={() => setOpenCloseStartCourseErrorModal(false)} />
                }
            </div>
        </div>
    );
};

export default CoursesForStudent;