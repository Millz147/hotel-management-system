import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
  },
});

const customerModel = mongoose.model("Customer", customerSchema);

export default customerModel;
