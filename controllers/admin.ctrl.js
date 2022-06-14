import adminModel from "../models/admin.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import {validationResult} from 'express-validator'

class adminCtrl {
  static signup = async (req, res) => {
    try {

        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const validator = errors.errors.map((err) => err.msg);
        res.status(400).json({ error: validator });
        return; 
      }
      let { fullname, email, password, photo } = req.body;

      const checkEmail = await adminModel.findOne({ email });

      checkEmail &&
        res
          .status(500)
          .json(
            "This email is linked with an Admin Account, Go back and Login"
          );

      password = CryptoJS.AES.encrypt(password, process.env.HASHKEY).toString();

      const newAdmin = await new adminModel({
        fullname,
        email,
        password,
        photo,
      });

      newAdmin = newAdmin.save();
      res.status(200).json("Admin was succesfully Registered");
    } catch (error) {
      console.log(error);
    }
  };
  static login = async (req, res) => {
    try {
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const validator = errors.errors.map((err) => err.msg);
        res.status(400).json({ error: validator });
        return;
      }
      let { email, password } = req.body;

      checkEmail = await adminModel.findOne({ email });
      !email && res.status(500).json("Please Provide a Valid Email");

      decPassword = CryptoJS.AES.decrypt(
        password,
        process.env.HASHKEY
      ).toString(CryptoJS.enc.Utf8);

      decPassword !== password && res.status(500).json("Incorrect Password!!!");

      const adminAuthToken = jwt.sign(
        { email: checkEmail.email },
        process.env.TOKENKEY,
        {
          expiresIn: "30 days",
        }
      );

      res.cookie("adminAuthToken", adminAuthToken, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      console.log("Successfully Login!!!");
      res.redirect("/api-admin/admin");
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      adminEmail = req.admin.email;

      const findAdmin = await adminModel.findOne({ email: adminEmail });

      res.status(500).json(findAdmin);
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      req.cookies.clear;
      return res.clearCookie("adminAuthToken").json("Successfully Logout");
    } catch (error) {
      console.log(error);
    }
  };
}

export default adminCtrl;
