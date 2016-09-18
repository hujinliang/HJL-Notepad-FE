<template>
    <vue-toast v-ref:toast></vue-toast>
</template>
<script>
    import vueToast from 'vue-toast'
    import { showMsg,hideMsg} from '../../vuex/actions'

    export default {
        components:{vueToast},
        vuex:{
            getters:{
                msg:({showmsg}) => showmsg.message
        },
        actions:{
            showMsg,hideMsg
        }
    },
    watch:{
        'msg':{
            deep:true,
            handler:function(val,oldVal){

                if(val.content !== ''){
                    this.showToaster(val.content,val.type);
                    this.hideMsg()
                }
            }
        }
    },
    methods:{
        showToaster(content,type='error',position='top right'){



            this.$refs.toast.setOptions({maxToasts:3,position:position});
            this.$refs.toast.showToast(content,{
                theme:type,
                timeLife:2000,
                closeBtn:false
            })
        }
    },
    created(){
//            setInterval(function(){this.$refs.toast.setOptions({maxToasts:3,position:'top right'});
//                this.$refs.toast.showToast('Hello World',{
//                    theme:'info',
//                    timeLife:2000,
//                    closeBtn:true
//                })}.bind(this),3000)

    }
    }
</script>
