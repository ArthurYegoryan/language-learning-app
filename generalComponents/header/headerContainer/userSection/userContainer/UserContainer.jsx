import { useSelector } from "react-redux";
import "./UserContainer.css";
import P from "@/generalComponents/texts/P.component";

const UserContainer = () => {
    const { username } = useSelector((state) => state.auth.value);

    return (
        <div className="user-container">
            <img src="/static/images/user.svg" alt="user" />
            <P text={username} className="user-username" />
        </div>
    );
};

export default UserContainer;