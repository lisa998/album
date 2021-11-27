const imageThumbnail = require("image-thumbnail");
const fs = require("fs");
const path = require("path");
const { handleImg } = require("./conn");

const compImg = async (file, percentage, src) => {
  let small = "";
  if (percentage === 25) {
    small = path.join(__dirname, "../../static") + "/" + src;
  } else {
    small =
      path.join(__dirname, "../../static") +
      "/" +
      src.split(".jpg")[0] +
      "_small.jpg";
  }
  try {
    const thumbnail = await imageThumbnail(file, { percentage });
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
  await compImg(file.filepath, 25, src);
  await compImg(file.filepath, 10, src);
  await handleImg.upload({ name, src });
};

module.exports = { compImg, deleteImg, uploadFile };
