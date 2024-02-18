"use client";

import "./LogoutContainer.css";
import Button from "@/generalComponents/button/Button.component";
import { logOut } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const LogoutContainer = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const onClickHandler = () => {
        dispatch(logOut());
        localStorage.clear();
        router.push("/login");
    }

    return (
        <div className="logout">
            <img src="static/images/logout.svg" alt="logout" />
            <Button label="Log out" className="button-logout" onClickHandler={onClickHandler} />
        </div>
    );
};

export default LogoutContainer;