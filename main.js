/**
 * Created by Cristiano on 11/09/2016.
 */
var router = new VueRouter();

router.map({
    '/bills':{
        component: billListComponent
    },
    'bill/create': {
        component: billCreateComponent
    }
})


Vue.component('app-component', appComponent);
var app = new Vue({
    el: "#app",
});
