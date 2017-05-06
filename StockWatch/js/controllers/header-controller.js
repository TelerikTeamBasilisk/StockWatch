import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';
import { firebaseDataBase } from 'firebase-database';

class HeaderController {

    initialize() {
        this.updateHeader().then(() => {
            var header = new Headroom(document.querySelector('.navbar-wrapper'), {
                offset: 50,
                tolerance: 2
            });
            header.init();
        });
        htmlHandler.setHtml('footer', '#footer');
    }

     checkLoggedIn() {
        firebaseDataBase.onAuthStateChanged(user => {
            if (user) {
                return true;
            } else {
                return false;
            }
        });
    }
    updateHeader() {
        console.log('working');
        return templateHandler.setTemplate('header', '#header', { isLoggedIn: this.checkLoggedIn() });
    }
}

const headerController = new HeaderController();

export { headerController };