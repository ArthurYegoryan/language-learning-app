import LinkComponent from "@/generalComponents/linkComponents/homeLink/LinkComponent";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <ul className="about-part">
                <LinkComponent path="/about" label="About" />
            </ul>
            <ul className="reg-login-part">
                <LinkComponent path="/login" label="Login" classname="link-navbar" />
                <LinkComponent path="/registration" label="Registration" />
            </ul>
        </div>
    );
};

export default Navbar;