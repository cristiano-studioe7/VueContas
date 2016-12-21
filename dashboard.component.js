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
        };
    },
    computed: {
        totalReceive: function () {
            var billsReceive = this.$root.$children[0].billsReceive;

            var totalReceive = 0;
            for (var i in billsReceive) {
                if (billsReceive[i].done) {
                    totalReceive+=billsReceive[i].value;
                }
            }

            return totalReceive;
        },
        totalPay: function () {
            var billsPay = this.$root.$children[0].billsPay;

            var totalPay = 0;
            for (var i in billsPay) {
                if (billsPay[i].done) {
                    totalPay+=billsPay[i].value;
                }
            }

            return totalPay;
        },
        total: function () {
            var a = this.totalReceive,
                b = this.totalPay;
            return a-b;
        }
    }
    });