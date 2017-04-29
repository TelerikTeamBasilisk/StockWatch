function tabs() {
    let template = Handlebars.compile(`
     );

    let content = { 'firsttab': 'dlsajhd', 'secondtab': 'sakjdhsa', 'thirdtab': 'sajldhsak' };

    $('body').prepend(template(content));

    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    })
}

export { tabs };