const pool = require("../config/database");

const TABLE_SQL = "zones";

const getZones = async () => {
    const [results] = await pool.query(`select * from ${TABLE_SQL}`, []);

    return results;
};

module.exports = {
    getZones: getZones
}