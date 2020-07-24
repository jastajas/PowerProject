import React from "react";
import PrevArrow from "../../images/prevArrow.svg";
import NextArrow from "../../images/forwArrow.svg";
import "./Slider.css";

const Slider = props => {
  const {selectedValue, startRange, endRange, deacreaseValue, increaseValue} = props;

  return (
    <div className="slider">
      <button disabled={startRange >= selectedValue} onClick={deacreaseValue}> <img src={PrevArrow} alt="" /></button>
      <div>{selectedValue}</div>
      <button disabled={endRange <= selectedValue} onClick={increaseValue}> <img src={NextArrow} alt="" /></button>
    </div>
  );
};

export default Slider;
