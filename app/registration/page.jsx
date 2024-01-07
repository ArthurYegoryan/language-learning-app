"use client";

import { useState } from "react";

const Registration = () => {
    const [ isTeacher, setIsTeacher ] = useState(false);
    const [ isStudent, setIsStudent ] = useState(false);

    const [ showMainRegistration, setShowMainRegistration ] = useState(true);

    const firstFormOnSubmitHandler = () => {
        setShowMainRegistration(false);
    };

    const teacherFormOnSubmitHandler = (evt) => {
        evt.preventDefault();
        console.log("Teacher registered succeded.");
    };

    return (
        <section className="registration-section">
            {showMainRegistration &&
                <div className="registration-area">
                    <p>Sign up</p>
                    <form action="" onSubmit={firstFormOnSubmitHandler}>
                        <input type="text" placeholder="Username" />
                        <input type="text" placeholder="First name" />
                        <input type="text" placeholder="Last name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />

                        <label htmlFor="teacher">Teacher</label>
                        <input type="radio" 
                            name="role" 
                            id="teacher" 
                            value="teacher" 
                            onChange={() => {
                                setIsTeacher(true);
                                setIsStudent(false);
                            }} 
                        />
                        <label htmlFor="student">Student</label>
                        <input type="radio" 
                            name="role" 
                            id="student" 
                            value="student"
                            onChange={() => {
                                setIsStudent(true);
                                setIsTeacher(false);
                            }} 
                        />

                        <button>Continue</button>
                    </form>
                </div>
            }
            {!showMainRegistration && isTeacher &&
                <div className="registration-area">
                    <p>Teacher additional information</p>
                    <form action="" onSubmit={teacherFormOnSubmitHandler}>
                        <input type="text" placeholder="Where are you work now?" />
                        <input type="text" placeholder="How many years experience you have?" />
                        
                        <p>Please input teacher certificate if you have.</p>
                        <input type="file" name="teacherCertifiicate" />

                        <p>What type of languages do you know?</p>
                        <input type="checkbox" id="javascript" name="javascript" value="javascript" />
                        <label htmlFor="javascript">JavaScript</label>
                        <input type="checkbox" id="php" name="php" value="php" />
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