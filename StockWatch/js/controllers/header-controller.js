import { userModel } from 'user-model';
import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';

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
        return userModel.isUserLoggedIn()
            .then((isLoggedIn) => templateHandler.setTemplate('header', '#header', { isLoggedIn: isLoggedIn }));
    }
}

const headerController = new HeaderController();
export { headerController };