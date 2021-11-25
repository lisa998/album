import { StyledImage, InputTitle } from "../home/styled";
import { SliderInfoDiv, SliderInfoBackground } from "./styled";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectPic } from "../home/picSlice";
import { useSelector, useDispatch } from "react-redux";
import { editName } from "../home/picSlice";
import { Btn } from "./btn";
import Brand from "../brand";
import MenuAndBtn from "../menu/menuAndBtn";
import FileUpload from "../home/fileUpload";
import DeleteDiv from "./deleteImg";
import axios from "axios";

export default function Slider({ name, nowPage }) {
  const pic = useSelector(selectPic);
  const [page, setPage] = useState(1);
  //const [titleShow, setTitleShow] = useState(0);
  const [editable, setEditable] = useState(false);
  const [albumName, setAlbumName] = useState(name);
  const [openFileUp, setOpenFileUp] = useState(0);
  const [deleteDiv, setDeleteDiv] = useState(0);
  let nav = useNavigate();
  let dispatch = useDispatch();
  let max = useMemo(() => pic[name].length, [pic, name]);

  const next = () => {
    setPage((p) => (p >= max ? p + 1 - max : p + 1));
  };
  const prev = () => {
    setPage((p) => (p <= 1 ? p - 1 + max : p - 1));
  };
  const edit = async () => {
    if (editable && name !== albumName) {
      let data = { oldName: name, newName: albumName };
      let r = await axios.post("http://localhost:3001/updateName", data);
      console.log(r);
      dispatch(editName(data));
      nav(`/${albumName}`);
    }
    setEditable((e) => !e);
  };
  const handleLoadDiv = async () => {
    if (deleteDiv) {
      setDeleteDiv(0);
    }
    setOpenFileUp((o) => +!o);
  };
  const handleDeleteDiv = async () => {
    if (openFileUp) {
      setOpenFileUp(0);
    }
    setDeleteDiv((d) => +!d);
  };
  useEffect(() => {
    if (page > pic[name].length) {
      setPage((page) => page - 1);
    }
  }, [name, page, pic]);
  const imageStyle = {
    opacity: 1,
    zIndex: -1,
    backgroundSize: "contain",
    backgroundColor: "black",
  };
  const inputStyle = {
    padding: "20px 0px 20px 100px",
    borderRight: "2px solid hsla(0, 0%, 100%, 0.1)",
    borderBottom: "none",
    fontFamily: "Anton",
  };
  const divStyle = {
    padding: "30px 50px",
    borderLeft: "2px solid hsla(0, 0%, 100%, 0.1)",
    fontSize: 20,
  };
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
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
          opacity: 0,
          animation: "fadeOut 2s cubic-bezier(0.645, 0.045, 0.355, 1)",
        }}
      ></StyledImage>
      <Brand />
      <SliderInfoDiv>
        <SliderInfoBackground />
        <div style={{ display: "flex" }}>
          <Btn
            icon="fas fa-th"
            left
            handleClick={() => nav(`/home/${nowPage}`)}
          />

          {editable ? (
            <InputTitle
              style={inputStyle}
              autoFocus
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />
          ) : (
            <div
              style={{
                padding: "20px 100px",
                borderRight: "2px solid hsla(0, 0%, 100%, 0.1)",
              }}
            >
              {name}
            </div>
          )}

          <Btn icon="far fa-edit" left handleClick={edit} />
        </div>
        <div style={{ display: "flex" }}>
          <Btn
            icon="fas fa-plus"
            handleClick={handleLoadDiv}
            openFileUp={openFileUp}
          />
          <Btn icon="fas fa-trash" handleClick={handleDeleteDiv} />
          <div style={divStyle}>
            {page}/{pic[name].length}
          </div>
          <Btn icon="fas fa-chevron-left" handleClick={prev} />
          <Btn icon="fas fa-chevron-right" handleClick={next} />
        </div>
      </SliderInfoDiv>
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
    </div>
  );
}
