/**
 * Created by jialao on 2016/9/16.
 */
import {NOTE_DETAIL,ADD_NOTE,DELETE_NOTE,UPDATE_NOTE} from '../types'

const state = {
    items:{}
};

const mutations = {
    [NOTE_DETAIL](state,action){
        state.items = action.data;
    },
    [UPDATE_NOTE](state,action){
        state.items = action.data;
    }
}