/**
 * Created by jialao on 2016/9/16.
 */
import {LOGIN_SUCCESS,USERINFO_SUCCESS,LOGOUT_USER} from '../types'
import {getCookie} from '../../utils/authService';

const state = {
    token: getCookie('token') || null,
    user:null
};

const mutations = {
    [LOGIN_SUCCESS](state,action){
        state.token = action.token;

        console.log(state.token)

    },
    [USERINFO_SUCCESS](state,action){
        state.user = action.user;
    },
    [LOGOUT_USER](state,action){    
        state.token = null;
        state.user = null;
    }
};

export default {
    state,mutations
}