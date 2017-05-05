class Validator {

    validateSignIn() {
        $('#signin-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5,
                }
            },
            highlight: function(element) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
            // Showing green OK if input is valid
            // success: function (element) {
            //     element.text('OK!').addClass('valid')
            //         .closest('.control-group').removeClass('error').addClass('success');
            // }
        });
    }

    validateSignUp() {
        $('#signup-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5,
                },
                confirmPassword: {
                    equalTo: '#password'
                },
                username: {
                    required: true,
                    minlength: 3,
                }
            },
            highlight: function(element) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
            // Showing green OK if input is valid
            // success: function (element) {
            //     element.text('OK!').addClass('valid')
            //         .closest('.control-group').removeClass('error').addClass('success');
            // }
        });
    }

    validateContactForm() {
        $('#contact-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true,
                    minlength: 3,
                }
            },
            highlight: function(element) {
                $(element).closest('.control-group').removeClass('success').addClass('error');
            },
            // Showing green OK if input is valid
            // success: function (element) {
            //     element.text('OK!').addClass('valid')
            //         .closest('.control-group').removeClass('error').addClass('success');
            // }
        });
    }
}

const validator = new Validator();
export { validator };