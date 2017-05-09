import { router } from 'router';

$('body').ready(function () {
    router.start();
    $('body').addClass('loaded');
});
