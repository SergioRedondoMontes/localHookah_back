const router = require("express").Router();
const {checkToken} = require("../auth/TokenValidator");

const {listZones, listBookings, listBookingsDate, createBooking, deleteBooking} = require("../controllers/Booking.controller");


router.get("/zones", listZones);
router.get("/", listBookings);
router.get("/date", listBookingsDate);
router.post("/", createBooking);
router.delete("/:idBooking", deleteBooking);


module.exports = router;