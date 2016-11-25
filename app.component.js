/**
 * Created by Desenvolvimento on 24/11/2016.
 */
window.appComponent = Vue.extend({
    components: {
      'menu-component': menuComponent,
      'bill-list-component': billListComponent,
      'bill-create-component': billCreateComponent,
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
        <div v-show="activedView==0">
            <bill-list-component v-ref:bill-list-component></bill-list-component>
        </div>
        <div v-show="activedView==1">
            <bill-create-component :bill.sync="bill"></bill-create-component>
        </div>`,
        data: function () {
            return {
                title: "Contas à Pagar",
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
                var billListComponent = this.$refs.billListComponent;
                if (!billListComponent.bills.length) {
                    return false
                }
                var count = 0;
                for (var i in billListComponent.bills) {
                    if (!billListComponent.bills[i].done) {
                        count++;
                    }
                }
                return count;
            }
        },
        methods: {},
        events: {
            'change-activedview': function (activedView) {
                this.activedView = activedView;
            },
            'change-formtype': function (formType) {
                this.$broadcast('change-formtype', formType);
            },
            'new-bill': function (bill) {
                this.$broadcast('new-bill', bill);
            },
            'change-bill': function (bill) {
                this.$broadcast('change-bill', bill);
            }
        }
    });