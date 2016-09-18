<template>
    <div>
        <p>token:{{auth.token}}</p>
        <p>id:{{auth.user._id}}</p>
        <p>nickname:{{auth.user.nickname}}</p>
        <p>created:{{auth.user.created}}</p>
        <button class="btn btn-primary" @click="addNote">Add note</button>
        <ul>
            <li v-for="item in noteList" style="border:1px solid #999999" @click="showDetail(item._id)">
                <h1>{{item._id}}</h1>
                <p>{{item.content}}</p>
                <h6>{{item.created}}</h6>
                <button @click="deleteNote(item._id,$index)">删除</button>
            </li>
        </ul>

    </div>
</template>
<style>
    /*body{*/
        /*background-color:#ff0000;*/
    /*}*/
</style>
<script>

    import {getUserInfo,getNoteList,deleteNote} from '../../vuex/actions'

    export default{
        vuex:{
            getters:{
                auth:state => state.auth,
                noteList:state => state.noteList.items

            },
            actions:{
                getUserInfo,getNoteList,deleteNote
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
        }
    }
</script>
