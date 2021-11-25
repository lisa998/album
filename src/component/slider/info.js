import { InputTitle } from "../home/styled";
import {
  SliderInfoDiv,
  SliderInfoBackground,
  inputStyle,
  divStyle,
} from "./styled";
import { Btn } from "./btn";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editName } from "../home/picSlice";
import { selectPic } from "../home/picSlice";
import axios from "axios";

export default function Info({ props }) {
  let {
    name,
    setPage,
    deleteDiv,
    setDeleteDiv,
    openFileUp,
    setOpenFileUp,
    page,
    nowPage,
  } = props;
  const [editable, setEditable] = useState(false);
  const [albumName, setAlbumName] = useState(name);
  const pic = useSelector(selectPic);
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
      if (r.data === "authenticated") {
        dispatch(editName(data));
        nav(`/${albumName}`);
      }
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
  return (
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
  );
}
