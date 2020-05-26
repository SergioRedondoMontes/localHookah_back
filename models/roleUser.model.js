const pool = require("../config/database");

const TABLE_SQL = "roles_users";

const getIdRolesByIdUser = async (idUser) => {
    const [results] = await pool.query(`select idRole from ${TABLE_SQL} where idUser = ?`, [idUser]);

    return results;
};

const addIdRoleForIdUser = async (idRole, idUser) => {
    const [results] = await pool.query(`insert into ${TABLE_SQL}(idUser, idRole) values(?,?)`, [idUser, idRole]);

    return results;

}

const fullInfoUserById = async (idUser) => {
    const [results] = await pool.query(`select email, roles.name as role
                                        from roles_users
                                                 INNER join roles on roles.id = roles_users.idRole
                                                 INNER join users on users.id = roles_users.idUser
                                        where idUser = ?`, [idUser]);

    return results;
}

module.exports = {
    getIdRolesByIdUser: getIdRolesByIdUser,
    addIdRoleForIdUser: addIdRoleForIdUser,
    fullInfoUserById: fullInfoUserById
}