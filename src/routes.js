/**
 * Created by jialao on 2016/9/15.
 */
export default function(router){
    router.map({
        '/':{
            name:'home',
            component:{
                template:'<p>home</p>'
            }
            
        },
        '/login':{
            name:'login',
            component:{
                template:'<p>login</p>'
            }
        },
        '/note/:nid':{
            name:'note',
            component:{
                template:'<p>note</p>'
            }
        },
        '*': {
            name:'nofound',
            component:require('./components/NotFound.vue')
        }
    })
}