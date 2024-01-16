"use client";

import "@/components/registrationSection/RegistrationSection.css";
import { db } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import MainRegistrationPage from "./mainRegistrationPage/MainRegistrationPage";
import TeacherAddInfoPage from "./teacherAddInfoPage/TeacherAddInfoPage";
import { useState } from "react";
import StudentAddInfoPage from "./studentAddInfoPage/StudentAddInfoPage";
import { useRouter } from "next/navigation";

const addUserDataToFireStore = async (userInfo, roleInfo) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            ...userInfo,
            ...roleInfo
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (err) {
        console.error("Error adding document ", err);
        return  false;
    }
}

const RegistrationSection = () => {
    const { push } = useRouter();

    const [ username, setUsername ] = useState("");
    const [ firstname, setFirstname ] = useState("");
    const [ lastname, setLastname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ role, setRole ] = useState("");
    const [ showMainRegistration, setShowMainRegistration ] = useState(true);

    // teacher add info
    const [ workPlace, setWorkPlace ] = useState("");
    const [ experienceTime, setExperienceTime ] = useState(0);
    const [ languages, setLanguages ] = useState([]);           // for student too

    // student add info
    const [ studies, setStudies ] = useState("");
    const [ studyPlace, setStudyPlace ] = useState("");
    const [ works, setWorks ] = useState("");
    const [ studentWorkPlace, setStudentWorkPlace ] = useState("");
    const [ studiedProgrammingLanguage, setStudiedProgrammingLanguage ] = useState("");

    const languageCheckHandler = (evt) => {
        const { value, checked } = evt.target;

        if (checked) {
            setLanguages([ ...languages, value ]);
        } else {
            setLanguages(languages.filter(
                (evt) => evt !== value
            ));
        }
    }

    const userInfo = {
        username,
        firstname,
        lastname,
        email,
        password,
        role
    };

    const teacherAddInfo = {
        workPlace,
        experienceTime,
        languages
    };

    const studentAddInfo = {
        studies,
        studyPlace,
        works,
        studentWorkPlace,
        studiedProgrammingLanguage,
        languages
    }

    const userFormOnSubmitHandler = async (evt) => {
        evt.preventDefault();

        let userAddInfo;
        if (role === "teacher") userAddInfo = teacherAddInfo;
        else userAddInfo = studentAddInfo;

        const added = await addUserDataToFireStore(userInfo, userAddInfo);

        if (added) {
            setUsername("");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setRole("");
            setShowMainRegistration(true);
            setLanguages([]);
        }

        console.log("User info: " + JSON.stringify({...userInfo, ...teacherAddInfo}));
        console.log("User registered successfully!.");

        push("/login");
    };

    return (
        <section className="registration-section">
            {showMainRegistration &&
                <MainRegistrationPage setUsername={setUsername}
                                      setFirstname={setFirstname}
                                      setLastname={setLastname}
                                      setEmail={setEmail}
                                      setPassword={setPassword}
                                      setRole={setRole}
                                      setShowMainRegistration={setShowMainRegistration}
                />
            }
            {!showMainRegistration && role === "teacher" &&
                <TeacherAddInfoPage userFormOnSubmitHandler={userFormOnSubmitHandler}
                                    setWorkPlace={setWorkPlace}
                                    setExperienceTime={setExperienceTime}
                                    languageCheckHandler={languageCheckHandler}
                                    setShowMainRegistration={setShowMainRegistration} 
                />
            }
            {!showMainRegistration && role === "student" &&
                <StudentAddInfoPage userFormOnSubmitHandler={userFormOnSubmitHandler}
                                    setStudies={setStudies}
                                    studies={studies}
                                    setStudyPlace={setStudyPlace}
                                    setWorks={setWorks}
                                    works={works}
                                    setStudentWorkPlace={setStudentWorkPlace}
                                    setStudiedProgrammingLanguage={setStudiedProgrammingLanguage}
                                    studiedProgrammingLanguage={studiedProgrammingLanguage}
                                    languageCheckHandler={languageCheckHandler}
                                    setShowMainRegistration={setShowMainRegistration}
                />
            }
        </section>
    );
};

export default RegistrationSection;