/**
 * Created by Desenvolvimento on 21/12/2016.
 */
window.dashboardComponent = Vue.extend({
    components: {
      'menu-component': billComponent
    },
    template: `
    <h1>{{ title }}</h1>
        <dashboard-component></dashboard-component>
        Total Receita: {{ totalReceive | currency 'R$ ' }} <br>
        Total Contas: {{ totalPay | currency 'R$ ' }} <br>
        Saldo: {{ total | currency 'R$ ' }} 
        `,
    data: function () {
        return {
            title: "Dashboard",
            totalPay: 0,
            totalReceive: 0,
            total: 0
        };
    },
    created: function () {
      this.calcTotal();
    },methods: {
        calcTotal: function () {
            var self = this;
            Bill.total({type: 2}).then(function (response) {
                self.totalReceive = response.data.total;
            });
             Bill.total({type: 1}).then(function (response) {
                self.totalPay = response.data.total;
            });
        }
    },
      computed: {
        total: function () {
           return this.totalReceive - this.totalPay;
        }
      }
});