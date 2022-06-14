import customerModel from "../models/customer.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import {validationResult} from 'express-validator'

class customerCtrl {
  static signup = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const validator = errors.errors.map((err) => err.msg);
        res.status(400).json({ error: validator });
        return;
      }

      let { fullname, email, phone, address, photo } = req.body;
      let hashPassword = req.body.password;

      const findEmail = await customerModel.findOne({ email });

      if (findEmail) {
        return res
          .status(500)
          .json("Email already exist, Please go back and Login");
      }
      phone = Number(phone);
      let password = CryptoJS.AES.encrypt(
        hashPassword,
        process.env.HASHKEY
      ).toString();

      let newCustomer = await new customerModel({
        fullname,
        email,
        password,
        phone,
        address,
        photo,
      });

      newCustomer = newCustomer.save();
      res.status(200).json("Customer was successfully registered");
    } catch (error) {
      console.log(error);
    }
  };
  static login = async (req, res) => {
    try {
      let { email, password } = req.body;

      const findEmail = await customerModel.findOne({ email });
      !findEmail &&
        res.status(500).json("Email is not allocated to any customer");

      const encPassword = CryptoJS.AES.decrypt(
        findEmail.password,
        process.env.HASHKEY
      ).toString(CryptoJS.enc.Utf8);
      encPassword !== password &&
        res.status(500).json("Password is incorrect!!!");

      const authToken = jwt.sign(
        { email: findEmail.email },
        process.env.TOKENKEY,
        {
          expiresIn: "30 days",
        }
      );

      res.cookie("authToken", authToken, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      console.log("User successfully login");
      return res.redirect("/user/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
     userEmail = req.user.email;

      const findUser = await customerModel.findOne({ email: userEmail });

      res.status(500).json(findUser);
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      req.cookies.clear;
      return res.clearCookie("authToken").json("Successfully Logout");
    } catch (error) {
      console.log(error);
    }
  };
}

export default customerCtrl;
