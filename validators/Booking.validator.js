const Validator = require("validator");
const isEmpty = require("is-empty");

const bookingValidator = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions

    data.date = !isEmpty(data.date) ? data.date : "";
    data.people = !isEmpty(data.people) ? data.people : "";
    data.zone = !isEmpty(data.zone) ? data.zone : "";
    data.comments = !isEmpty(data.comments) ? data.comments : "";
    data.title = !isEmpty(data.title) ? data.title : "";


    if (Validator.isEmpty(data.people)) {
        errors.people = "people field is required";
    }
    if (Validator.isEmpty(data.date)) {
        errors.date = "date field is required";
    }
    if (Validator.isEmpty(data.zone)) {
        errors.zone = "zone field is required";
    }
    if (Validator.isEmpty(data.comments)) {
        errors.comments = "comments field is required";
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = "title field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = {
    bookingValidator: bookingValidator
}