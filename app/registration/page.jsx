"use client";

import { db } from "@/utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const addDataToFireStore = async (userInfo, roleInfo) => {
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

const Registration = () => {
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

    const firstFormOnSubmitHandler = () => {
        setShowMainRegistration(false);
    };

    const userFormOnSubmitHandler = async (evt) => {
        evt.preventDefault();

        let userAddInfo;
        if (role === "teacher") userAddInfo = teacherAddInfo;
        else userAddInfo = studentAddInfo;

        const added = await addDataToFireStore(userInfo, userAddInfo);

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
    };

    return (
        <section className="registration-section">
            {showMainRegistration &&
                <div className="registration-area">
                    <p>Sign up</p>
                    <form action="" onSubmit={firstFormOnSubmitHandler}>
                        <input type="text" placeholder="Username" onChange={(evt) => setUsername(evt.target.value)} />
                        <input type="text" placeholder="First name" onChange={(evt) => setFirstname(evt.target.value)} />
                        <input type="text" placeholder="Last name" onChange={(evt) => setLastname(evt.target.value)} />
                        <input type="email" placeholder="Email" onChange={(evt) => setEmail(evt.target.value)} />
                        <input type="password" placeholder="Password" onChange={(evt) => setPassword(evt.target.value)} />

                        <label htmlFor="teacher">Teacher</label>
                        <input type="radio" 
                            name="role" 
                            id="teacher" 
                            value="teacher" 
                            onChange={() => {
                                setRole("teacher");
                            }} 
                        />
                        <label htmlFor="student">Student</label>
                        <input type="radio" 
                            name="role" 
                            id="student" 
                            value="student"
                            onChange={() => {
                                setRole("student")
                            }} 
                        />

                        <button>Continue</button>
                    </form>
                </div>
            }
            {!showMainRegistration && role === "teacher" &&
                <div className="registration-area">
                    <p>Teacher additional information</p>
                    <form onSubmit={userFormOnSubmitHandler}>
                        <input type="text" placeholder="Where are you work now?" onChange={(evt) => setWorkPlace(evt.target.value)} />
                        <input type="text" placeholder="How many years experience you have?" onChange={(evt) => setExperienceTime(evt.target.value)} />

                        <p>What type of languages do you know?</p>
                        <input type="checkbox" id="javascript" name="languages" value="javascript" onChange={languageCheckHandler} />
                        <label htmlFor="javascript">JavaScript</label>
                        <input type="checkbox" id="php" name="languages" value="php" onChange={languageCheckHandler} />
                        <label htmlFor="php">PHP</label>
                        <input type="checkbox" id="python" name="languages" value="python" onChange={languageCheckHandler} />
                        <label htmlFor="python">Python</label>
                        <input type="checkbox" id="c#" name="languages" value="c#" onChange={languageCheckHandler} />
                        <label htmlFor="c#">C#</label>
                        <input type="checkbox" id="c++" name="languages" value="c++" onChange={languageCheckHandler} />
                        <label htmlFor="c++">C++</label>
                        <input type="checkbox" id="java" name="languages" value="java" onChange={languageCheckHandler} />
                        <label htmlFor="java">Java</label>

                        <button onClick={() => {
                            setShowMainRegistration(true);
                        }}>Previous page</button>
                        <button>Finish registration!</button>
                    </form>
                </div>
            }
            {!showMainRegistration && role === "student" &&
                <div className="registration-area">
                    <p>Student additional information</p>
                    <form onSubmit={userFormOnSubmitHandler}>
                        <p>Do you study?</p>
                        <label htmlFor="studies">Yes</label>
                        <input type="radio" id="studies" name="studentStudies" value="yes" onChange={(evt) => setStudies(evt.target.value)} />
                        <label htmlFor="notStudies">No</label>
                        <input type="radio" id="notStudies" name="studentStudies" value="no" onChange={(evt) => setStudies(evt.target.value)} />
                        {studies === "yes" &&
                            <input type="text" placeholder="Where do you study?" onChange={(evt) => setStudyPlace(evt.target.value)} />
                        }

                        <p>Do you work?</p>
                        <label htmlFor="works">Yes</label>
                        <input type="radio" id="works" name="studentWorks" value="yes" onChange={(evt) => setWorks(evt.target.value)} />
                        <label htmlFor="notWork">No</label>
                        <input type="radio" id="notWork" name="studentWorks" value="no" onChange={(evt) => setWorks(evt.target.value)} />
                        {works === "yes" &&
                            <input type="text" placeholder="Where do you work?" onChange={(evt) => setStudentWorkPlace(evt.target.value)} />
                        }

                        <p>Have you learn any programming language before?</p>
                        <label htmlFor="studiedBefore">Yes</label>
                        <input type="radio" id="studiedBefore" name="studentStudiedBefore" value="yes" onChange={(evt) => setStudiedProgrammingLanguage(evt.target.value)} />
                        <label htmlFor="notStudiedBefore">No</label>
                        <input type="radio" id="notStudiedBefore" name="studentStudiedBefore" value="no" onChange={(evt) => setStudiedProgrammingLanguage(evt.target.value)} />
                        {studiedProgrammingLanguage === "yes" &&
                            <>
                                <p>What type of languages do you know?</p>
                                <input type="checkbox" id="javascript" name="languages" value="javascript" onChange={languageCheckHandler} />
                                <label htmlFor="javascript">JavaScript</label>
                                <input type="checkbox" id="php" name="languages" value="php" onChange={languageCheckHandler} />
                                <label htmlFor="php">PHP</label>
                                <input type="checkbox" id="python" name="languages" value="python" onChange={languageCheckHandler} />
                                <label htmlFor="python">Python</label>
                                <input type="checkbox" id="c#" name="languages" value="c#" onChange={languageCheckHandler} />
                                <label htmlFor="c#">C#</label>
                                <input type="checkbox" id="c++" name="languages" value="c++" onChange={languageCheckHandler} />
                                <label htmlFor="c++">C++</label>
                                <input type="checkbox" id="java" name="languages" value="java" onChange={languageCheckHandler} />
                                <label htmlFor="java">Java</label>
                            </>
                        }

                        <button onClick={() => {
                            setShowMainRegistration(true);
                        }}>Previous page</button>
                        <button>Finish registration!</button>
                    </form>
                </div>
            }
        </section>
    );
};

export default Registration;