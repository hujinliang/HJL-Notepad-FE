<template>
    <div class="out-container">
        <div class="wrap-container">
            <div class="navbar">
                <span class="title">EZ note</span>
                <a class="add" @click="addNote">
                    <i class="fa fa-plus-circle"></i>
                </a>
                <a class="avatar" href="javascript:;" :title="auth.user.nickname">
                    <img :src="auth.user.avatar || defaultAvatar">
                </a>
                <a class="logout" href="javascript:;" @click="logout" title="退出登录">
                    <i class="fa fa-sign-out"></i>
                </a>

            </div>
            <div class="note-list">
                <!--<ul>-->
                    <div v-for="item in noteList" class="note-item" @click="showDetail(item._id)">
                        <div class="inner-item" :class="item.color">
                            <div class="item-content">{{{item.content}}}</div>
                            <a class="delete-btn" @click.stop="deleteNote(item._id,$index)"><i class="fa fa-close"></i></a>
                            <a class="clock" v-if="item.calltime"><i class="fa fa-clock-o"></i></a>
                        </div>

                    </div>
                <!--</ul>-->
            </div>
        </div>

    </div>
</template>
<style>
    /*body{*/
        /*background-color:#ff0000;*/
    /*}*/
</style>
<script>

    import {getUserInfo,getNoteList,deleteNote,logout} from '../../vuex/actions'
    import defaultAvatar from '../../assets/images/userimg.png'

    export default{
        vuex:{
            getters:{
                auth:state => state.auth,
                noteList:state => state.noteList.items,

            },
            actions:{
                getUserInfo,getNoteList,deleteNote,logout
            }
        },
        created(){
            if(this.auth.token && !this.auth.user){
                this.getUserInfo()
            }
            console.log(this.auth.token)
        },
        route:{
            data(transition){

                this.getNoteList();
                transition.next()
            },
            activate(transition){
                !this.auth.token?transition.redirect('/login'):transition.next()
            }
        },
        methods:{
            showDetail(nid){
                this.$route.router.go({name:'note',params:{nid}})
            },
            addNote(){
                this.$route.router.go({name:'new'})
            },
            deleteNote(id,index){
                this.deleteNote(id,index);
            }
        },
        data(){
            return {
                defaultAvatar:defaultAvatar
            }
        }
    }
</script>
