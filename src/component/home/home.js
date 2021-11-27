import { Body, Container } from "./styled";
import { useMemo, useState } from "react";
import Brand from "../brand";
import MenuAndBtn from "../menu/menuAndBtn";
import { Pic } from "./pic";
import { selectPic } from "./picSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FileUpload from "./fileUpload";
import PageBtn from "./pageBtn";
import DeleteDiv from "../slider/deleteImg";

export default function Home({ totalPic }) {
  const [transform, setTransform] = useState([0, 0]);
  const [openImg, setOpenImg] = useState(0);
  let params = useParams();
  const [page, setPage] = useState(+params.page || 1);
  const [deleteBtn, setDeleteBtn] = useState(0);
  const [deleteDiv, setDeleteDiv] = useState(0);
  const [selectDelete, setSelectDelete] = useState("");
  const listenMousePlace = (e) => {
    const xPlace = (e.clientX / window.innerWidth) * -20;
    const yPlace = (e.clientY / window.innerHeight) * -48;
    setTransform([xPlace, yPlace]);
  };

  const pic = useSelector(selectPic);
  let renderPics = useMemo(() => {
    let p = (page - 1) * 15;
    if (Object.keys(pic).length > 15) {
      return Object.keys(pic).slice(0 + p, 15 + p);
    } else {
      return Object.keys(pic);
    }
  }, [pic, page]);

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <Body onMouseOver={openImg ? null : listenMousePlace}>
          <Container
            transform={
              openImg
                ? `translate(-120px, -120px)`
                : `translate(${transform[0]}%, ${transform[1]}%)`
            }
          >
            <FileUpload />
            {renderPics.map((ele, i) => (
              <Pic
                setOpenImg={setOpenImg}
                key={i}
                album={ele}
                deleteBtn={deleteBtn}
                setDeleteDiv={setDeleteDiv}
                setSelectDelete={setSelectDelete}
              />
            ))}
          </Container>
        </Body>

        <Brand />
        <PageBtn
          totalPage={Math.ceil(Object.keys(pic).length / 15)}
          setPage={setPage}
          setDeleteBtn={setDeleteBtn}
        />
        <MenuAndBtn />
        {deleteDiv ? (
          <DeleteDiv
            setDeleteDiv={setDeleteDiv}
            setDeleteBtn={setDeleteBtn}
            album={selectDelete}
          />
        ) : null}
      </div>
    </>
  );
}
