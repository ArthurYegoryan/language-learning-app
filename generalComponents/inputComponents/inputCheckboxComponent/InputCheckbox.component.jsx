const InputCheckbox = ({
    id,
    name,
    value,
    onChangeHandler,
    label,
    classNameDiv
}) => {
    return (
        <div className={`input-checkbox ${classNameDiv}`}>
            <input type="checkbox" id={id} name={name} value={value} onChange={onChangeHandler} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default InputCheckbox;