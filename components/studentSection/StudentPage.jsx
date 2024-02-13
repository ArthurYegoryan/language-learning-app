"use client";

import "./StudentPage.css";
import Header from "@/generalComponents/header/Header";
import { useSelector } from "react-redux";

const StudentPage = () => {
    const { isMenuOpen } = useSelector((state) => state.menu);
    let className = "";

    if (isMenuOpen) className="s-page-content-left-margin";

    return (
        <section className="s-page-section">
            <Header />
            <div className={`s-page-content ${className}`}>
                Barlus Hayer
            </div>
        </section>
    );
};

export default StudentPage;