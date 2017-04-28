import { validator } from 'validator';

$('body').ready(function() {
    $('body').addClass('loaded');
});


// Jquery Validation signIn
$('#signin-button').on('click', validator.validateSignIn);

// Jquery Validation signUp
$('#signup-button').on('click', validator.validateSignUp);