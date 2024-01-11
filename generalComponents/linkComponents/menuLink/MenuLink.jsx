import "./MenuLink.css";
import Link from "next/link";

const MenuLink = ({
    routePath,
    imagePath,
    label,
    imageName,
    imageType
}) => {
    return (
        <li className="menu-link-component">
            <Link href={routePath} className="menu-route-link">
                <img src={`${imagePath}${imageName}.${imageType}`} alt={imageName} />
                {label}
            </Link>
        </li>
    );
};

export default MenuLink;