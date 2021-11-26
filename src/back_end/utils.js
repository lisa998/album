const imageThumbnail = require("image-thumbnail");
const fs = require("fs");
const path = require("path");
const { handleImg } = require("./conn");

const compImg = async (file, options, src) => {
  try {
    const thumbnail = await imageThumbnail(file, options);
    let small =
      path.join(__dirname, "../../static") +
      "/" +
      src.split(".jpg")[0] +
      "_small.jpg";
    const fd = await fs.openSync(small, "w");
    await fs.writeSync(fd, thumbnail);
    await fs.closeSync(fd);
  } catch (err) {
    return err;
  }
};
const deleteImg = async (img) => {
  let small =
    path.join(__dirname, "../../static") +
    "\\" +
    img.split(".jpg")[0] +
    "_small.jpg";
  await fs.rmSync(path.join(__dirname, "../../static") + "\\" + img);
  await fs.rmSync(small);
};

const uploadFile = async (name, file) => {
  const src = path.basename(file.filepath);
  await compImg(
    file.filepath,
    {
      percentage: 25,
    },
    src
  );
  await handleImg.upload({ name, src });
};

module.exports = { compImg, deleteImg, uploadFile };
