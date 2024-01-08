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
    const [ languages, setLanguages ] = useState([]);

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

    const firstFormOnSubmitHandler = () => {
        setShowMainRegistration(false);
    };

    const teacherFormOnSubmitHandler = async (evt) => {
        evt.preventDefault();

        const added = await addDataToFireStore(userInfo, teacherAddInfo);

        if (added) {
            setUsername("");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setRole("");
        }

        console.log("User info: " + JSON.stringify({...userInfo, ...teacherAddInfo}));
        console.log("Teacher registered successfully!.");
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
                    <form action="" onSubmit={teacherFormOnSubmitHandler}>
                        <input type="text" placeholder="Where are you work now?" onChange={(evt) => setWorkPlace(evt.target.value)} />
                        <input type="text" placeholder="How many years experience you have?" onChange={(evt) => setExperienceTime(evt.target.value)} />

                        <p>What type of languages do you know?</p>
                        <input type="checkbox" id="javascript" name="languages" value="javascript" onChange={languageCheckHandler} />
                        <label htmlFor="javascript">JavaScript</label>
                        <input type="checkbox" id="php" name="languages" value="php" onChange={languageCheckHandler} />
                        <label htmlFor="php">PHP</label>

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