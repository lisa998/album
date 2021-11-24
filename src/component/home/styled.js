import styled from "@emotion/styled";
export const Body = styled("div")((props) => ({
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  backgroundColor: "black",
}));
export const Container = styled("div")((props) => ({
  padding: 100,
  backgroundColor: "black",
  width: 2250,
  display: "flex",
  flexWrap: "wrap",
  transform: props.transform,
  transition: "1s ease-out",
}));
export const Box = styled("div")((props) => ({
  height: 353,
  width: 520,
  position: "relative",
  color: "white",
  transition: "0.3s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 1,
  zIndex: 2,
  margin: 20,
}));
export const Image = styled("div")((props) => ({
  backgroundImage: `url('${props.img}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%",
  position: "absolute",
  zIndex: -1,
  opacity: 0.7,
  ":hover": {
    opacity: 0.8,
  },
}));
export const H = styled("h1")((props) => ({
  transition: "0.3s ease-in-out",
  opacity: props.show ? 1 : 0,
  transform: props.show ? "translateY(0%)" : "translateY(100%)",
}));
export const InputTitle = styled("input")((props) => ({
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid white",
  fontSize: 26,
  width: 200,
  color: "white",
  "&::placeholder": {
    color: "white",
  },
  "&:focus": {
    outline: "none",
  },
}));
export const Icon = styled("i")((props) => ({
  paddingLeft: 20,
  "&:hover": { color: "black", transform: "scale(1.2)" },
}));
export const AddFileLabel = styled("label")((props) => ({
  cursor: "pointer",
  width: 300,
  height: 250,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { color: "black", transform: "scale(1.2)" },
}));
