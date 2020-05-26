const pool = require("../config/database");

const TABLE_SQL = "roles";

const getRoles = async () => {
    const [results] = await pool.query(`select * from ${TABLE_SQL}`, []);

    return results;
};

module.exports = {
    getRoles: getRoles
}
