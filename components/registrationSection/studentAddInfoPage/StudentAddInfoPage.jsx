import "@/components/registrationSection/studentAddInfoPage/StudentAddInfoPage.css";
import P from "@/generalComponents/texts/P.component";
import InputRadio from "@/generalComponents/inputComponents/inputRadioComponent/InputRadio.component";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import InputCheckbox from "@/generalComponents/inputComponents/inputCheckboxComponent/InputCheckbox.component";
import Button from "@/generalComponents/button/Button.component";

const StudentAddInfoPage = ({
    userFormOnSubmitHandler,
    setStudies,
    studies,
    setStudyPlace,
    setWorks,
    works,
    setStudentWorkPlace,
    setStudiedProgrammingLanguage,
    studiedProgrammingLanguage,
    languageCheckHandler,
    setShowMainRegistration
}) => {
    return (
        <div className="student-reg-page">
            <P text="Student additional information" className="p-student-add-info" />
            <form onSubmit={userFormOnSubmitHandler}>
                <P text="Do you study?" className="p-student-question" />
                <div className="student-question-answer-div">
                    <InputRadio label="Yes" 
                                id="studies" 
                                name="studentStudies" 
                                value="yes"
                                classNameDiv="student-answer-div" 
                                onChangeHandler={(evt) => setStudies(evt.target.value)} />
                    <InputRadio label="No" 
                                id="notStudies" 
                                name="studentStudies" 
                                value="no" 
                                classNameDiv="student-answer-div"
                                onChangeHandler={(evt) => setStudies(evt.target.value)} />
                </div>                
                {studies === "yes" &&
                    <Input type="text" 
                           placeholder="Where do you study?" 
                           classNameDiv="student-answer-input"
                           onChangeHandler={(evt) => setStudyPlace(evt.target.value)} />
                }

                <P text="Do you work?" className="p-student-question" />
                <div className="student-question-answer-div">
                    <InputRadio label="Yes" 
                                id="works" 
                                name="studentWorks" 
                                value="yes" 
                                classNameDiv="student-answer-div"
                                onChangeHandler={(evt) => setWorks(evt.target.value)} />
                    <InputRadio label="No" 
                                id="notWork" 
                                name="studentWorks" 
                                value="no"
                                classNameDiv="student-answer-div" 
                                onChangeHandler={(evt) => setWorks(evt.target.value)} />
                </div>                
                {works === "yes" &&
                    <Input type="text" 
                           placeholder="Where do you work?" 
                           classNameDiv="student-answer-input"
                           onChangeHandler={(evt) => setStudentWorkPlace(evt.target.value)} />
                }

                <P text="Have you learn any programming language before?" className="p-student-question" />
                <div className="student-question-answer-div">
                    <InputRadio label="Yes" 
                                id="studiedBefore" 
                                name="studentStudiedBefore" 
                                value="yes" 
                                classNameDiv="student-answer-div"
                                onChangeHandler={(evt) => setStudiedProgrammingLanguage(evt.target.value)} />
                    <InputRadio label="No" 
                                id="notStudiedBefore" 
                                name="studentStudiedBefore" 
                                value="no"
                                classNameDiv="student-answer-div" 
                                onChangeHandler={(evt) => setStudiedProgrammingLanguage(evt.target.value)} />
                </div>                
                {studiedProgrammingLanguage === "yes" &&
                    <>
                        <P text="What type of languages do you know?" className="p-student-question" />
                        <InputCheckbox id="javascript" 
                                       name="languages" 
                                       value="javascript" 
                                       classNameDiv="student-language-checkbox"
                                       onChangeHandler={languageCheckHandler} 
                                       label="JavaScript" />
                        <InputCheckbox id="php" 
                                       name="languages" 
                                       value="php" 
                                       classNameDiv="student-language-checkbox"
                                       onChangeHandler={languageCheckHandler} 
                                       label="PHP" />
                        <InputCheckbox id="python" 
                                       name="languages" 
                                       value="python" 
                                       classNameDiv="student-language-checkbox"
                                       onChangeHandler={languageCheckHandler} 
                                       label="Python" />
                        <InputCheckbox id="c#" 
                                       name="languages" 
                                       value="c#" 
                                       classNameDiv="student-language-checkbox"
                                       onChangeHandler={languageCheckHandler} 
                                       label="C#" />
                        <InputCheckbox id="c++" 
                                       name="languages" 
                                       value="c++"
                                       classNameDiv="student-language-checkbox" 
                                       onChangeHandler={languageCheckHandler} 
                                       label="C++" />
                        <InputCheckbox id="java" 
                                       name="languages" 
                                       value="java" 
                                       classNameDiv="student-language-checkbox"
                                       onChangeHandler={languageCheckHandler} 
                                       label="Java" />
                    </>
                }

                <div className="student-add-info-buttons">
                    <Button label="Previous page" className="prev-page-button" onClickHandler={() => setShowMainRegistration(true)} />
                    <Button label="Finish registration!" className="finish-reg-button" />
                </div>                
            </form>
        </div>
    );
};

export default StudentAddInfoPage;