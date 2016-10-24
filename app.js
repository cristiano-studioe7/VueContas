/**
 * Created by Cristiano on 11/09/2016.
 */
var app = new Vue({
    el: "#app",
    data: {
        title: "Contas à Pagar",
        menus: [
            {id: 0, name:"Listar Contas"},
            {id: 1, name:"Criar Conta"}
        ],
        activedView: 1,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
        },
        names: [
            'Conta de Luz',
            'Conta de Água',
            'Conta de Telefone',
            'Mercado',
            'Cartão',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/08/2016', name: 'Conta de Luz', value: 405.05, done: 1},
            {date_due: '21/08/2016', name: 'Conta de Agua', value: 145, done: 0},
            {date_due: '22/08/2016', name: 'Conta de Telefone', value: 59.99, done: 1},
            {date_due: '24/08/2016', name: 'Mercado', value: 350, done: 0},
            {date_due: '20/08/2016', name: 'Cartão', value: 2599, done: 0}
        ]
    },
    computed: {
        status: function () {
            var c=0;
            for(var i in this.bills){
                c++;
            }
             if(c==0){
                 return "Nenhuma conta cadastrada";
             }else{
                count = this.statusFunction();
                return !count?"Nenhuma conta à pagar":"Existem "+count+" contas à pagar";
             }
        },
        statusClass: function () {
            var c=0;
            for(var i in this.bills){
                c++;
            }
             if(c==0){
                 return "nenhumaConta";
             }else{
                count = this.statusFunction();
                return !count?"nenhumaContaPagar":"algumaContaPagar";
             }
        }
    },
    methods: {
        statusFunction: function () {
            var count =0;
            for (var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            return count;
        },
        showView: function($id){
            this.activedView = $id;
            if($id==1){
                this.formType='insert';
            }
        },
        submit: function(){
            if(this.formType=='insert'){
                this.bills.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            this.activedView = 0;
        },
        loadBill: function(bill){
            this.bill = bill;
            this.activedView = 1;
            this.formType='update';
        },
        deleteBill: function(bill){
            if(confirm("Deseja excluir a conta?")){
                this.bills.$remove(bill);
            }
            this.activedView = 0;
        },
        payBill: function(bill){
            if(confirm("Deseja pagar a conta?")){
                bill.done=1;
            }
            this.activedView = 0;
        },
        NpayBill: function(bill){
            if(confirm("Deseja remover o status de pagamento da conta?")){
                bill.done=0;
            }
            this.activedView = 0;
        },

    }
});

Vue.filter('doneLabel', function(value){
   if(value==0){
       return "Não Paga"
   } else{
       return "Paga"
   }
});