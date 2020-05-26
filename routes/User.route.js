const router = require("express").Router();
const {checkToken} = require("../auth/TokenValidator");

const {
    login,
    register,
    activate,
    forgotPassword,
    forgotPasswordRenew,
    profile,
    listUser,
    editUser
} = require("../controllers/User.controller");


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authorize user to access
 *     description: Returns a jwt for user
 *     tags:
 *       - users
 *     parameters:
 *       - in: body
 *         name: user
 *         type: object
 *         required:
 *           - email
 *           - password
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: User authorizated
 *         schema:
 *           type: object
 *           properties:
 *             jwt:
 *               type: string
 *               description: token valid
 *       400:
 *         description: User NOT authorizated
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: array
 *               description: errors for incorrect body
 *               items:
 *                 type: string
 *
 */
router.post("/login", login);


router.post("/register", register);


router.get("/activate/:uuid", activate);

router.post("/forgot", forgotPassword);

router.post("/forgot/renew", forgotPasswordRenew);

router.get("/profile/:idUser", profile);

router.get("/", listUser);

router.put("/", editUser);

module.exports = router;