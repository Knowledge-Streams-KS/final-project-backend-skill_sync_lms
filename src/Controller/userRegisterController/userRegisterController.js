import userRegisterModel from "../../Model/userRegisterModel/userRegisterModel.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import tokenModel from "../../Model/authModel/token.js";

const userRegisterController = {
  signUp: async (req, res) => {
    const payload = req.body;
    try {
      const catchUser = await userRegisterModel.findOne({
        where: {
          email: payload.email,
        },
      });
      if (catchUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashPassword = await hash(payload.password, 10);

      await userRegisterModel.create({
        name: payload.name,
        email: payload.email,
        password: hashPassword,
      });
      res.json({ message: "User registered successfully" });
    } catch (error) {
      console.log("Error is ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await userRegisterModel.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      user = user.toJSON();
      const comparePassword = await compare(password, user.password);
      if (!comparePassword) {
        return res.status(500).json({ message: "Invalid Credentials" });
      }
      // const userData = {
      //     Name:catchUser.Name,
      //     Email:catchUser.Email
      // };

      delete user.Password;

      const token = jwt.sign(user, "asdf12345", {
        expiresIn: "1h",
      });
      console.log(token);
      await tokenModel.create({
        token,
      });

      res.json({ Data: user, token });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};
export default userRegisterController;
