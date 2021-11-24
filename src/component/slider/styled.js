import styled from "@emotion/styled";
export const SliderInfoDiv = styled("div")((props) => ({
  display: "flex",
  width: "100%",
  color: "white",
  justifyContent: "space-between",
  bottom: 0,
  position: "absolute",
  fontSize: 30,
  borderTop: "2px solid hsla(0, 0%, 100%, 0.1)",
  fontFamily: "Anton",
}));
export const SliderInfoBackground = styled("div")((props) => ({
  width: "100%",
  height: "120%",
  top: "-20%",
  position: "absolute",
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.85) 100%)",
  zIndex: -1,
}));
export const SliderBtn = styled("div")((props) => ({
  padding: "20px 30px",
  borderLeft: props.left ? null : "2px solid hsla(0, 0%, 100%, 0.1)",
  position: "relative",
  overflow: "hidden",
  borderRight: props.left ? "2px solid hsla(0, 0%, 100%, 0.1)" : null,
  cursor: "pointer",
}));
export const BtnHoverDiv = styled("div")((props) => ({
  padding: "23px 30px",
  backgroundColor: "white",
  color: "black",
  position: "absolute",
  top: "100%",
  left: 0,
  transform: props.hover ? "translateY(-100%)" : null,
  transition: "0.1s ease-out",
}));
export const SliderDeleteBox = styled("div")((props) => ({
  position: "absolute",
  right: 20,
  bottom: 100,
  width: 300,
  height: 150,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "hsla(0, 0%, 100%, 0.2)",
  color: "white",
  padding: "20px 30px",
  fontSize: 30,
  transform: props.start ? "translateY(0%)" : "translateY(20%)",
  transition: "0.3s ease-out",
  fontFamily: "Anton",
}));
export const ArrowIcon = styled("i")((props) => ({
  margin: 5,
  position: "absolute",
  left: 80,
  top: 2,
  opacity: props.hover ? 1 : 0,
  transition: "0.1s ease-in",
}));
