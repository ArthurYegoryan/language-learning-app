import '@/generalComponents/inputComponents/generalInputComponent/Input.component.css';

const Input = ({
    type = 'text',
    placeholder,
    onChangeHandler,
    classNameDiv,
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChangeHandler}
            className={`input-div ${classNameDiv}`}
        />
    );
};

export default Input;
