<template>
    <div class="login-box">
        <div class="logo">
            <img src="../../assets/images/favicon.jpg">
        </div>
        <div class="loginForm">
            <div class="form-container">
                <validator name="loginValidation">
                    <form class="login-form form-horizontal" @submit.prevent="login($loginValidation)" novalidate>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-envelope-o"></i></div>
                                <input v-model="user.email" v-validate:email="{required:true,minlength:3,maxlength:30,email:true}"
                                       class="form-control" :class="[$loginValidation.email.invalid?'ng-invalid':'ng-valid']" placeholder="邮箱">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-unlock-alt"></i></div>
                                <input v-model="user.password" v-validate:password="{required:true}"
                                       class="form-control" :class="[$loginValidation.password.invalid?'ng-invalid':'ng-valid']" placeholder="密码">
                            </div>
                        </div>
                        <div class="actions-container">
                            <Sns-login item="qq"></Sns-login>
                            <button class="btn btn-primary" type="submit" id="login-btn" :disabled="$loginValidation.invalid">登录</button>
                        </div>
                        <!--<div class="form-group">-->
                            <!--<button class="btn btn-primary btn-lg btn-block" type="submit" id="login-btn" :disabled="$loginValidation.invalid">登录</button>-->
                        <!--</div>-->
                    </form>
                </validator>
            </div>
        </div>
    </div>
</template>
<script>
    import {localLogin} from '../../vuex/actions'
    import SnsLogin from './SnsLogin.vue'

    export default {
        el(){
            return '#loginForm'
        },
        components:{
            SnsLogin
        },
        vuex:{
            getters:{
                token:({auth}) => auth.token
            },
            actions:{
                localLogin
            }
        },
        validators:{
            email:function(val){
                return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(val)
            }
        },
        data()
        {
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        route:{
            activate(transition){



                this.token?transition.redirect('/'):transition.next()
            }
        },
        created(){

        },
        methods:{
            login(loginValidation){
                if(loginValidation.valid){
                    this.localLogin(this.user)
                }
            }
        },
        created(){
            console.log(this.token)
        }
    }

</script>
