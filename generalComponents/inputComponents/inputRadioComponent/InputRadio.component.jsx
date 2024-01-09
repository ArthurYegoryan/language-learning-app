const InputRadio = ({
    label,
    name,
    id,
    value,
    onChangeHandler,
    classNameDiv
}) => {
    return (
        <div className={`input-radio ${classNameDiv}`}>
            <label htmlFor={id}>{label}</label>
            <input type="radio"
                name={name}
                id={id}
                value={value}
                onChange={onChangeHandler} 
            />
        </div>
    );    
};

export default InputRadio;