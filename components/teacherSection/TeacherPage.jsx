"use client";

import "./TeacherPage.css";
import { useSelector } from "react-redux";

const TeacherPage = () => {
    const { username } = useSelector((state) => state.auth.value);

    return (
        <section>
            <h1>Teacher page</h1>
            <div>
                User: {username}
            </div>
        </section>
    );
};

export default TeacherPage;