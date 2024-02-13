import "./NavLinks.css";
import MenuLink from "@/generalComponents/linkComponents/menuLink/MenuLink";
import { useSelector } from "react-redux";

const NavLinks = () => {
    const { role } = useSelector((state) => state.auth.value);
    console.log("Role: ", role);

    return (
        <nav className="nav-links">
            <ul>
                {role === "teacher" &&
                    <>
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
                    </>
                }
                {role === "student" &&
                    <>
                        <MenuLink routePath="student/studyingCourses" 
                            imagePath="/static/images/" 
                            imageName="video" 
                            imageType="svg" 
                            label="Studying courses" 
                        />
                        <MenuLink routePath="student/savedPosts" 
                            imagePath="/static/images/" 
                            imageName="post" 
                            imageType="svg" 
                            label="Saved posts"
                        />
                    </>
                }
            </ul>
        </nav>
    );
};

export default NavLinks;