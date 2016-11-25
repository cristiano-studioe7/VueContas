/**
 * Created by Desenvolvimento on 24/11/2016.
 */
window.billListComponent = Vue.extend({
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
                    <tr v-for="(i, o) in bills">
                        <td>{{ i+1 }}</td>
                        <td>{{ o.date_due }}</td>
                        <td>{{ o.name }}</td>
                        <td>{{ o.value | currency 'R$' }}</td>
                        <td :class="{'pago': o.done, 'npago' : !o.done}">{{ o.done | doneLabel }}</td>
                        <td>
                            <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                            <a href="#" @click.prevent="deleteBill(o)">Excluir</a> |
                            <a href="#" @click.prevent="payBill(o)" v-if="o.done==0">Pagar</a>
                            <a href="#" @click.prevent="NpayBill(o)" v-if="o.done==1">Estornar</a>
                        </td>
                    </tr>
                </tbody>
            </table>`,
    data: function () {
        return {
            bills: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 405.05, done: 1},
                {date_due: '21/08/2016', name: 'Conta de Agua', value: 145, done: 0},
                {date_due: '22/08/2016', name: 'Conta de Telefone', value: 59.99, done: 1},
                {date_due: '24/08/2016', name: 'Mercado', value: 350, done: 0},
                {date_due: '20/08/2016', name: 'Cartão', value: 2599, done: 0}
            ]
        };
    },
    computed: {

    },
    methods: {
        loadBill: function (bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedview', 1);
            this.$dispatch('change-formtype', 'update');
        },
        deleteBill: function (bill) {
            if (confirm("Deseja excluir a conta?")) {
                this.bills.$remove(bill);
            }
            this.activedView = 0;
        },
        payBill: function (bill) {
            if (confirm("Deseja pagar a conta?")) {
                bill.done = 1;
            }
            this.activedView = 0;
        },
        NpayBill: function (bill) {
            if (confirm("Deseja remover o status de pagamento da conta?")) {
                bill.done = 0;
            }
            this.activedView = 0;
        }
    },
    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
    });