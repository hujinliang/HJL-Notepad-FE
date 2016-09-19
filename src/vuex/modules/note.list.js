/**
 * Created by jialao on 2016/9/16.
 */
import {NOTE_LIST,ADD_NOTE,DELETE_NOTE} from '../types'

const state = {
    items:[]
};

const mutations = {
    [NOTE_LIST](state,actions){
        state.items = actions.data
    },
    [ADD_NOTE](state,action){
        state.items = [...state.items,action.data]
    },
    [DELETE_NOTE](state,action){
        state.items.splice(action.index,1);
    }
}

export default {
    state,mutations
}