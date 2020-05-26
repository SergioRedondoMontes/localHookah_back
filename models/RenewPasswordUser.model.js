const pool = require("../config/database");

const TABLE_SQL = "renew_password_users";

const createRenewPasswordUser = async (idUser, uuid_renew_password) => {
    const [results] = await pool.query(`insert into ${TABLE_SQL}(idUser, uuid_renew_password) values(?,?) ON DUPLICATE KEY UPDATE uuid_renew_password=?`, [idUser, uuid_renew_password, uuid_renew_password]);

    return results;
};

const getRenewPasswordUser = async (uuid_renew_password) => {
    const [results] = await pool.query(`select * from ${TABLE_SQL} where uuid_renew_password = ?`, [uuid_renew_password]);

    return results;
};

const getRenewIdUser = async (idUser) => {
    const [results] = await pool.query(`select * from ${TABLE_SQL} where idUser = ?`, [idUser]);

    return results;
};

const deleteRenewPasswordUser = async (idUser) => {
    const [results] = await pool.query(`DELETE from ${TABLE_SQL} where idUser = ? LIMIT 1`, [idUser]);

    return results;
};

module.exports = {
    createRenewPasswordUser: createRenewPasswordUser,
    getRenewPasswordUser: getRenewPasswordUser,
    deleteRenewPasswordUser: deleteRenewPasswordUser,
    getRenewIdUser: getRenewIdUser
};