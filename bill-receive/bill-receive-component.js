/**
 * Created by Desenvolvimento on 21/12/2016.
 */
window.billReceiveComponent = Vue.extend({
    /*components: {
      'menu-component': billPayMenuComponent
    },*/
    template: `
    <h1>{{ title }}</h1>        
        `,
    data: function () {
        return {
            title: "Contas à Receber"
        };
    }

    });