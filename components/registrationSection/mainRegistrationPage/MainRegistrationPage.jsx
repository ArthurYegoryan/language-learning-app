import "@/components/registrationSection/mainRegistrationPage/MainRegistrationPage.css";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import InputRadio from "@/generalComponents/inputComponents/inputRadioComponent/InputRadio.component";
import Button from "@/generalComponents/button/Button.component";
import P from "@/generalComponents/texts/P.component";
import { useState } from "react";

const MainRegistrationPage = ({
    setUsername,
    setFirstname,
    setLastname,
    setEmail,
    setPassword,
    setRole,
    setShowMainRegistration
}) => {
    const [ isRoleSelected, setIsRoleSelected ] = useState(false);
    const [ showRoleError, setShowRoleError ] = useState(false);

    const mainFormOnSubmitHandler = (evt) => {
        evt.preventDefault();

        if (isRoleSelected) setShowMainRegistration(false);
        else setShowRoleError(true);
    };

    return (
        <div className="main-registration-page">
            <P text="Sign up" className="p-sign-up" />
            <form onSubmit={mainFormOnSubmitHandler}>
                <Input type="text" placeholder="Username" classNameDiv="reg-input-div" onChangeHandler={(evt) => setUsername(evt.target.value)} />
                <Input type="text" placeholder="First name" classNameDiv="reg-input-div" onChangeHandler={(evt) => setFirstname(evt.target.value)} />
                <Input type="text" placeholder="Last name" classNameDiv="reg-input-div" onChangeHandler={(evt) => setLastname(evt.target.value)} />
                <Input type="email" placeholder="Email" classNameDiv="reg-input-div" onChangeHandler={(evt) => setEmail(evt.target.value)} />
                <Input type="password" placeholder="Password" classNameDiv="reg-input-div" onChangeHandler={(evt) => setPassword(evt.target.value)} />

                <div className="reg-role-input-div">
                    <InputRadio label="Teacher" 
                                name="role" 
                                id="teacher" 
                                value="teacher" 
                                classNameDiv="reg-input-radio-div" 
                                onChangeHandler={() => {
                                    setRole("teacher");
                                    setIsRoleSelected(true);
                                }} 
                    />
                    <InputRadio label="Student" 
                                name="role" 
                                id="student" 
                                value="student" 
                                classNameDiv="reg-input-radio-div" 
                                onChangeHandler={() => {
                                    setRole("student");
                                    setIsRoleSelected(true);
                                }}
                    />
                </div>
                {showRoleError &&
                    <P className="role-error-text" text="Please choose your role before continue!" />
                }
                
                <div className="reg-continue-button-div">
                    <Button label="Continue registration" className="reg-continue-button" />
                </div>
            </form>
        </div>
    );
};

export default MainRegistrationPage;