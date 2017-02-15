/**
 * Created by Desenvolvimento on 24/11/2016.
 */
window.billPayListComponent = Vue.extend({
    template: `<table border="1px" cellpadding="5px">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Vencimento</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Paga</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(index, o) in bills">
                        <td>{{ index+1 }}</td>
                        <td>{{ o.date_due }}</td>
                        <td>{{ o.name }}</td>
                        <td>{{ o.value | currency 'R$' }}</td>
                        <td :class="{'pago': o.done, 'npago' : !o.done}">{{ o.done | doneLabel }}</td>
                        <td>
                            <a v-link="{name: 'bill-pay.update', params:{id: o.id}}">Editar</a> |
                            <a href="#" @click.prevent="deleteBill(o)">Excluir</a> |
                            <a href="#" @click.prevent="payBill(o)" v-if="o.done==0">Pagar</a>
                            <a href="#" @click.prevent="NpayBill(o)" v-if="o.done==1">Estornar</a>
                        </td>
                    </tr>
                </tbody>
            </table>`,
    data: function () {
        return {
            bills: []
        };
    },
    created: function(){
        var self = this;
        Bill.billsPay().then(function (response) {
            self.bills = response.data;
        })
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Deseja excluir a conta?")) {
                var self = this;
                Bill.delete({id: bill.id}).then(function(response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        },
        payBill: function (bill) {
            if (confirm("Deseja pagar a conta?")) {
                bill.done = 1;
                var self = this;
                Bill.update({id: bill.id}, bill).then(function (response) {
                    self.$dispatch('change-info');
                });
            }
        },
        NpayBill: function (bill) {
            if (confirm("Deseja remover o status de pagamento da conta?")) {
                bill.done = 0;
                var self = this;
                Bill.update({id: bill.id}, bill).then(function (response) {
                    self.$dispatch('change-info');
                });
            }

        }
    }
    });