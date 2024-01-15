import Button from "@/generalComponents/button/Button.component";
import "./TeacherCoursesArea.css";
import P from "@/generalComponents/texts/P.component";

const TeacherCoursesArea = ({ coursesData }) => {
    return (
        <div className="teacher-courses-area">
            <P text="My Courses" className="teacher-courses-header-text" />
            <div className="teacher-courses-container">
                {coursesData.map((course) => {
                    return (
                        <div className="teacher-course-card" key={course.id}>
                            <P text={course.courseName} className="teacher-course-card-coursename" />
                            <div className="teacher-course-card-image-info">
                                <div className="teacher-course-card-image">
                                    <img src={`static/images/${course.languageType}.svg`} alt={`${course.languageType}`} />
                                </div>
                                <div className="teacher-course-card-info">
                                    <P text={`Creation time: ` + course.createdAt} />
                                </div>
                                <div className="see-related-videos-div">
                                    <Button label="See related videos" className="see-related-videos-button" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TeacherCoursesArea;