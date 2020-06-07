const pool = require("../config/database");

const TABLE_SQL = "bookings";

const getBookings = async () => {
    const [results] = await pool.query(`select * from ${TABLE_SQL}`, []);

    return results;
};

const getBookingsByDate = async (dateStart, dateEnd) => {
    const [results] = await pool.query(`select * from ${TABLE_SQL} where date BETWEEN ? and ?`, [dateStart, dateEnd]);

    return results;
};

const insertBooking = async (idZone, people, title, comments, date) => {
    const [results] = await pool.query(`insert into ${TABLE_SQL} (idZone, people,title, comments, date) values(?,?,?,?,?)`, [idZone, people, title, comments, date]);

    return results;
};

const deleteBookingById = async (id) => {
    const [results] = await pool.query(`delete from ${TABLE_SQL} where id=?`, [id]);

    return results;
}

const updateBookingById = async (id, idZone, people, title, comments, date) => {
    const [results] = await pool.query(`update ${TABLE_SQL} set idZone=?, people=?, title=?, comments=?, date=? where id=?`, [idZone, people, title, comments, date, id]);

    return results;
};

module.exports = {
    getBookings: getBookings,
    getBookingsByDate: getBookingsByDate,
    insertBooking: insertBooking,
    deleteBookingById: deleteBookingById,
    updateBookingById: updateBookingById
}