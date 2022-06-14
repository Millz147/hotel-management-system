import Input from "./inputs.js";

class validate {
  static userSignUp = [
    Input.email,
    Input.password,
    Input.fullname,
    Input.phone,
    Input.address,
  ];

  static userLogin = [Input.email, Input.password];
  static adminSignUp = [
    Input.email,
    Input.password,
    Input.fullname,
  ];

  static adminLogin = [Input.email, Input.password];
}

export default validate;
