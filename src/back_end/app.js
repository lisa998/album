const { handleUser, handleImg } = require("./conn");
const { deleteImg, uploadFile } = require("./utils");
const express = require("express");
var cors = require("cors");
var path = require("path");
var formidable = require("formidable");

var app = express();
const port = 3001;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "../../static")));
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    name: "user",
    saveUninitialized: false,
    resave: true,
  })
);
function auth(req, res, next) {
  if (req.session.user) {
    res.send("authenticated");
    next();
  } else {
    res.send("not authenticated");
  }
}
app.get("/", auth, (req, res) => {
  console.log(req.session.user);
});

app.post("/handleLogin", (req, res) => {
  handleUser.login(req.body, (r) => {
    if (r[0]) {
      req.session.user = r[0].dataValues.account;
      res.send("login success");
    } else {
      res.send("login fail");
    }
  });
});
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout");
});

app.post("/upload", (req, res) => {
  if (req.session.user) {
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
        const tasks = Object.values(files).map((file) =>
          uploadFile(name, file)
        );
        Promise.all(tasks).then(() => {
          res.send("authenticated");
        });
      }
    });
  } else {
    res.send("not authenticated");
  }
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
app.post("/updateName", auth, async (req, res) => {
  await handleImg.updateName(req.body);
  res.json({
    message: "success",
  });
});
app.delete("/deleteImg/:img", auth, async (req, res) => {
  await handleImg.deleteImg(req.params.img);
  await deleteImg(req.params.img);
  res.json({
    message: "delete success",
  });
});
app.delete("/deleteAlbum/:name", auth, async (req, res) => {
  await handleImg.deleteAlbum(req.params.name);
  res.json({
    message: "delete success",
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
