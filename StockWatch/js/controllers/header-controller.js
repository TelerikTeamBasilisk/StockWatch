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

    updateHeader() {
        return templateHandler.setTemplate('header', '#header', { isLoggedIn: checkLoggedIn });
    }
}

function checkLoggedIn() {
    firebaseDataBase.onAuthStateChanged(user => {
        if (user) {
            return true;
        } else {
            return false;
        }
    });
}

const headerController = new HeaderController();

export { headerController };