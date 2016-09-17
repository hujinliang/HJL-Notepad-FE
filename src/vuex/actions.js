/**
 * Created by jialao on 2016/9/16.
 */
import api from '../api'
import * as types from './types'
import {saveCookie,signOut } from '../utils/authService'

export const logout = ({dispatch,router}) => {
    signOut();
    dispatch(types.LOGOUT_USER);
    window.location.pathname = '/login'
};

export const showMsg = ({dispatch},content,type='error') => {
    
    dispatch(types.SHOW_MSG,{content:content,type:type})
}

export const hideMsg = ({dispatch}) => {
    
    dispatch(types.HIDE_MSG)
}

export const getUserInfo = ({dispatch}) => {
    api.getMe().then(response => {
        if(!response.ok){
            console.log('登录失败')
        }
        dispatch(types.USERINFO_SUCCESS,{user:response.data})
    })
}

export const localLogin = (store,userInfo) => {
    api.localLogin(userInfo).then(response => {
        if(!response.ok){
            return showMsg(store,response.data.error_msg || '登录失败')
        }
        const token = response.data.token;
        saveCookie('token',token);
        // getUserInfo(store)
        store.dispatch(types.LOGIN_SUCCESS,{token:token});
        showMsg(store,'登录成功','success');
        store.router.go({path:'/'})

    }).catch(error => {
        console.log(error)
        return showMsg(store,error.data.error_msg)
    })
}

export const getNoteList = (store) => {
    api.getNoteList().then(response => {
        const json = response.data;
        store.dispatch(types.NOTE_LIST,{data:json.data})
    }).catch(response => {
        console.log('获取note列表错误')
    })
}

export const getNoteDetail = (store,id) => {
    api.getNoteDetail(id).then(response => {
        store.dispatch(types.NOTE_DETAIL,{data:response.data.data})
    }).catch(response => {
        showMsg(store,response.data.error_msg || '获取失败')
    })
}

export const addNote = (store,data) =>{
    api.addNote(data).then(response => {
        store.dispatch(types.ADD_NOTE,{data:response.data.data})
    }).catch(response => {
        showMsg(store,resposne.data.error_msg || '获取失败')
    })
}

export const updateNote = (store,data) => {
    api.updateNote(data).then(response => {
        store.dispatch(types.UPDATE_NOTE,{data:response.data.data})
    }).catch(response => {
        showMsg(store,resposne.data.error_msg || '获取失败')
    })
}

export const deleteNote = (store,id,index) => {
    api.deleteNote(id).then(response => {
        store.dispatch(types.DELETE_NOTE,{index:index})
    }).catch(response => {
        showMsg(store,resposne.data.error_msg || '获取失败')
    })
}