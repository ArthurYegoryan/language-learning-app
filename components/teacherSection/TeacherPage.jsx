"use client";

import "./TeacherPage.css";
import Header from "@/generalComponents/header/Header";
import { useSelector } from "react-redux";

const TeacherPage = () => {
    const { username } = useSelector((state) => state.auth.value);

    return (
        <section>
            <Header />
        </section>
    );
};

export default TeacherPage;