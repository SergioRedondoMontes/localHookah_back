const pool = require("../config/database");

const TABLE_SQL = "users";

const createUser = async (email, password) => {
    const [results] = await pool.query(`insert into ${TABLE_SQL}(email, password) values(?,?)`, [email, password]);

    return results;
};

const getUserByEmail = async (email) => {
    const [results] = await pool.query(`select * from ${TABLE_SQL} where email = ?`, [email]);

    return results;
};

const getUserById = async (id) => {
    const [results] = await pool.query(`select * from ${TABLE_SQL} where id = ?`, [id]);

    return results;
};

const updateUserByIdIsActive = async (id) => {
    const [results] = await pool.query(`update ${TABLE_SQL} set isActive = 1 where id = ?`, [id]);

    return results;
};

const updateUserById = async (id, email, password, isActive) => {
    const [results] = await pool.query(`update ${TABLE_SQL} set email=?, password=?, isActive = ? where id = ?`, [email, password, isActive, id]);

    return results;
};

const updateUserPasswordById = async (id, password) => {
    const [results] = await pool.query(`update ${TABLE_SQL} set password=? where id = ?`, [password, id]);

    return results;
};

const getUsers = async (idRole) => {

    let data = [];
    if(idRole === undefined){
        const [results] = await pool.query(`select * from ${TABLE_SQL} inner join roles_users on roles_users.idUser = users.id`, [idRole]);
        data = results;
    }else{
        const [results] = await pool.query(`select * from ${TABLE_SQL} inner join roles_users on roles_users.idUser = users.id where idRole = ?`, [idRole]);
        data = results;
    }

    return data;
}


module.exports = {
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    createUser: createUser,
    updateUserByIdIsActive: updateUserByIdIsActive,
    updateUserById: updateUserById,
    updateUserPasswordById: updateUserPasswordById,
    getUsers: getUsers
};
