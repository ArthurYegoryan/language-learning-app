"use client";

import "@/components/loginSection/LoginSection.css";
import { db } from "@/utils/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import P from "@/generalComponents/texts/P.component";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import Button from "@/generalComponents/button/Button.component";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logIn, logInUserid, logInUserRole } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const fetchUserDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data()});
    });

    return data;
};

const LoginSection = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ userData, setUserData ] = useState([]);
    const [ showErrorUserPass, setShowErrorUserPass ] = useState(false);
    const { push } = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await fetchUserDataFromFirestore();
            setUserData(data);
        };
        fetchUserData();
    }, []);

    const checkLogin = (evt) => {
        evt.preventDefault();        

        console.log("User data:");
        console.log(JSON.stringify(userData, null, 2));

        userData.forEach((user) => {
            if (user.username === username && user.password === password) {
                console.log(`User id: ${user.id}`);
                dispatch(logIn(username));
                dispatch(logInUserid(user.id));
                dispatch(logInUserRole(user.role));

                if (user.role === "student") {
                    push("/student");
                } else {
                    push("/teacher");
                }
            }
        });
        setShowErrorUserPass(true);
    };

    return (
        <section className="login-section">
            <div className="login-area">
                <P text="Sign in" className="p-sign-in" />
                <form onSubmit={checkLogin}>
                    <Input type="text"
                           placeholder="Username"
                           classNameDiv="login-input-div"
                           onChangeHandler={ (evt) => setUsername(evt.target.value) }
                    />
                    <Input type="password"
                           placeholder="Password"
                           classNameDiv="login-input-div"
                           onChangeHandler={ (evt) => setPassword(evt.target.value) }
                    />
                    {showErrorUserPass &&
                        <P text="Invalid username or password!" className="p-invalid-field" />
                    }
                    <div className="login-button-div">
                        <Button label="Login" className="login-button" />
                    </div>
                </form>
                <div className="login-area-go-to-reg-div">
                    <Link href="/registration" className="login-area-go-to-reg-link">I havn't an account</Link>
                </div>
                <div className="login-area-back-home-link-div">
                    <Link href="/" className="login-area-back-home-link">Back to home page</Link>
                </div>
            </div>
        </section>
    );
};

export default LoginSection;