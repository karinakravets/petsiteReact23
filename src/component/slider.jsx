import React from "react";
const Slider = (props) => {
    return (
        <div className={props.css_class}>
            <h2 className='text-center text-primary'>{props.data.kind}</h2>
            <p className='text-center'>{props.data.description}</p>
            <img src={'https://pets.сделай.site'+props.data.image} className="d-block m-auto" alt="photo_pets" style={{height: '200px'}}/>
        </div>
    );
};
export default Slider;