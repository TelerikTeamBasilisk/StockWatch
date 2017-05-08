import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';
import { userModel } from 'user-model';

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
        return templateHandler.setTemplate('header', '#header', { isLoggedIn: userModel.isUserLoggedIn() });
    }
}

const headerController = new HeaderController();

export { headerController };