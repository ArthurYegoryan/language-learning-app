import "./LinkComponent.css";

const { default: Link } = require("next/link");

const LinkComponent = ({
    path,
    label,
    classname = ""
}) => {
    return (
        <li className={`link ${classname}`}>
            <Link href={path}>{label}</Link>
        </li>
    );
};

export default LinkComponent;