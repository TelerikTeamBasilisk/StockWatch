import { firebaseDataBase } from 'firebase-database';

class FooterController {

    subscription() {
        let $inputEmail = $('#newsletter_signup_email');
        let email = $inputEmail.val();
        if (!firebaseDataBase.subscribe(email)) {
            let $subscribe = $('.subscribe-text');
            let subscribeText = $subscribe.html();

            $subscribe.text('The email address is already subscribed.');

            setTimeout(() => {
                $inputEmail.val('');
                $subscribe.html(subscribeText);
            }, 2000);
        }
    }

    contact(sammy) {
        let name = sammy.params.name;
        let email = sammy.params.email;
        let message = sammy.params.message;

        firebaseDataBase.contact(name, email, message);
        $('.label.label-success').text('success');
        setTimeout(() => {
            sammy.redirect('#/account/market-overview');
        }, 1500);
    }
}

const footerController = new FooterController();
export { footerController };