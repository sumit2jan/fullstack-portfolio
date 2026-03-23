import React from 'react';
import Lottie from 'lottie-react';
import cat from "../assets/cat.json";
import walk from "../assets/Totoro Walk.json";
import man from "../assets/ManAndRobot.json";

const Cat = () => {
    return (
        <>
           <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "50px",
            paddingTop: "80px"
        }}>
            <Lottie animationData={walk} loop autoplay style={{ width: 300 }} />
            <Lottie animationData={cat} loop autoplay style={{ width: 300 }} />
            <Lottie animationData={man} loop autoplay style={{ width: 300 }} />
        </div>
    
        </>
    )
}

export default Cat
