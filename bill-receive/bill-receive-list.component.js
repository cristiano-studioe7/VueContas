/**
 * Created by Desenvolvimento on 24/11/2016.
 */
window.billReceiveListComponent = Vue.extend({
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
                        <td>{{ o.value | currency 'R$ ' }}</td>
                        <td :class="{'pago': o.done, 'npago' : !o.done}">{{ o.done | doneLabel }}</td>
                        <td>
                            <a v-link="{name: 'bill-receive.update', params:{index: index}}">Editar</a> |
                            <a href="#" @click.prevent="deleteBill(o)">Excluir</a> |
                            <a href="#" @click.prevent="receiveBill(o)" v-if="o.done==0">Receber</a>
                            <a href="#" @click.prevent="NreceiveBill(o)" v-if="o.done==1">Devolver</a>
                        </td>
                    </tr>
                </tbody>
            </table>`,
    data: function () {
        return {
            bills: this.$root.$children[0].billsReceive
        };
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm("Deseja excluir a conta?")) {
                this.$root.$children[0].billsReceive.$remove(bill);
            }
        },
        receiveBill: function (bill) {
            if (confirm("Deseja receber o vencimento?")) {
                bill.done = 1;
            }
            this.activedView = 0;
        },
        NreceiveBill: function (bill) {
            if (confirm("Deseja desfazer o status de pagamento do vencimento?")) {
                bill.done = 0;
            }
            this.activedView = 0;
        }
    }
    });