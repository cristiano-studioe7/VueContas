/**
 * Created by Desenvolvimento on 24/11/2016.
 */
window.billReceiveComponent = Vue.extend({
    components: {
      'menu-component': billReceiveMenuComponent
    },
    template: `<style type="text/css">
        .pago, .nenhumaContaPagar{color:green}
        .npago, .algumaContaPagar{color:red}
        .green{color:green !important}
        .red{color:red !important}
        .gray{color:#d3d3d3 !important;}
    </style>
    <h1>{{ title }}</h1>
        <h3 :class="{'red': status, 'green' : !status, 'gray' : status===false}">{{ status | statusGeneral }}</h3>
        <menu-component></menu-component>
        <router-view></router-view>
        `,
        data: function () {
            return {
                title: "Contas à Receber",
                activedView: 0,
                bill: {
                    date_due: '',
                    name: '',
                    value: 0,
                    done: 0
                },

            };
        },
        computed: {
            status: function () {
                var bills = this.$root.$children[0].billsReceive;
                if (!bills.length) {
                    return false
                }
                var count = 0;
                for (var i in bills) {
                    if (!bills[i].done) {
                        count++;
                    }
                }
                return count;
            }
        }
    });