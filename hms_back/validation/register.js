const isEmail= require('validator').isEmail;
const isEmpty= require('validator').isEmpty;
const isLength=require('validator').isLength;

module.exports = function validateRegisterInput(email, password){

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    email = !isEmpty(email) ? email : "";
    password = !isEmpty(password) ?password : "";

    //Name checks
    
    //Email checks
    if(isEmpty(email)){
        errors.email = "Email field is required";
    }else if(!isEmail(email)){
        errors.email = "Email is invalid";
    }

    //Password checks
    if(isEmpty(password)){
        errors.password = "Password field is required";
    }


    if(!isLength(password,{min:6,max:30})){
        errors.password = "Password must be at least 6 characters";
    }

    return{
        errors,
        isValid:isEmpty(errors)
    };

};