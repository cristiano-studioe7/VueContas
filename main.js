/**
 * Created by Cristiano on 11/09/2016.
 */
var router = new VueRouter();

var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function(){
        return {
            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 405.05, done: 1},
                {date_due: '21/08/2016', name: 'Conta de Agua', value: 145, done: 0},
                {date_due: '22/08/2016', name: 'Conta de Telefone', value: 59.99, done: 1},
                {date_due: '24/08/2016', name: 'Mercado', value: 350, done: 0},
                {date_due: '20/08/2016', name: 'Cartão', value: 2599, done: 0}
            ]
        };
    }
});

router.map({
    '/bill-pay': {
        component: billPayComponent,
        subRoutes: {
            '/':{
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            }
        }
    },
    'bill-receive': {
        name: 'bill-receive',
        component: billReceiveComponent
    },
    '*': {
        component: billPayListComponent
    }
});


router.start({
    components: {
        'main-component': mainComponent
    }
},'#app')

router.redirect({
    '*': '/bill-pay'
});