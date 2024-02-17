import '@/components/registrationSection/teacherAddInfoPage/TeacherAddInfoPage.css';
import P from '@/generalComponents/texts/P.component';
import Input from '@/generalComponents/inputComponents/generalInputComponent/Input.component';
import InputCheckbox from '@/generalComponents/inputComponents/inputCheckboxComponent/InputCheckbox.component';
import Button from '@/generalComponents/button/Button.component';

const TeacherAddInfoPage = ({
    userFormOnSubmitHandler,
    setWorkPlace,
    setExperienceTime,
    languageCheckHandler,
    setShowMainRegistration,
}) => {
    return (
        <div className='teacher-add-info-page'>
            <P
                text='Teacher additional information'
                className='p-teacher-add-info'
            />
            <form onSubmit={userFormOnSubmitHandler}>
                <Input
                    type='text'
                    placeholder='Where are you work now?'
                    classNameDiv='input-teacher-add-info'
                    onChangeHandler={(evt) => setWorkPlace(evt.target.value)}
                />
                <Input
                    type='text'
                    placeholder='How many years experience you have?'
                    classNameDiv='input-teacher-add-info'
                    onChangeHandler={(evt) =>
                        setExperienceTime(evt.target.value)
                    }
                />

                <P
                    text='What type of languages do you know?'
                    className='p-language-types-text'
                />
                <InputCheckbox
                    id='javascript'
                    name='languages'
                    value='javascript'
                    classNameDiv='checkbox-language'
                    onChangeHandler={languageCheckHandler}
                    label='Javascript'
                />
                <InputCheckbox
                    id='php'
                    name='languages'
                    value='php'
                    classNameDiv='checkbox-language'
                    onChangeHandler={languageCheckHandler}
                    label='PHP'
                />
                <InputCheckbox
                    id='python'
                    name='languages'
                    value='python'
                    classNameDiv='checkbox-language'
                    onChangeHandler={languageCheckHandler}
                    label='Python'
                />
                <InputCheckbox
                    id='c#'
                    name='languages'
                    value='c#'
                    classNameDiv='checkbox-language'
                    onChangeHandler={languageCheckHandler}
                    label='C#'
                />
                <InputCheckbox
                    id='c++'
                    name='languages'
                    value='c++'
                    classNameDiv='checkbox-language'
                    onChangeHandler={languageCheckHandler}
                    label='C++'
                />
                <InputCheckbox
                    id='java'
                    name='languages'
                    value='java'
                    classNameDiv='checkbox-language'
                    onChangeHandler={languageCheckHandler}
                    label='Java'
                />

                <div className='teacher-add-info-buttons'>
                    <Button
                        label='Previous page'
                        className='prev-page-button'
                        onClickHandler={() => setShowMainRegistration(true)}
                    />
                    <Button
                        label='Finish registration!'
                        className='finish-reg-button'
                    />
                </div>
            </form>
        </div>
    );
};

export default TeacherAddInfoPage;
