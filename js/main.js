import { router } from '../configs/sammy-config.js';

$('body').ready(function () {
    router.start();
    $('body').addClass('loaded');
});