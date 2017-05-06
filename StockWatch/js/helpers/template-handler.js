const HANDLERS_PATH = './content/templates/';

class TemplateHandler {

    getTemplate(templateName) {
        let templatePath = `${HANDLERS_PATH}${templateName}.handlebars`;

        return new Promise((resolve, reject) => {
            $.get(templatePath)
                .done(resolve)
                .fail(reject);
        });
    }

    setTemplate(templateName, targetSelector, dataObject) {
        console.log('working');
        return this.getTemplate(templateName)
            .then(template => {
                let compiledTemplate = Handlebars.compile(template);
                let templateHtml = compiledTemplate(dataObject);
                let $wrappedTemplate = $('<div/>');
                console.log('check');
                $wrappedTemplate.html(templateHtml);
                $(targetSelector).html($wrappedTemplate.html());

                return template;
            }).catch(console.log);
    }

}
const templateHandler = new TemplateHandler();
export { templateHandler };