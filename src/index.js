/**
 * Created by jialao on 2016/9/15.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import configRouter from './routes'
import App from './components/App.vue'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)

const router = new VueRouter({
    history:true,
    _saveScrollPosition:true,
    suppressTransitionError:true
})

configRouter(router)

router.start(Vue.extend(App),'#root');
window.router = router