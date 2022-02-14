const { handleUser, handleImg } = require("./conn");
const express = require("express");
var cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// 設定密鑰
const SECRET = "thisismynewproject";
var app = express();
const port = 3001;

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://album.shar0.me",
      "http://127.0.0.1:3000",
      "http://192.168.50.217:3000",
    ],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function auth(req, res, next) {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, SECRET);
      handleUser.login(decoded.account, (r) => {
        if (r.length === 1) {
          next();
        } else {
          res.send({
            success: false,
            message: "Unauthorized",
          });
        }
      });
    } catch (err) {
      res.send({
        success: false,
        message: err,
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Unauthorized",
    });
  }
}
app.post("/handleLogin", (req, res) => {
  const { account, psw } = req.body;
  handleUser.login(account, (r) => {
    if (r[0] && bcrypt.compareSync(psw, r[0].dataValues.password)) {
      // 建立 Token
      const token = jwt.sign(
        { account: r[0].dataValues.account.toString() },
        SECRET,
        {
          expiresIn: "1 day",
        }
      );
      res.send(token);
    } else {
      res.send("login fail");
    }
  });
});

app.get("/checkLogIn", auth, (req, res) => {
  res.send("authenticated");
});
app.post("/upload", auth, (req, res) => {
  handleImg.upload(req.body, (r) => {
    res.send("upload success");
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
app.post("/updateName", auth, async (req, res) => {
  await handleImg.updateName(req.body);
  res.send("update success");
});
app.delete("/deleteImg", auth, async (req, res) => {
  await handleImg.deleteImg(req.body.picName, (r) => {
    if (r === 1) {
      res.send("delete success");
    } else {
      res.send("delete fail");
    }
  });
});
app.delete("/deleteAlbum/:name", auth, async (req, res) => {
  handleImg.searchByName(req.params.name, async (r) => {
    await handleImg.deleteAlbum(req.params.name);
    res.send("authenticated");
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
