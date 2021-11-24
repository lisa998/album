const { handleUser, handleImg } = require("./conn");
const { deleteImg, uploadFile } = require("./utils");
const express = require("express");
var cors = require("cors");
var path = require("path");
var formidable = require("formidable");

var app = express();
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "../../static")));

app.post("/handleLogin", (req, res) => {
  handleUser.login(req.body, (r) => {
    if (r[0]) {
      res.send("login success");
    } else {
      res.send("login fail");
    }
  });
});

app.post("/upload", (req, res) => {
  var form = new formidable.IncomingForm({ keepExtensions: true });
  form.uploadDir = path.resolve(__dirname, "../../static");
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      console.log(fields);
      console.log(files);
      res.json({
        code: 1,
        err: err,
      });
    } else {
      const name = fields.imgName;
      const tasks = Object.values(files).map((file) => uploadFile(name, file));

      Promise.all(tasks).then(() => {
        res.json({
          message: "success",
          err: err,
        });
      });
    }
  });
});
app.get("/searchPic/:name", (req, res) => {
  handleImg.searchByName(req.params.name, (r) => {
    res.json(r);
  });
});
app.get("/loadAllPic", (req, res) => {
  handleImg.searchAll((r) => {
    res.json(r);
  });
});
app.post("/updateName", async (req, res) => {
  await handleImg.updateName(req.body);
  res.json({
    message: "success",
  });
});
app.delete("/deleteImg/:img", async (req, res) => {
  await handleImg.deleteImg(req.params.img);
  await deleteImg(req.params.img);
  res.json({
    message: "delete success",
  });
});
app.delete("/deleteAlbum/:name", async (req, res) => {
  await handleImg.deleteAlbum(req.params.name);
  res.json({
    message: "delete success",
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
