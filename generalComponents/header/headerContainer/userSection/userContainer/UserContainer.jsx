import { useSelector } from "react-redux";
import "./UserContainer.css";

const UserContainer = () => {
    const { username } = useSelector((state) => state.auth.value);

    return (
        <div className="user-container">
            <img src="/static/images/user.svg" alt="user" />
            <p>{username}</p>
        </div>
    );
};

export default UserContainer;