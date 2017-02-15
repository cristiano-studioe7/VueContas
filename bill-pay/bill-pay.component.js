/**
 * Created by Desenvolvimento on 24/11/2016.
 */
window.billPayComponent = Vue.extend({
    components: {
      'menu-component': billPayMenuComponent
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
        <h3>{{ total | currency 'R$ '}}</h3>
        <menu-component></menu-component>
        <router-view></router-view>
        `,
        data: function () {
            return {
                title: "Contas à Pagar",
                status: false,
                total: 0
            };
        },
        created: function () {
          this.updateStatus();
          this.updateTotal();
        },
        methods: {
            calculateStatus: function (bills) {
                if (!bills.length) {
                    this.status = false;
                }
                var count = 0;
                for (var i in bills) {
                    if (!bills[i].done) {
                        count++;
                    }
                }
                this.status = count;
            },
            updateStatus: function () {
                var self = this;
                Bill.billsPay().then(function (response) {
                    self.calculateStatus(response.data);
                })
            },
            updateTotal: function(){
                var self = this;
                Bill.total({type: 1}).then(function (response) {
                    self.total = response.data.total;
                })
            }
        },
        events: {
            'change-info': function () {
                this.updateStatus();
                this.updateTotal();
            }
        }
    });