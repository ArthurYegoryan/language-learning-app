const P = ({
    className,
    text
}) => {
    return (
        <p className={`p ${className}`}>{text}</p>
    );
};

export default P;