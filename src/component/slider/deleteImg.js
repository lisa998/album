import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SliderDeleteBox, ArrowIcon } from "./styled";
import { deletePic, deleteAlbum } from "../home/picSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../../conn";
import { auth } from "../../utils";

export default function DeleteDiv({
  setDeleteDiv,
  picName,
  album,
  lastPic,
  setDeleteBtn,
}) {
  const [start, setStart] = useState(0);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const title = setDeleteBtn
    ? `Delete [ ${album} ] album?`
    : "Delete this pictrue?";
  const handleDeletePic = async () => {
    if (picName) {
      //刪除圖片
      const r = await axios.delete(getApiUrl(`deleteImg`), {
        data: { picName },
      });
      const authCb = () => {
        if (lastPic) {
          dispatch(deleteAlbum(album));
          nav("/");
        } else {
          dispatch(deletePic({ name: album, img: picName }));
        }
        console.log(r.data);
      };
      auth(r, () => {}, authCb);
    } else {
      //刪除相簿
      const r = await axios.delete(getApiUrl(`deleteAlbum/${album}`));
      auth(
        r,
        () => {},
        () => dispatch(deleteAlbum(album))
      );
    }
    closeDiv();
  };
  const closeDiv = () => {
    setDeleteDiv(0);
    if (setDeleteBtn) {
      setDeleteBtn(0);
    }
  };
  useEffect(() => {
    setTimeout(() => setStart((s) => +!s), 0);
  }, []);

  return (
    <SliderDeleteBox start={start}>
      {title}
      <div style={{ margin: 10, cursor: "pointer" }}>
        <Choice data="YES" handleClick={handleDeletePic} />
        <Choice data="NO" handleClick={closeDiv} />
      </div>
    </SliderDeleteBox>
  );
}

const Choice = ({ data, handleClick }) => {
  const [hover, setHover] = useState(0);

  return (
    <div
      style={{ position: "relative" }}
      onMouseOver={() => setHover(1)}
      onMouseLeave={() => setHover(0)}
      onClick={handleClick}
    >
      <ArrowIcon className="fas fa-angle-double-right" hover={hover} />
      {data}
    </div>
  );
};
