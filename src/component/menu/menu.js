import {
  Body,
  StyledImage,
  SizeFixedBox,
  Container,
  P,
  WordsContainer,
} from "./styled";
import { useRef, useEffect, useState } from "react";
import { selectPic } from "../home/picSlice";
import { useSelector } from "react-redux";
import Login from "./login";
import { useNavigate } from "react-router-dom";

export default function Menu({ open, setOpenMenu }) {
  const [transform, setTransform] = useState(0);
  const pic = useSelector(selectPic);
  const elRef = useRef();
  const imagesWidth = useRef();
  const nav = useNavigate();
  const style = {
    transform: open ? " translateY(0%)" : "translateY(10%)",
    opacity: open ? 1 : 0,
    transition: "0.5s ease-out",
    transitionDelay: open ? "0.7s" : null,
  };
  useEffect(() => {
    imagesWidth.current =
      Object.keys(pic).length * 311 + 40 - elRef.current.clientWidth;
  }, [pic]);

  const handleScroll = (e) => {
    let add = e.deltaY;
    setTransform((transform) => {
      if (transform - add > 0) {
        return 0;
      } else if (transform - add < -imagesWidth.current) {
        return -imagesWidth.current;
      } else return transform - add;
    });
  };
  /*else if (transform - add < -imagesWidth.current) {
        return -imagesWidth.current;
      } else return transform - add;*/

  return (
    <Body open={open}>
      <div
        style={{
          display: "flex",
          flex: "1 0 0",
          borderBottom: "1px  solid #333",
          ...style,
        }}
      >
        <WordsContainer>
          <P>WE CAPTURE INCREDIBLE</P>
          <P>MOVING IMAGES AND TELL</P>
          <P>POWERFUL STORIES</P>
        </WordsContainer>
        <SizeFixedBox
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Login />
        </SizeFixedBox>
      </div>
      <div
        style={{
          display: "flex",
          flex: "1 0 0",
          ...style,
          transitionDelay: open ? "0.8s" : null,
        }}
      >
        <SizeFixedBox
          style={{
            borderRight: "1px solid #333",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>CONNECT</p>
          <P style={{ fontSize: "2.5vw" }}>xj3zjfan@gmail.com</P>
          <p>
            <a
              href="https://www.instagram.com/minchenluo/"
              style={{ color: "inherit", textDecoration: "inherit" }}
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ padding: 15 }}>IG</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100002201899421"
              style={{ color: "inherit", textDecoration: "inherit" }}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span style={{ padding: 15 }}>FB</span>
            </a>
          </p>
        </SizeFixedBox>
        <Container onWheel={handleScroll} ref={elRef}>
          {Object.keys(pic).map((ele, i) => (
            <StyledImage
              style={{ transform: `translateX(${transform}px)` }}
              key={i}
              img={`http://localhost:3001/upload/${
                pic[ele][0].split(".jpg")[0]
              }_small.jpg`}
              onClick={() => {
                nav(`/${ele}`);
                setOpenMenu(0);
              }}
            />
          ))}
        </Container>
      </div>
    </Body>
  );
}
