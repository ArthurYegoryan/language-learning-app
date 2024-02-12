import "./TeacherAddCourseModal.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addCourseToFireStore } from "@/services/api/addCourseToFireStore";

const TeacherAddCourseModal = ({ setIsModalOpen, isCoursesChanged, setIsCoursesChanged }) => {
    const [ courseName, setCourseName ] = useState("");
    const [ languageType, setLanguageType ] = useState("js");
    const { userid } = useSelector((state) => state.auth.value);
    const [ isSuccessfullyAdded, setIsSuccessfullyAdded ] = useState(false);
    const [ courseNameError, setCourseNameError ] = useState(false);
    const [ emptyUsernameError, setEmptyUsernameError ] = useState(false);

    const courseInfo = {
        courseName,
        languageType,
        userid,
    };

    const onAddCourseFormSubmit = async (evt) => {
        evt.preventDefault();

        const createdAtSeconds = new Date();
        const createdAt = createdAtSeconds.getDate() + "/"
                          + (createdAtSeconds.getMonth() + 1) + "/"
                          + createdAtSeconds.getFullYear() + "  "
                          + createdAtSeconds.getHours() + ":"
                          + createdAtSeconds.getMinutes() + ":"
                          + createdAtSeconds.getSeconds();
        courseInfo.createdAt = createdAt;

        console.log("Course info: " + JSON.stringify(courseInfo));

        if (!courseName) {
            setCourseNameError(true);
        } else if (!userid) {
            setEmptyUsernameError(true);
        } else {
            const added = await addCourseToFireStore(courseInfo);

            if (added) {
                setCourseName("");
                setLanguageType("js");
                setIsSuccessfullyAdded(true);
                setIsCoursesChanged(!isCoursesChanged);
            }
        }        
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <P text="New course" className="modal-header-text" />
                </div>
                <div className="modal-content">
                    <form onSubmit={onAddCourseFormSubmit}>
                        <Input placeholder="Enter course name"
                               classNameDiv="course-name-input" 
                               onChangeHandler={(evt) => {
                                                        setCourseNameError(false);
                                                        setCourseName(evt.target.value);
                                                    }} 
                        />
                        {courseNameError &&
                            <P text="Course name can't be empty!" className="course-name-empty-error" />
                        }

                        <label htmlFor="languages" className="choose-course-language-text">Choose course language</label>
                        <select name="languages" 
                                id="languages"
                                defaultValue="js" 
                                onChange={(evt) => {setLanguageType(evt.target.value)}}>
                            <option value="js">JS</option>
                            <option value="php">PHP</option>
                            <option value="python">Python</option>
                            <option value="c#">C#</option>
                            <option value="c++">C++</option>
                            <option value="java">Java</option>
                        </select>
                        {isSuccessfullyAdded &&
                            <P text="Course successfully added!" className="course-success-add-text" />
                        }
                        {emptyUsernameError &&
                            <P text="Error with user! Please login again." className="empty-username-error-text" />
                        }
                        <div className="modal-buttons">
                            <Button type="submit" label="Submit" className="new-course-submit-button" />
                            <Button label="Cancel" className="new-course-cancel-button" onClickHandler={() => {setIsModalOpen(false)}} />
                        </div>
                    </form>                    
                </div>                
            </div>
        </div>
    );
};

export default TeacherAddCourseModal;