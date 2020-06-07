const {getZones} = require("../models/Zone.model");

const {getBookings, getBookingsByDate, insertBooking, deleteBookingById, updateBookingById} = require("../models/Booking.model");

const {bookingValidator} = require("../validators/Booking.validator")

const listZones = async (req, res) => {
    const results = await getZones();

    return res.json({success: 1, zones: results});
}

const listBookings = async (req, res) => {
    const results = await getBookings();

    return res.json({success: 1, bookings: results});
}

const listBookingsDate = async (req, res) => {
    const {date} = req.query

    if (date === undefined) {
        return res.json({success: 0, message: "date not found"})
    }

    const dateFirst = new Date(date);
    const dateNext = new Date(dateFirst);
    dateNext.setDate(dateNext.getDate() + 1);


    const results = await getBookingsByDate(dateFirst, dateNext);

    return res.json({success: 1, bookings: results});
}

const createBooking = async (req, res) => {

    const body = req.body;

    const {errors, isValid} = bookingValidator(body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const result = await insertBooking(body.zone, body.people, body.title, body.comments, body.date);
    console.log("T:", result);
    if (result.affectedRows > 0) {
        return res.json({success: 1, message: "inserted correctly", id: result.insertId});
    } else {
        return res.json({success: 0, message: "something wrong"});
    }
}

const deleteBooking = async (req, res) => {
    const {idBooking} = req.params;

    if (idBooking === undefined) {
        return res.json({success: 0, message: "id not found"})
    }

    const result = await deleteBookingById(idBooking);

    if (result.affectedRows > 0) {
        return res.json({success: 1, message: "deleted correctly"});
    } else {
        return res.json({success: 0, message: "something wrong"});
    }
}

const updateBooking = async (req, res) => {
    const {idBooking} = req.params;

    if (idBooking === undefined) {
        return res.json({success: 0, message: "id not found"})
    }
    const body = req.body;

    const {errors, isValid} = bookingValidator(body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const result = await updateBookingById(idBooking, body.zone, body.people, body.title, body.comments, body.date);

    if (result.affectedRows > 0) {
        return res.json({success: 1, message: "inserted correctly"});
    } else {
        return res.json({success: 0, message: "something wrong"});
    }

}


module.exports = {
    listZones: listZones,
    listBookings: listBookings,
    listBookingsDate: listBookingsDate,
    createBooking: createBooking,
    deleteBooking: deleteBooking,
    updateBooking: updateBooking
}