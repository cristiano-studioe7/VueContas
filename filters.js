/**
 * Created by Desenvolvimento on 24/11/2016.
 */
Vue.filter('doneLabel', function (value) {
    if (value == 0) {
        return "Não Paga"
    } else {
        return "Paga"
    }
});
Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma Conta Cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar";
    } else {
        return "Existem " + value + " contas a serem pagas";
    }
});