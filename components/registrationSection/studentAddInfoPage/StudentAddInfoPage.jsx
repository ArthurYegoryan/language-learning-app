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
            <P text="Student additional information" className="student-add-info" />
            <form onSubmit={userFormOnSubmitHandler}>
                <P text="Do you study?" className="p-study-question" />
                <InputRadio label="Yes" id="studies" name="studentStudies" value="yes" onChange={(evt) => setStudies(evt.target.value)} />
                <InputRadio label="No" id="notStudies" name="studentStudies" value="no" onChange={(evt) => setStudies(evt.target.value)} />
                {studies === "yes" &&
                    <Input type="text" placeholder="Where do you study?" onChange={(evt) => setStudyPlace(evt.target.value)} />
                }

                <P text="Do you work?" className="p-work-question" />
                <InputRadio label="Yes" id="works" name="studentWorks" value="yes" onChange={(evt) => setWorks(evt.target.value)} />
                <InputRadio label="No" id="notWork" name="studentWorks" value="no" onChange={(evt) => setWorks(evt.target.value)} />
                {works === "yes" &&
                    <Input type="text" placeholder="Where do you work?" onChange={(evt) => setStudentWorkPlace(evt.target.value)} />
                }

                <P text="Have you learn any programming language before?" className="p-learn-question" />
                <InputRadio label="Yes" id="studiedBefore" name="studentStudiedBefore" value="yes" onChange={(evt) => setStudiedProgrammingLanguage(evt.target.value)} />
                <InputRadio label="No" id="notStudiedBefore" name="studentStudiedBefore" value="no" onChange={(evt) => setStudiedProgrammingLanguage(evt.target.value)} />
                {studiedProgrammingLanguage === "yes" &&
                    <>
                        <P text="What type of languages do you know?" className="p-know-languages" />
                        <InputCheckbox id="javascript" name="languages" value="javascript" onChange={languageCheckHandler} label="JavaScript" />
                        <InputCheckbox id="php" name="languages" value="php" onChange={languageCheckHandler} label="PHP" />
                        <InputCheckbox id="python" name="languages" value="python" onChange={languageCheckHandler} label="Python" />
                        <InputCheckbox id="c#" name="languages" value="c#" onChange={languageCheckHandler} label="C#" />
                        <InputCheckbox id="c++" name="languages" value="c++" onChange={languageCheckHandler} label="C++" />
                        <InputCheckbox id="java" name="languages" value="java" onChange={languageCheckHandler} label="Java" />
                    </>
                }

                <Button label="Previous page" onClickHandler={() => setShowMainRegistration(true)} />
                <Button label="Finish registration!" />
            </form>
        </div>
    );
};

export default StudentAddInfoPage;