import { Box, H, StyledImage, Picture } from "./styled";
import { useEffect, useState } from "react";
import { selectPic } from "./picSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Pic = ({
  setOpenImg,
  album,
  deleteBtn,
  setDeleteDiv,
  setSelectDelete,
}) => {
  const pic = useSelector(selectPic);
  const [hover, setHover] = useState(0);
  const [open, setOpen] = useState(0);
  const [img, setImg] = useState("");
  const nav = useNavigate();
  const handleClick = () => {
    setOpen(1);
    setOpenImg(1);
    //preload
    let picLoadPromise = pic[album].map(
      (ele) =>
        new Promise((resol, rej) => {
          let i = new Image();
          i.src = `http://localhost:3001/upload/${ele}`;
          if (i.complete) {
            resol();
          } else {
            i.onload = function () {
              resol();
            };
          }
        })
    );
    Promise.all(picLoadPromise).then(() => {
      setTimeout(() => {
        nav(`/${album}`);
      }, 1000);
    });
  };
  const openStyle = {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    zIndex: 5,
    opacity: 1,
  };
  useEffect(() => {
    if (pic[album][0]) {
      setImg(
        `http://localhost:3001/upload/${
          pic[album][0].split(".jpg")[0]
        }_small.jpg`
      );
    }
  }, [album, pic]);
  return (
    <Box
      onMouseOver={() => setHover(1)}
      onMouseLeave={() => setHover(0)}
      style={open ? openStyle : null}
    >
      <div
        style={{
          display: deleteBtn ? null : "none",
          fontSize: 40,
          position: "absolute",
          top: -20,
          left: -20,
        }}
        onClick={() => {
          setDeleteDiv(1);
          setSelectDelete(album);
        }}
      >
        <i className="fas fa-minus-circle"></i>
      </div>
      <StyledImage
        style={{ opacity: open ? 1 : null }}
        onClick={handleClick}
        hover={hover}
      >
        <Picture img={img} hover={hover} />
      </StyledImage>
      <div
        style={{
          overflow: "hidden",
          height: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleClick}
      >
        <H show={hover} open={open}>
          {album}
        </H>
      </div>
    </Box>
  );
};
