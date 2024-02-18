import "./UserSection.css";
import LogoutContainer from "./logoutContainer/LogoutContainer";
import UserContainer from "./userContainer/UserContainer";

const UserSection = () => {
    return (
        <div className="user-section">
            <UserContainer />
            <LogoutContainer />
        </div>
    );
};

export default UserSection;