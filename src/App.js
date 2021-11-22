import "./App.css";
import Home from "./component/home/home";
import { Routes, Route } from "react-router-dom";
import Slider from "./component/slider/slider";
import { selectPic } from "./component/home/picSlice";
import { useSelector } from "react-redux";
import { loadAllPic, addAlbum } from "./component/home/picSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const pic = useSelector(selectPic);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllPic()).then((r) =>
      r.payload.map((e) => dispatch(addAlbum({ name: e.name, img: e.src })))
    );
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {Object.keys(pic).map((ele) => (
          <Route
            path={`/${encodeURIComponent(ele)}`}
            element={<Slider name={ele} />}
            key={ele}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
