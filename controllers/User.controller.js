const {hashSync, genSaltSync, compareSync} = require("bcryptjs");
const {sign} = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid")

const {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserByIdIsActive,
    updateUserPasswordById,
    getUsers,
    updateUserById
} = require("../models/User.model");

const {createActivationUser, getActivationUserByUuid, deleteActivationUserById} = require("../models/ActivationUser.model");
const {createRenewPasswordUser, deleteRenewPasswordUser, getRenewIdUser} = require("../models/RenewPasswordUser.model");
const {getIdRolesByIdUser, addIdRoleForIdUser, fullInfoUserById} = require("../models/roleUser.model");

const {registerMail} = require("../mailer/Register.mailer");
const {forgotPasswordMail} = require("../mailer/ForgotPassword.mailer")

const {loginValidator, registerValidator, activateValidator, forgotPasswordValidator, forgotPasswordRenewValidator, editUserValidator} = require("../validators/User.validator");


const login = async (req, res) => {
    const body = req.body;

    const {errors, isValid} = loginValidator(body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const results = await getUserByEmail(body.email);

    if (results.length === 0) {
        return res.json({success: 0, message: "Invalid email or password"});
    }
    const userStored = results[0];

    const resultPasswordCompare = compareSync(body.password, userStored.password);

    if (resultPasswordCompare) {
        if (userStored.isActive === 0) {
            return res.json({
                success: 0,
                message: "user not active"
            });
        } else {
            userStored.password = undefined;
            const roleUserStored = await getIdRolesByIdUser(userStored.id);

            userStored.role = roleUserStored[0].idRole;

            const jsontoken = sign({result: userStored}, process.env.JWT_KEY || "password_temp", {
                expiresIn: process.env.JWT_EXPIRATION
            });
            return res.json({
                success: 1,
                message: "login successfully",
                role: roleUserStored[0].idRole,
                token: jsontoken,
                id: userStored.id
            });
        }
    } else {
        return res.json({
            success: 0,
            message: "Invalid email or password"
        });
    }
};

const register = async (req, res) => {
    const body = req.body;

    const {errors, isValid} = registerValidator(body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    const uuidUser = uuidv4();
    try {
        const results = await createUser(body.email, body.password);
        if (results.affectedRows < 1) {
            return res.status(500).json({
                success: 0,
                message: "internal error"
            })
        }
        const actualInsertId = results.insertId;

        const insertRole = await addIdRoleForIdUser(body.role || 2, actualInsertId);

        const resultsActivation = createActivationUser(actualInsertId, uuidUser);
        if (resultsActivation.affectedRows < 1) {
            return res.status(500).json({
                success: 0,
                message: "internal error"
            })
        }

        await registerMail(body.email, uuidUser);
        return res.json({success: 1, message: "register succesfully"})

    } catch (e) {
        if (e.code === "ER_DUP_ENTRY") {
            return res.json({
                success: 0,
                message: "email duplicated"
            });
        } else {
            console.log(e);
            return res.status(500).json({
                success: 0,
                message: "database error"
            });
        }
    }
};

const activate = async (req, res) => {

    const params = req.params;

    const {errors, isValid} = activateValidator(params);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const results = await getActivationUserByUuid(params.uuid);

    if (results.length === 0) {
        return res.json({success: 0, message: "Invalid uuid"});
    }
    const activationUser = results[0];

    const resultsUser = await getUserById(activationUser.idUser);

    const userStored = resultsUser[0];

    if (userStored.isActive === 1) {
        return res.json({
            success: 0,
            message: "user already active"
        })
    }

    const resultsUpdate = await updateUserByIdIsActive(userStored.id);
    if (resultsUpdate.affectedRows > 0) {
        await deleteActivationUserById(userStored.id);
        return res.json({success: 1, message: "user activated"});

    } else {
        return res.json({success: 0, message: "something wrong"});
    }
};

const forgotPassword = async (req, res) => {
    const body = req.body;

    const {errors, isValid} = forgotPasswordValidator(body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const results = await getUserByEmail(body.email);

    if (results.length === 0) {
        return res.json({success: 0, message: "Invalid email or password"});
    }

    const userStored = results[0];

    if (userStored.isActive === 0) {
        return res.json({success: 0, message: "User not active"});
    }

    const numberRandom = Math.floor(Math.random() * 999999) + 1;
    const strNumberRandomArray = new Array(Math.max(6 - String(numberRandom).length + 1, 0)).join(0) + numberRandom;

    const resultsRenewPassword = await createRenewPasswordUser(userStored.id, strNumberRandomArray);
    if (resultsRenewPassword.affectedRows < 1) {
        return res.status(500).json({
            success: 0,
            message: "internal error"
        });
    } else {
        await forgotPasswordMail(userStored.email, strNumberRandomArray);
        return res.json({success: 1, message: "check your email"});
    }

};

const forgotPasswordRenew = async (req, res) => {
    // email uuid password
    const body = req.body;

    const {errors, isValid} = forgotPasswordRenewValidator(body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const results = await getUserByEmail(body.email);

    if (results.length === 0) {
        return res.json({success: 0, message: "Invalid email or password"});
    }

    const userStored = results[0];

    if (userStored.isActive === 0) {
        return res.json({success: 0, message: "User not active"});
    }

    const userRenew = await getRenewIdUser(userStored.id);

    if (userRenew.length === 0) {
        return res.json({success: 0, message: "Invalid renew email"});
    }

    if (userRenew[0].uuid_renew_password === body.uuid) {
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        const resultsUpdate = await updateUserPasswordById(userStored.id, body.password);

        if (resultsUpdate.affectedRows > 0) {
            await deleteRenewPasswordUser(userStored.id);
            return res.json({success: 1, message: "password changed"});
        } else {
            return res.json({success: 0, message: "something wrong"});
        }
    } else {
        return res.json({success: 0, message: "Invalid renew code"});
    }

};

const profile = async (req, res) => {
    const params = req.params;

    const results = await fullInfoUserById(params.idUser);

    if (results.length === 0) {
        return res.json({success: 0, message: "Invalid uuid"});
    }
    return res.json({success: 1, profile: results[0]})
}

const listUser = async (req, res) => {
    const {role} = req.query;
    const resultUsers = await getUsers(role);

    return res.json({success: 1, users: resultUsers})

}

const editUser = async (req, res) => {
    console.log("B:", req.body);
    const body = req.body;
    console.log("Bo:", body);
    const {errors, isValid} = editUserValidator(body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // id, email, password, isActive
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const result = await updateUserById(body.id, body.email, body.password, body.isActive);

    if (result.affectedRows < 1) {
        return res.status(500).json({
            success: 0,
            message: "internal error"
        })
    }else{
        return res.json({success: 1, message: "User updated"})
    }
}

module.exports = {
    login: login,
    register: register,
    activate: activate,
    forgotPassword: forgotPassword,
    forgotPasswordRenew: forgotPasswordRenew,
    profile: profile,
    listUser: listUser,
    editUser: editUser
};