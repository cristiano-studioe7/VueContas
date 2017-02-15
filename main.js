/**
 * Created by Cristiano on 11/09/2016.
 */
var router = new VueRouter();

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
            '/:id/update': {
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
            '/:id/update': {
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
        'bill-component': billComponent
    }
},'#app');

router.redirect({
    '*': '/dashboard'
});