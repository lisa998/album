import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Box } from "./styled";
import { InputTitle, Icon, AddFileLabel } from "./styled";
import { addAlbum, addPic } from "./picSlice";
import { useDispatch } from "react-redux";
import { getApiUrl } from "../../conn";

export default function FileUpload({ silder, album }) {
  const [name, setName] = useState(album || "");
  const [img, setImg] = useState([]);
  const [start, setStart] = useState(0);
  useEffect(() => {
    setTimeout(() => setStart((s) => !s), 0);
  }, []);
  const dispatch = useDispatch();
  let fileInput = useRef();

  const upload = async () => {
    if (name !== "") {
      const data = new FormData();
      for (let i = 0; i < fileInput.current.files.length; i++) {
        data.append(`imgFile${i}`, fileInput.current.files[i]);
      }
      data.append("imgName", name);
      let config = { headers: { "Content-Type": "application/json" } };
      let r = await axios.post(getApiUrl("upload"), data, config);
      if (r.data === "authenticated") {
        let imgNum = img.length;
        setImg([]);
        if (!album) {
          setName("");
          let r = await axios.get(getApiUrl(`searchPic/${name}`));
          r.data.map((ele) => dispatch(addAlbum({ name, img: ele.src })));
        } else {
          let r = await axios.get(getApiUrl(`searchPic/${name}`));
          let total = r.data.length;
          for (let i = total - 1; i >= total - imgNum; i--) {
            dispatch(addPic({ name: album, img: r.data[i].src }));
          }
        }
      } else {
        alert(r.data);
      }
    } else {
      alert("please insert Title");
    }
  };
  const reset = () => {
    fileInput.current.value = "";
    setImg([]);
  };
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setImg((img) => [...img, e.target.files[i].name]);
    }
  };
  const sliderBoxStyle = {
    position: "absolute",
    right: 0,
    bottom: 100,
    width: 300,
    height: 350,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "hsla(0, 0%, 100%, 0.2)",
    transform: start ? "translateY(0%)" : "translateY(10%)",
  };
  return (
    <Box
      style={
        silder
          ? sliderBoxStyle
          : {
              display: "flex",
              flexDirection: "column",
              backgroundColor: "brown",
            }
      }
    >
      <div style={{ position: "absolute", top: 20, left: 40 }}>
        {silder ? null : (
          <InputTitle
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
          />
        )}
        {img.map((ele, i) =>
          i < 5 ? (
            <p style={{ textAlign: "left" }} key={i}>
              {ele}
            </p>
          ) : null
        )}
        {img.length > 5 ? (
          <p style={{ textAlign: "left" }}>
            and other {img.length - 5} pictrue{img.length - 5 > 1 ? "s" : null}
          </p>
        ) : null}
      </div>
      <AddFileLabel>
        <i className="fas fa-plus-circle" style={{ fontSize: 40 }}></i>
        <input
          type="file"
          ref={fileInput}
          multiple
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </AddFileLabel>

      <div
        style={{
          cursor: "pointer",
          fontSize: 40,
          position: "absolute",
          bottom: 20,
          right: 40,
        }}
      >
        <Icon className="fas fa-cloud-upload-alt" onClick={upload}></Icon>
        <Icon className="fas fa-undo" onClick={reset}></Icon>
      </div>
    </Box>
  );
}
