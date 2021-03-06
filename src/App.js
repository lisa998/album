import "./App.css";
import Home from "./component/home/home";
import { Routes, Route } from "react-router-dom";
import Slider from "./component/slider/slider";
import { selectPic } from "./component/home/picSlice";
import { useSelector } from "react-redux";
import { loadAllPic, addAlbum } from "./component/home/picSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import Loading from "./component/loading";
import axios from "axios";

function App() {
  const pic = useSelector(selectPic);
  const dispatch = useDispatch();
  const totalPic = useRef(1);
  let arr = new Array(Math.ceil(totalPic.current / 15)).fill("");
  if (localStorage.getItem("token")) {
    let token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  useEffect(() => {
    dispatch(loadAllPic()).then((r) => {
      let obj = {};
      r.payload.forEach((ele) => (obj[ele.name] = 1));
      totalPic.current = Object.keys(obj).length || 1;
      r.payload.map((e) => dispatch(addAlbum({ name: e.name, img: e.src })));
    });
  }, [dispatch]);
  return (
    <div
      className="App"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Loading />
      <Routes>
        <Route path={`/`} element={<Home totalPic={totalPic.current} />} />
        {arr.map((ele, i) => (
          <Route
            key={i}
            path={`/home/:page`}
            element={<Home totalPic={totalPic.current} />}
          />
        ))}
        {Object.keys(pic).map((ele, i) => (
          <Route
            path={`/${encodeURIComponent(ele)}`}
            element={<Slider name={ele} nowPage={Math.ceil((i + 1) / 15)} />}
            key={ele}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
