import React from "react";
import { Carousel } from 'antd';
const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '600px',
    textAlign: 'center',
    background: '#364d79',
};


const Mainpage = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <Carousel afterChange={onChange} autoplay="true" className="carousel">
            <div>
                <h3 style={contentStyle}>Welcome to EasyLife Managment Website</h3>
            </div>
            <div>
                <h3 style={contentStyle}>Pay your rent online</h3>
            </div>
            <div>
                <h3 style={contentStyle}>Book a service in 3 minutes!</h3>
            </div>
            <div>
                <h3 style={contentStyle}>Share life with neighbours</h3>
            </div>
        </Carousel>
    );
}

export default Mainpage;