import "./Modal.css";
import P from "@/generalComponents/texts/P.component";
import Button from "@/generalComponents/button/Button.component";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import { db } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

const addCourseToFireStore = async (courseInfo) => {
    try {
        const docRef = await addDoc(collection(db, "courses"), courseInfo);
        return true;
    } catch (err) {
        console.error("Error adding document ", err);
        return  false;
    }
}

const Modal = ({ setIsModalOpen }) => {
    const [ courseName, setCourseName ] = useState("");
    const [ languageType, setLanguageType ] = useState("js");
    const { username } = useSelector((state) => state.auth.value);
    const [ isSuccessfullyAdded, setIsSuccessfullyAdded ] = useState(false);
    const [ courseNameError, setCourseNameError ] = useState(false);

    const courseInfo = {
        courseName,
        languageType,
        username
    }

    const onAddCourseFormSubmit = async (evt) => {
        evt.preventDefault();

        console.log("Course info: " + JSON.stringify(courseInfo));

        if (!courseName) {
            setCourseNameError(true);
        }
        else {
            const added = await addCourseToFireStore(courseInfo);

            if (added) {
                setCourseName("");
                setLanguageType("js");
                setIsSuccessfullyAdded(true);
            }
        }        
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <P text="Add new course" className="modal-header-text" />
                </div>
                <div className="modal-content">
                    <form onSubmit={onAddCourseFormSubmit}>
                        <Input placeholder="Enter course name" 
                               onChangeHandler={(evt) => {
                                                        setCourseNameError(false);
                                                        setCourseName(evt.target.value);
                                                    }} 
                        />
                        {courseNameError &&
                            <P text="Course name can't be empty!" className="course-name-empty-error" />
                        }

                        <label htmlFor="languages">Choose course language</label>
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
                        <div className="modal-buttons">
                            <Button type="submit" label="Submit" />
                            <Button label="Cancel" onClickHandler={() => {setIsModalOpen(false)}} />
                        </div>
                    </form>                    
                </div>                
            </div>
        </div>
    );
};

export default Modal;