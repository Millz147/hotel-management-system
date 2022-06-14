
import {check} from 'express-validator'
class Input{

    static email = 
        check("email")
          .isEmail()
          .withMessage("A valid Email is required")
          .notEmpty()
          .withMessage("Email Field is required");
      
      static fullname = 
        check("fullname").notEmpty().withMessage("Fullname is required");
      
      static password = 
        check("password")
          .notEmpty()
          .withMessage("Password field is required")
          .isStrongPassword().withMessage("Please use a Stronger password");
      
      static phone = 
        check("phone")
          .isMobilePhone()
          .withMessage("Please provide a valid Phone Number");
    
      static address = 
        check('address').notEmpty().withMessage("Please provide an address");
      
}

export default Input