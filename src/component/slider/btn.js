import { SliderBtn, BtnHoverDiv } from "./styled";
import { useState } from "react";

export const Btn = ({ icon, left, handleClick, openFileUp }) => {
  const [hover, setHover] = useState(0);
  const rotate = {
    transform: openFileUp ? "rotateZ(45deg)" : null,
    transition: "0.1s ease-in-out",
  };
  return (
    <SliderBtn
      onMouseOver={() => setHover(1)}
      onMouseLeave={() => setHover(0)}
      onClick={handleClick}
      left={left}
    >
      <i className={icon} style={rotate}></i>
      <BtnHoverDiv hover={hover} left={left}>
        <i className={icon} style={rotate}></i>
      </BtnHoverDiv>
    </SliderBtn>
  );
};
