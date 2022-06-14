//Modules
import express from 'express'
import cookieParser from 'cookie-parser'



//Controller
import roomCtrl from '../controllers/room.ctrl.js'
import customerCtrl from '../controllers/customer.ctrl.js'
import adminCtrl from '../controllers/admin.ctrl.js'
import bookingCtrl from '../controllers/booking.ctrl.js'
//Middleware
import auth from '../middlewares/auth.js'
import validate from '../middlewares/validation.js'



const router = express.Router()

router.use(cookieParser())

//Admin Routes
router
.route('/api-admin/signup')
.post(validate.adminSignUp, adminCtrl.signup)

       
router
.route('/api-admin/login')
.post(validate.adminLogin, adminCtrl.login)

router
.route('/api-admin/admin')
.get(auth.admin, (req,res)=>{
    res.json('Welcome')
})

router
.route('/api-admin/logout')
.get(auth.admin, adminCtrl.logout)

router
.route('api-admin/admin/profile')
.post(auth.admin, adminCtrl.profile)
     //Booking Modifications (Admin Only)
router
.route('/api-admin/bookings')
.post(auth.admin, bookingCtrl.bookings)


router
.route('/api-admin/booking')
.get(auth.admin, bookingCtrl.booking)

router
.route('/api-admin/booking/activation')
.post(auth.admin, bookingCtrl.activation)


router
.route('/api-admin/booking/expire/notificaton')
.post(auth.admin, bookingCtrl.senddeactivate)

router
.route('/api-admin/booking/deactivate')
.post(auth.admin, bookingCtrl.deactivate)

     //Room Modifiations (Admin Omly)
router
.route('/api-admin/room/modify')
.post(auth.admin, roomCtrl.modifyRoom)

router
.route('/api-admin/room/trash')
.post(auth.admin, roomCtrl.deleteRoom)

router
.route('/api-admin/add-room')
.post(roomCtrl.addRoom)

//.............................



//Guest Routes
router
.route('/room/available')
.get(roomCtrl.availableRoom)


router
.route('/rooms')
.get( roomCtrl.allRooms)


router
.route('/room')
.post( roomCtrl.searchRoom)

//............................

//User Routes
router
.route('/user/room/book-room')
.get(auth.user, (req,res)=>{
    res.status(200).json('Book room ' + req.user.email)
})
.post(auth.user, roomCtrl.bookRoom)

router
.route('/signup')
.post(validate.userSignUp, customerCtrl.signup)

router
.route('/login')
.post(validate.userLogin, customerCtrl.login)

router
.route('/user/profile')
.post(auth.user, customerCtrl.profile)

router
.route('/user/logout')
.post(customerCtrl.logout)

router
.route('/user/dashboard')
.get(auth.user, (req,res)=>{
    res.json('Welcome')
})


export default router