/**
 * Created by Desenvolvimento on 21/12/2016.
 */
window.billComponent = Vue.extend({
   template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a v-link="{name: o.routeName}">{{ o.name }}</a>
            </li>
        </ul>
    </nav>
    <router-view></router-view>
    `,
    data: function (){
       return {
           menus: [
               {name: "Contas á Pagar", routeName: 'bill-pay.list'},
               {name: "Contas á Receber", routeName: 'bill-receive'}
           ]
       }
    }

});