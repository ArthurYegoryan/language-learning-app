import "./HeaderContainer.css";
import NavSection from "./navSection/NavSection";
import UserSection from "./userSection/UserSection";

const HeaderContainer = () => {
    return (
        <div className="header-container">
            <NavSection />
            <UserSection />
        </div>
    );
};

export default HeaderContainer;