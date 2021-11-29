const imageThumbnail = require("image-thumbnail");
const fs = require("fs");
const path = require("path");
const { handleImg } = require("./conn");

const compImg = async (file, percentage, src) => {
  let filepath = path.join(__dirname, "../../static") + "/" + src;
  try {
    const thumbnail = await imageThumbnail(file, { percentage });
    const fd = await fs.openSync(filepath, "w");
    await fs.writeSync(fd, thumbnail);
    await fs.closeSync(fd);
  } catch (err) {
    return err;
  }
};
const deleteImg = async (img) => {
  await fs.rmSync(path.join(__dirname, "../../static") + "\\" + img);
};

const uploadFile = async (name, file) => {
  const src = path.basename(file.filepath).toLowerCase();
  await compImg(file.filepath, 25, src);
  await handleImg.upload({ name, src });
};

module.exports = { compImg, deleteImg, uploadFile };
