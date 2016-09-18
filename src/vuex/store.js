/**
 * Created by jialao on 2016/9/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import auth from './modules/auth'
import noteDetail from './modules/note.detail'
import noteList from './modules/note.list'
import showmsg from './modules/showmsg'

Vue.use(Vuex)
Vue.config.warnExpressionErrors = false;
Vue.config.debug = true;

export default new Vuex.Store({
    modules:{
        auth,
        noteDetail,
        noteList,
        showmsg
    },
    middlewares
})