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
                {date_due: '20/12/2016', name: 'Conta de Luz', value: 405.05, done: 1},
                {date_due: '21/12/2016', name: 'Conta de Agua', value: 145, done: 0},
                {date_due: '22/12/2016', name: 'Conta de Telefone', value: 59.99, done: 1},
                {date_due: '24/12/2016', name: 'Mercado', value: 350, done: 0},
                {date_due: '20/12/2016', name: 'Cartão', value: 2599, done: 0}
            ],
            billsReceive: [
                {date_due: '20/12/2016', name: 'Salario', value: 2800, done: 0},
                {date_due: '21/12/2016', name: 'Bonus', value: 745, done: 0}
            ]
        };
    }
});

router.map({
    '/bill-pay': {
        name: 'bill-pay',
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
    '/bill-receive': {
        name: 'bill-receive',
        component: billReceiveComponent,
        subRoutes: {
            '/':{
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }
    },
    '/dashboard': {
        name: 'dashboard',
        component: dashboardComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
},'#app');

router.redirect({
    '*': '/dashboard'
});