import { StyledImage } from "../home/styled";
import { H, imageStyle } from "./styled";
import Info from "./info";
import { useEffect, useState } from "react";
import { selectPic } from "../home/picSlice";
import { useSelector } from "react-redux";
import Brand from "../brand";
import MenuAndBtn from "../menu/menuAndBtn";
import FileUpload from "../home/fileUpload";
import DeleteDiv from "./deleteImg";

export default function Slider({ name, nowPage }) {
  const pic = useSelector(selectPic);
  const [page, setPage] = useState(1);
  //const [titleShow, setTitleShow] = useState(0);
  const [openFileUp, setOpenFileUp] = useState(0);
  const [deleteDiv, setDeleteDiv] = useState(0);
  useEffect(() => {
    if (page > pic[name].length) {
      setPage((page) => page - 1);
    }
  }, [name, page, pic]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        color: "white",
      }}
    >
      <StyledImage
        img={"http://localhost:3001/upload/" + pic[name][page - 1]}
        style={imageStyle}
      ></StyledImage>
      <StyledImage
        img={`http://localhost:3001/upload/${
          pic[name][0].split(".jpg")[0]
        }_small.jpg`}
        style={{
          zIndex: -1,
          opacity: 1,
          animation: "fadeOut 2s cubic-bezier(0.645, 0.045, 0.355, 1)",
          animationFillMode: "forwards",
        }}
      ></StyledImage>
      <Brand />
      <Info
        props={{
          name,
          setPage,
          deleteDiv,
          setDeleteDiv,
          openFileUp,
          setOpenFileUp,
          page,
          nowPage,
        }}
      />
      {openFileUp ? <FileUpload silder album={name} /> : null}
      {deleteDiv ? (
        <DeleteDiv
          setDeleteDiv={setDeleteDiv}
          picName={pic[name][page - 1]}
          album={name}
          lastPic={+(pic[name].length === 1)}
        />
      ) : null}
      <MenuAndBtn />
      <H>
        {name.split("").map((ele, i) => (
          <span
            key={i}
            style={{
              opacity: 0,
              animation: "fadeInOut 2s",
              animationDelay: `2.${i}s`,
              animationFillMode: "forwards",
            }}
          >
            {ele}
          </span>
        ))}
      </H>
    </div>
  );
}
