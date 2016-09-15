/**
 * Created by jialao on 2016/9/15.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import configRouter from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    history:true,
    _saveScrollPosition:true,
    suppressTransitionError:true
})

configRouter(router)

router.start(Vue.extend({}),'#root');
window.router = router