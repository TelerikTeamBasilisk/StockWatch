import { userModel } from 'user-model';
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
    }

    updateHeader() {
        return userModel.isUserLoggedIn()
            .then((isLoggedIn) => templateHandler.setTemplate('header', '#header', { isLoggedIn: isLoggedIn }));
    }
}

const headerController = new HeaderController();
export { headerController };