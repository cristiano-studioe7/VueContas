/**
 * Created by Desenvolvimento on 24/11/2016.
 */
window.billPayCreateComponent = Vue.extend({
    template: `<form @submit.prevent="submit" name="form">
                <label for="">Vencimento:</label> <input type="text" v-model="bill.date_due"><br>
                <label for="">Nome:</label>
                    <select v-model="bill.name">
                        <option v-for="o in names" value="{{ o }}">{{ o }}</option>
                    </select><br>
                <label for="">Valor:</label> <input type="text" v-model="bill.value"><br><br>
                <input type="hidden" v-model="bill.done">
                <input type="hidden" v-model="bill.type">
                <input type="submit" value="Enviar">
            </form>`,
    props: ['bill'],
    data: function() {
        return {
            formType: 'insert',
            names: [
                    'Conta de Luz',
                    'Conta de água',
                    'Conta de telefone',
                    'Supermercado',
                    'Cartão',
                    'Iluminati'
                ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            }
        };
    },
    created: function(){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function() {
            var self = this;
            if(this.formType == 'insert'){
                this.bill.done = 0;
                this.bill.type = 1;
                Bill.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'})
                });
            }else{
                Bill.update({id: this.bill.id}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'})
                });
            }
        },
        getBill: function(id){
            var self = this;
                Bill.get({id: id}).then(function (response) {
                self.bill = response.data;
            });
        }
    }
});
