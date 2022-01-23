require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env["DB_NAME"],
  process.env["DB_USER"],
  process.env["DB_PASS"],
  {
    host: process.env["DB_HOST"],
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: false,
      createdAt: true,
    },
  }
);
async function a() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

a();
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);
const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletehash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);
sequelize.sync({ alter: true });

const handleUser = {
  login: async (account, cb) => {
    let users = await User.findAll({
      where: {
        account,
      },
    });
    cb(users);
  },
};

const handleImg = {
  upload: async (req, cb) => {
    let r = await Image.create({
      id: req.id,
      name: req.name,
      src: req.src,
      deletehash: req.deletehash,
    });
    cb(r);
  },
  searchAll: async (cb) => {
    let r = await Image.findAll({
      attributes: ["src", "name"],
    });
    cb(r);
  },
  searchByName: async (req, cb) => {
    let r = await Image.findAll({
      attributes: ["src"],
      where: { name: req },
    });
    cb(r);
  },
  updateName: async (req) => {
    await Image.update(
      { name: req.newName },
      {
        where: {
          name: req.oldName,
        },
      }
    );
  },
  deleteAlbum: async (req) => {
    await Image.destroy({
      where: {
        name: req,
      },
    });
  },
  deleteImg: async (req, cb) => {
    let r = await Image.destroy({
      where: {
        src: req,
      },
    });
    cb(r);
  },
};
module.exports = { handleUser, handleImg };
