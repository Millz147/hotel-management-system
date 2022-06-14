import jwt from "jsonwebtoken";

class auth {
  static user = async (req, res, next) => {
    try {
      const userToken = await req.cookies.authToken;

      userToken === null && res.status(500).json("Please go back and Login");

      await jwt.verify(userToken, process.env.TOKENKEY, (err, user) => {
        err && res.status(500).json("Invalid Login Info, Please login again");

        req.user = user;
        return next();
      });
    } catch (error) {
      console.log(error);
    }
  };


  static admin = async(req,res,next)=>{

    try {
      const adminToken = await req.cookies.adminAuthToken;

      adminToken === null && res.status(500).json("Please go back and Login");

      await jwt.verify(adminToken, process.env.TOKENKEY, (err, admin) => {
        err && res.status(500).json("Invalid Login Info, Please login again");

        req.admin = admin;
        return next();
      });
    } catch (error) {
      console.log(error);
    }
  };


  }


export default auth;
