// SHOULD BE CONNECTED TO FIREBASE
// import firebaseDb from 'firebase-database';

import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';

let logged = false; // after adding db => delete

class HeaderController {
    constructor() {
        this.logged = false;
    }

    initialize() 
    {
        this.updateHeader().then(() => {
            var header = new Headroom(document.querySelector('.navbar-wrapper'), {
                offset: 50,
                tolerance: 2
            });
            header.init();
        });
        htmlHandler.setHtml('footer', '#footer');
    }

    updateHeader() {
        return templateHandler.setTemplate('header', '#header', { isLoggedIn: checkLoggedIn });
    }

    changeLogged(input) { // delete after adding the db
        logged = input;
    }
}

function checkLoggedIn() {
    // firebaseDb.onAuthStateChanged(user => {
    const user = logged;
    if (user) {
        return true;
    } else {
        return false;
    }
    // });
}

const headerController = new HeaderController();

export { headerController };