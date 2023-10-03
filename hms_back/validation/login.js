const isEmail= require('validator').isEmail;
const isEmpty= require('validator').isEmpty;
const isLength=require('validator').isLength;

module.exports = function validateLoginInput(data){

    let errors = {};

    data.emailid = !isEmpty(data.emailid) ? data.emailid : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //Email checks
    if(isEmpty(data.emailid)){
        errors.email = "Email field is required";
    } else if(!isEmail(data.emailid)){
        errors.email = "Email is invalid";
    }

    //Password checks
    if(isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};
