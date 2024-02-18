"use client";

import "./AboutUs.css";
import Button from "@/generalComponents/button/Button.component";
import { useRouter } from "next/navigation";

const AboutUs = () => {
    const { push } = useRouter();

    const goHomeButtonHandler = () => {
        push("/");
    };

    return (
      <div className="about-us-container">
        <div className="about-us-video-background">
            <video autoPlay loop muted>
                <source
                    src="static/videos/about-us-video.mp4"
                    type="video/mp4"
                />
            </video>
        </div>
        <div className="about-us-content">
            <h1>About us</h1>
            <p className="about-us-introduction-text">DAHA is a cross-platform, that allows people in all the world</p>
            <p className="about-us-introduction-text">to share their knowledge and ideas with all the people who are</p>
            <p className="about-us-introduction-text">new in the programming world or have the desire and motivation</p>
            <p className="about-us-introduction-text">to learn.</p>
            <p>Be sure that this can be the beginning of your path to great success!</p>
            <p>So, let{`s`}s try!!!</p>
        </div>
        <Button label="HOME" 
                className="about-us-go-home-button"
                onClickHandler={goHomeButtonHandler}
        />
      </div>
    );
};
  
export default AboutUs;