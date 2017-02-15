/**
 * Created by Desenvolvimento on 03/01/2017.
 */
Vue.http.options.root = 'http://192.168.10.10:8000/api';
window.Bill = Vue.resource('bills{/type}{/id}', {}, {
    total: {method: 'GET', url: 'bills/total{/type}'},
    billsPay: {method: 'GET', url: 'bills/type/1'},
    billsReceive: {method: 'GET', url: 'bills/type/2'}
});