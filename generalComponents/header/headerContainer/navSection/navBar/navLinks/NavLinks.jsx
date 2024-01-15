import "./NavLinks.css";
import MenuLink from "@/generalComponents/linkComponents/menuLink/MenuLink";

const NavLinks = () => {
    return (
        <nav className="nav-links">
            <ul>
               <MenuLink routePath="teacher/courses" 
                         imagePath="/static/images/" 
                         imageName="video" 
                         imageType="svg" 
                         label="My courses" 
                />
                <MenuLink routePath="teacher/posts" 
                         imagePath="/static/images/" 
                         imageName="post" 
                         imageType="svg" 
                         label="My posts" 
                /> 
            </ul>
        </nav>
    );
};

export default NavLinks;