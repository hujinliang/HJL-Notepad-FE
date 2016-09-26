<template>
   <a class="{{item}}" href="javascript:;" @click.stop.prevent="snsLogin(item)">
       <i class="fa fa-{{item}}"></i>
   </a>
</template>
<style>

</style>
<script>
    import {API_ROOT} from '../../config'
    import {getCookie} from '../../utils/authService'
    export default{
        props:{
          item:{
              type:String
          }
        },
        methods:{
            snsLogin(item){
                let search = API_ROOT + '/auth/' + item + '?redirectUrl=' + window.location.origin;
                const token = getCookie('token');
                if (token) {
                    search += '&access_token=' + token.replace(/(^\")|(\"$)/g, '')
                }
                window.location.href = search
            }
        }
    }
</script>
