import styled from "@emotion/styled";
export const Body = styled("div")((props) => ({
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  backgroundColor: "black",
  position: "absolute",
  top: "-100%",
  color: "white",
  display: "flex",
  flexDirection: "column",
  fontFamily: `'Anton', sans-serif`,
  transform: props.open ? "translateY(100%)" : null,
  transition: "0.3s ease-out",
  zIndex: 5,
}));
export const Container = styled("div")((props) => ({
  display: "flex",
  padding: "0 20px",
  flexGrow: 1,
  overflowX: "hidden",
}));
export const StyledImage = styled("div")((props) => ({
  opacity: 1,
  height: 438,
  width: 291,
  margin: "auto 10px",
  backgroundImage: `url('${props.img}')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  transition: "0.05s linear",
  cursor: "pointer",
  flexShrink: 0,
  ":hover": {
    opacity: 0.8,
  },
}));
export const SizeFixedBox = styled("div")((props) => ({
  width: 500,
  padding: "30 0",
  flexShrink: 0,
}));
export const WordsContainer = styled("div")((props) => ({
  borderRight: "1px  solid #333",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "5%",
  alignItems: "flex-start",
}));
export const P = styled("p")((props) => ({
  fontSize: "3.5vw",
  fontWeight: "400",
  margin: 10,
  letterSpacing: 1.5,
}));
export const Submit = styled("div")((props) => ({
  margin: "5%",
  padding: "5% 10%",
  border: " 1px solid white",
  cursor: "pointer",
  flex: 1,
}));
export const LogoutBtn = styled("div")((props) => ({
  width: "50%",
  height: 150,
  flex: 0,
  display: "flex",
  margin: "auto",
  padding: "5% 10%",
  border: " 1px solid white",
  cursor: "pointer",
}));
