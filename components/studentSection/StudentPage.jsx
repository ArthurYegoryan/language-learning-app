"use client";

import "./StudentPage.css";
import Header from "@/generalComponents/header/Header";
import { useSelector } from "react-redux";
import CoursesForStudent from "./coursesForStudent/CoursesForStudent";
import PostsForStudent from "./postsForStudent/PostsForStudent";

const StudentPage = () => {
    const { isMenuOpen } = useSelector((state) => state.menu);
    let className = "";

    if (isMenuOpen) className="s-page-content-left-margin";

    return (
        <section className="s-page-section">
            <Header />
            <div className={`s-page-content ${className}`}>
                <CoursesForStudent />
                <PostsForStudent />
            </div>
        </section>
    );
};

export default StudentPage;