import { bookRoomModel } from "../models/room.js";

class bookingCtrl {
  static activation = async (req, res) => {
    try {
      const bookingID = req.query.bookingID;

      let findBooking = await bookRoomModel.findOne({ bookingID });

      !findBooking && res.status(500).json("Booking can not be found!!!");
      const today = Date.now();
      findBooking.checkOut < today &&
        res.status(500).json("The CheckOut Date is exceeded");

      findBooking.activation === true &&
        res.status(500).json("Room is already activated");

      await bookRoomModel.findOneAndUpdate(
        { bookingID },
        { activation: true },
        (err) => {
          err && res.json("An error Occur");
          return res.status(200).json("Room is now Activated!!!");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  static senddeactivate = async (req, res) => {
    try {
      today = Date.now();
      const allExpiredBooking = bookRoomModel.findOneAndUpdate(
        { checkOut: today },
        { deactivate: "today" }
      );

      //Then Send Mail Notification for Expiring Today




    } catch (error) {
      console.log(error);
    }
  };

  static deactivate = async (req, res) => {
    try {
      today = Date.now();
      const findBooking = await bookRoomModel.find();

      if (today > findBooking.checkOut) {
        await bookRoomModel.findOneAndUpdate(
          { checkOut: findBooking.checkOut },
          { deactivate: "Exceeded" },
          (err) => {
            err && res.status(500).json("An error Occur");

            res.status(200).json("All Bookings Updated");
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  static bookings = async (req, res) => {
    try {
      const allBooking = await bookRoomModel.find({ deactivate: "" });

      res.status(200).json(allBooking);
    } catch (error) {
      console.log(error);
    }
  };

  static booking = async (req, res) => {
    const bookingID = req.query.bookingID;
    const findBooking = bookRoomModel.findOne({ bookingID });
    !findBooking && res.status(500).json("Booking does not exist!!!");
    return res.status(200).json(findBooking);
  };
}

export default bookingCtrl;
