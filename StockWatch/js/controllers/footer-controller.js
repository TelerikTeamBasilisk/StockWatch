import { firebaseDataBase } from 'firebase-database';

class FooterController{

    subscription(){
        let email = $('#newsletter_signup_email').val();
        firebaseDataBase.subscribe(email);
    }

    contact(sammy){
        let name = sammy.params.name;
        let email = sammy.params.email;
        let message = sammy.params.message;

        firebaseDataBase.contact(name, email, message);
        $('.label.label-success').text('success');
        setTimeout(() => {
             sammy.redirect('#/account/marketOverview');
             }, 1500);
    }
}

const footerController = new FooterController();
export { footerController };