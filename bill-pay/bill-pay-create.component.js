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
                <input type="submit" value="Enviar">
            </form>`,
    props: ['bill'],
    data: function() {
        return {
            formType: 'insert',
            names: [
                    'Conta de Luz',
                    'Conta de Água',
                    'Conta de Telefone',
                    'Mercado',
                    'Cartão',
                    'Gasolina'
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
        if(this.$route.name == 'bill.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function() {
            if(this.formType == 'insert'){
                this.$root.$children[0].billsPay.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
            this.$router.go({name: 'bill-pay.list'})
        },
        getBill: function(index){
            this.bill = this.$root.$children[0].billsPay[index];
        }
    }
});
