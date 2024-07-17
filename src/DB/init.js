import sequelize from "./config.js";
import userRegisterModel from "../Model/userRegisterModel/userRegisterModel.js";

const syncDB = async () => {
  await sequelize.sync({ alter: true, force: false });
  await userRegisterModel.sync({ alter: true, force: false });
};

export default syncDB;
