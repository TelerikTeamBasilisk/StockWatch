import { firebaseDataBase } from 'firebase-database';

class FooterController{

    subscription(){
        let email = $('#newsletter_signup_email').val();
        firebaseDataBase.subscribe(email);
    }
}

let footerController = new FooterController();
export { footerController };