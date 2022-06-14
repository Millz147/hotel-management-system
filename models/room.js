import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomID: {
    type: String,
    unique: true,
    require: true,
  },
  roomType: {
    type: String,
    require: true,
  },
  roomName: {
    type: String,
    require: true,
    unique: true,
  },
  roomDesc: {
    type: String,
    require: true,
  },
  bed: {
    type: String,
    require: true,
  },
  pricePerNight: {
    type: String,
    require: true,
  },
  maxPerson: {
    type: String,
    require: true,
  },
  roomGallery: {
    type: Array,
    require: true,
  },
  roomStatus: {
    type: Boolean,
    require: true,
  },
});

const bookRoomSchema = new Schema({
  bookingID: {
    type: String,
    require: true,
    unique: true,
  },
  lodger: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone:{
      type: Number,
      require: true
  },
  arrival: {
    type: Date,
    require: true,
  },
  checkOut: {
    type: Date,
    require: true,
  },
  totalDays:{
      type:Number,
      require: true
  },
  roomID: {
    type: String,
    require: true,
  },
  roomType:{
type: String,
require: true
  },
  roomName: {
    type: String,
    require: true,
  },
  pricePerNight: {
    type: Number,
    require: true,
  },
  totalPayment: {
    type: Number,
    require: true,
  },
  activation:{
    type: Boolean,
    require: true
  },
  deactivate:{
    type:String
      }
});
const roomModel = mongoose.model("Room", roomSchema);
const bookRoomModel = mongoose.model("Booking", bookRoomSchema);
export {roomModel, bookRoomModel};
