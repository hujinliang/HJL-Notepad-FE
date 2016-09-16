/**
 * Created by jialao on 2016/9/16.
 */
import cookie from 'react-cookie'
import {CookieDomain} from '../config'
let cookieConfig = {}

export function saveCookie(name,value){
    cookie.save(name,value,cookieConfig)
}

export function getCookie(name){
    cookie.load(name)
}

export function removeCookie(name){
    cookie.remove(name,cookieConfig)
}

export function signOut(){
    cookie.remove('token',cookieConfig)
}

export function isLogin(){
    return !!cookie.load('token')
}