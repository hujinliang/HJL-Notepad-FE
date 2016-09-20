/**
 * Created by jialao on 2016/9/15.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import configRouter from './routes'
import App from './components/App.vue'
import store from './vuex/store'
import * as filters from './utils/filters'
import {sync} from 'vuex-router-sync'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-toast/dist/vue-toast.min.css'


Vue.use(VueRouter);
Vue.use(VueValidator);
Object.keys(filters).forEach(k => {
    Vue.filter(k,filters[k])
})


const router = new VueRouter({
    history:true,
    saveScrollPosition:true,
    suppressTransitionError:true
})

configRouter(router)
sync(store,router)

router.start(Vue.extend(App),'#root');
window.router = router