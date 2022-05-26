import { postMessage, navigateTo, registerEvent, request, registerComponent } from './jsphere.js';

function Viewport(component) {
    
    component.markup(``);
    
    component.init((view) => {
        view.load = async function (uri) {
            if (typeof uri != 'string') throw 'uri: Invalid property value';
            if (uri === component.getAttribute('data-uri')) return;
            try {
                const response = await fetch(uri);
                markup = await response.text();
            }
            catch (e) {
                console.log(e);
            }
            component.setAttribute('data-uri', uri);
            component.markup(markup);
        };

        markup = function (markup) {
            component.markup(markup);
        };
    });
}
registerComponent('viewport', Viewport);

