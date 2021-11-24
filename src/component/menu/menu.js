import {
  Body,
  Image,
  SizeFixedBox,
  Container,
  P,
  WordsContainer,
} from "./styled";
import { useRef, useEffect, useState } from "react";
import Login from "./login";

export default function Menu({ open }) {
  const [transform, setTransform] = useState(0);
  const images = new Array(7).fill("");
  const elRef = useRef();
  const imagesWidth = useRef();
  const style = {
    transform: open ? " translateY(0%)" : "translateY(10%)",
    opacity: open ? 1 : 0,
    transition: "0.5s ease-out",
    transitionDelay: open ? "0.7s" : null,
  };
  useEffect(() => {
    imagesWidth.current = images.length * 311 + 40 - elRef.current.clientWidth;
  }, [images.length]);

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
            <span style={{ padding: 15 }}>IG</span>
            <span style={{ padding: 15 }}>FB</span>
          </p>
        </SizeFixedBox>
        <Container onWheel={handleScroll} ref={elRef}>
          {images.map((ele, i) => (
            <Image transform={transform} key={i} />
          ))}
        </Container>
      </div>
    </Body>
  );
}
