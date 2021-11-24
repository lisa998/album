import styled from "@emotion/styled";
export default function SwitchMenu({ setOpenMenu, open }) {
  return (
    <Cross
      onClick={() =>
        setOpenMenu((open) => {
          return +!open;
        })
      }
    >
      <Line
        style={{
          width: "100%",
          transform: open ? `translate3d(0px, 10px, 0px) rotateZ(45deg)` : null,
        }}
      ></Line>
      <Line
        style={{
          width: open ? "100%" : "56%",
          transform: open ? "rotateZ(-45deg) translate3d(7px,-7px,0)" : null,
        }}
      ></Line>
    </Cross>
  );
}
const Cross = styled("div")((props) => ({
  position: "absolute",
  top: 30,
  right: 30,
  cursor: "pointer",
  width: 44,
  display: "flex",
  flexDirection: "column",
  height: 40,
  justifyContent: "space-around",
  alignItems: "flex-end",
  zIndex: 5,
}));
const Line = styled("div")((props) => ({
  backgroundColor: "white",
  height: 2,
  transition: "0.3s",
}));
