import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className='homepage-intro'>
            <div className='homepage-video'>
                <video
                    className='homepage-video-media'
                    src='/static/videos/learning-map.mp4'
                    autoPlay
                    muted
                    loop
                ></video>
            </div>
        </div>
    );
};

export default HomePage;
