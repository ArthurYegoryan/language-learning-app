import { useSelector } from "react-redux";
import "./UserContainer.css";
import P from "@/generalComponents/texts/P.component";

const UserContainer = () => {
    let { username } = useSelector((state) => state.auth.value);

    if (!username) {
        username = localStorage.getItem("username");
    }

    return (
        <div className="user-container">
            <img src="/static/images/user.svg" alt="user" />
            <P text={username} className="user-username" />
        </div>
    );
};

export default UserContainer;