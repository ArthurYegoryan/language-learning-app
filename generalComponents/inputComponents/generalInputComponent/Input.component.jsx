import "@/generalComponents/inputComponents/generalInputComponent/Input.component.css";

const Input = ({
    type = "text",
    placeholder,
    onChangeHandler,
    classNameDiv
}) => {
    return (
        <div className={`input-div ${classNameDiv}`}>
            <input type={type}
                   placeholder={placeholder} 
                   onChange={onChangeHandler} 
            />
        </div>
    );
};

export default Input;