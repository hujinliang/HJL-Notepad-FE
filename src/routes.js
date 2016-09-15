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
        '/test':{
            component:{
                template:'<h1>test</h1>'
            }
        }
    })
}