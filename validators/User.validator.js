const Validator = require("validator");
const isEmpty = require("is-empty");

const loginValidator = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const registerValidator = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};


const activateValidator = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.uuid = !isEmpty(data.uuid) ? data.uuid : "";

    // Email checks
    if (Validator.isEmpty(data.uuid)) {
        errors.uuid = "uuid field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const forgotPasswordValidator = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const forgotPasswordRenewValidator = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.uuid = !isEmpty(data.uuid) ? data.uuid : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.uuid)) {
        errors.uuid = "uuid field is required";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const editUserValidator = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.isActive = !isEmpty(data.isActive) ? data.isActive : "";
    data.id = !isEmpty(data.id) ? data.id : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.isActive)) {
        errors.isActive = "name field is required";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters";
    }

    if (Validator.isEmpty(data.id)) {
        errors.id = "dateStart field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};


module.exports = {
    loginValidator: loginValidator,
    registerValidator: registerValidator,
    activateValidator: activateValidator,
    forgotPasswordValidator: forgotPasswordValidator,
    forgotPasswordRenewValidator: forgotPasswordRenewValidator,
    editUserValidator: editUserValidator
};