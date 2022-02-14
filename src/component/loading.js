import styled from "@emotion/styled";
import { useEffect, useState } from "react";
export default function Loading() {
  let title = "ALBUM";
  let [status, setStatus] = useState(1);
  const brightness = (i, status) => {
    if (status / i / 10 >= 1) {
      return 1;
    } else if (Math.floor(status / 10) + 1 === i) {
      return `${((status % 10) + 1) / 10}`;
    } else {
      return 0.1;
    }
  };
  useEffect(() => {
    let start = new Date().getTime();
    let id = setInterval(() => {
      setStatus((status) => status + 1);
      if (new Date().getTime() - start > 5000) {
        clearInterval(id);
      }
    }, 100);
  }, [setStatus]);

  return (
    <Body>
      <Neon>
        {title.split("").map((ele, i) => (
          <Span key={i} brightness={brightness(i, status)}>
            {ele}
          </Span>
        ))}
      </Neon>
      <div
        style={{
          margin: "0px auto auto",
          display: "flex",
        }}
      >
        <Reflex>
          {title.split("").map((ele, i) => (
            <Span key={i} brightness={brightness(i, status)}>
              {ele}
            </Span>
          ))}
        </Reflex>
      </div>
    </Body>
  );
}
const Body = styled("div")((props) => ({
  zIndex: 10,
  width: "100vw",
  height: "100vh",
  backgroundColor: "black",
  color: "white",
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  animation: "moveOut 0.3s ease-in-out",
  animationDelay: "5s",
  animationFillMode: "forwards",
}));
const Neon = styled("div")((props) => ({
  position: "relative",
  textShadow: "0 0 20px white",
  fontSize: 120,
  letterSpacing: "2rem",
  margin: "auto auto 0px auto",
  left: 20,
}));
const Reflex = styled("div")((props) => ({
  position: "relative",
  textShadow: "0 0 20px white",
  fontSize: 120,
  letterSpacing: "2rem",
  margin: "auto auto 0px auto",
  left: 20,
  top: -50,
  opacity: 0.95,
  transform: "perspective(1em) rotateX(-150deg) scale(1.16,0.7)",
  filter: "blur(3px)",
}));
const Span = styled("span")((props) => ({
  filter: `brightness(${props.brightness})`,
}));
