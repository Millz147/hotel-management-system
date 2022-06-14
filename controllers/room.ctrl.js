import crypto from "crypto";
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()
const stripe = Stripe(process.env.STRIPEKEY)


import { roomModel, bookRoomModel } from "../models/room.js";
import customerModel from "../models/customer.js";



class roomCtrl {

  static bookRoom = async (req, res) => {
    try {
     

      const roomID = req.query.room;
      let checkRoomAvail = await bookRoomModel.findOne({roomID})
      checkRoomAvail  && res.status(500).json('Room is not available yet')

      let findRoom = await roomModel.findOne({ roomID });
      !findRoom && res.status(500).json("Room Can not be located");

      findRoom.roomStatus == false &&
        res.status(500).json("Room is not available for booking at the moment");

      const user = await customerModel.findOne({ email: req.user.email });
      let { arrival, checkOut, cardNumber, expMonth, expYear,cvc } = req.body;

      arrival = new Date(arrival);
      checkOut = new Date(checkOut);
      const diff = checkOut - arrival;
      const bookingID = "Book-" + crypto.randomInt(10000000);
      const totalDays = diff / (24 * 60 * 60 * 1000);
      let totalPayment = Number(findRoom.pricePerNight) * totalDays;
      let cardPayment = totalPayment * 100
      //Stripe Payment

    //Accept Card
      let cardToken = await stripe.paymentMethods.create(
        {
          type: 'card',
        
        card:{
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc
        }})
      !cardToken && res.status(500).json('Invalid Card')
        
       
      
      let paymentIntent = await stripe.paymentIntents.create({
        payment_method: cardToken.id,
        amount: cardPayment,
        currency:'usd',
        customer: bookingID,
        confirm: true,
        payment_method_types : ['card'],
        
      })
      !paymentIntent && res.status(500).json('Payment not completed')




      
console.log(paymentIntent)

      let newBooking = await new bookRoomModel({
        lodger: user.fullname,
        email: user.email,
        phone: user.phone,
        bookingID,
        arrival,
        checkOut,
        totalDays,
        totalPayment,
        pricePerNight: Number(findRoom.pricePerNight),
        roomName: findRoom.roomName,
        roomType: findRoom.roomType,
        roomID: findRoom.roomID,
        activation: false,
      });

      newBooking = newBooking.save();

      res
        .status(200)
        .json(
          "Booking Was successfull, Present your receipt at the reception for activation"
        );
    } catch (error) {
      console.log(error);
    }
  };

  static availableRoom = async (req, res) => {
    try {
      let openRoom = await roomModel.find({ roomStatus: true });
      !openRoom && res.status(500).json("No Available room yet!!!");

      res.status(200).json(openRoom);
    } catch (error) {
      console.log(error);
    }
  };

  static allRooms = async (req, res) => {
    try {
      let Rooms = await roomModel.find();
      res.status(200).json(Rooms);
    } catch (error) {
      console.log(error);
    }
  };

  static searchRoom = async (req, res) => {
    try {
      const roomID = req.query.search;

      let search = await roomModel.findOne({ roomID });
      search === null && res.status(500).json("Invalid Room Searched!!!");

      search.roomStatus === false &&
        res.status(301).json("Room is not Aavailable for booking" + search);

      res.status(200).json("Room is Available for Booking" + search);
    } catch (error) {
      console.log(error);
    }
  };

  //Room Modifications (Admin Only)
  static addRoom = async (req, res) => {
    try {
      let {
        roomType,
        roomDesc,
        roomName,
        roomGallery,
        bed,
        pricePerNight,
        maxPerson,
      } = req.body;

     
      var roomID = roomType + "-" + crypto.randomInt(10000000);
      const findRoom = await roomModel.findOne({ roomID });
      if (findRoom) {
        findRoom = roomModel.findOne(roomID);
      }

      let newRoom = await new roomModel({
        roomID,
        roomType,
        roomName,
        roomGallery,
        bed,
        pricePerNight,
        maxPerson,
        roomDesc,
        roomStatus: true,
      });

      newRoom = newRoom.save();
      res.status(200).json("Room Successfully Added!!!");
    } catch (error) {
      console.log(error);
      // res.status(500).json(error);
    }
  };
  static modifyRoom = async (req, res) => {
    try {
      const roomID = req.query.roomID;
      await roomModel.findOneAndUpdate({ roomID }, req.body, (err, room) => {
        err && res.status(500).json("Invalid Room Search");
        return res.status(200).json("Successfully Updated" + room);
      });
    } catch (error) {
      console.log(error);
    }
  };
  static deleteRoom = async (req, res) => {
    try {
      const roomID = req.query.roomID;
      const deleteRoom = await roomModel.findOneAndDelete({ roomID });
      !deleteRoom && res.status(500).json("Invalid Room Search");
      return res.status(200).json("Room Successfully Deleted");
    } catch (error) {
      console.log(error);
    }
  };
}

export default roomCtrl;
