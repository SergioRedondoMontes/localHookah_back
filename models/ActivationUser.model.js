const pool = require("../config/database");

const TABLE_SQL = "activation_users";

const createActivationUser = async (idUser, uuid_activation) => {
    const [results] = await pool.query(`insert into ${TABLE_SQL}(idUser, uuid_activation) values(?,?) ON DUPLICATE KEY UPDATE uuid_activation=?`,[idUser, uuid_activation, uuid_activation]);

    return results;
};

const getActivationUserByUuid = async (uuid_activation) => {
    const [results] = await pool.query(`select * from ${TABLE_SQL} where uuid_activation = ?`, [uuid_activation]);

    return results;
};

const deleteActivationUserById = async (idUser) => {
    const [results] = await pool.query(`DELETE from ${TABLE_SQL} where idUser = ? LIMIT 1`, [idUser]);

    return results;
};

module.exports = {createActivationUser: createActivationUser, getActivationUserByUuid: getActivationUserByUuid, deleteActivationUserById:deleteActivationUserById};