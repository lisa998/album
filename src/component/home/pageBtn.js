import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function PageBtn({ totalPage, setPage, setDeleteBtn }) {
  const btn = new Array(totalPage).fill("");
  let nav = useNavigate();
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 5,
        bottom: 30,
        right: 50,
        color: "white",
        fontSize: 28,
        fontFamily: "Anton",
      }}
    >
      {btn.map((ele, i) => (
        <Btn
          key={i}
          onClick={() => {
            setPage(i + 1);
            nav(`/home/${i + 1}`);
          }}
        >
          {i + 1}
        </Btn>
      ))}
      <Btn onClick={() => setDeleteBtn((d) => +!d)}>
        <i className="fas fa-trash"></i>
      </Btn>
    </div>
  );
}
const Btn = styled("div")((props) => ({
  border: "1px solid white",
  width: 56,
  height: 50,
  margin: 10,
  paddingTop: 6,
  cursor: "pointer",
  opacity: 0.7,
  ":hover": {
    opacity: 1,
    boxShadow: "0 0 10px 2px white",
  },
}));
