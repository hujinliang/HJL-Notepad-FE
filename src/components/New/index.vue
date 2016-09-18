<template>
    <div class="new-page">
        <div class="new-nav">
            <a @click="back"><</a>
            <p>{{current}}</p>
            <div class="setTime"></div>
            <form class="uploadForm" id="uploadForm" role="form" method="post" enctype='multipart/form-data' action='javascript:;'>
                <input id="fulAvatar" name="files" type="file"/>
                <button id="btnSub" class="btn btn-primary" @click="upload">上 传</button>
            </form>
            <div class="setColor"></div>
            <div class="note-content">
                <textarea v-model="text"></textarea>
            </div>
            <button @click="save">添加</button>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import {addNote,showMsg} from '../../vuex/actions'
    import $ from 'jquery'
    import jQuery from 'jquery'
    import {API_ROOT}  from '../../config'

    export default{
        vuex:{
            getters:{

            },
            actions:{
                addNote,showMsg
            }
        },
        methods:{
            save(){
                var obj = {
                    content:this.text
                }
                this.addNote(obj);
            },
            back(){
                this.$route.router.go({name:'home'})
            },
            upload(){


                var uploadForm = $('#uploadForm')[0]

                var formData = new FormData(uploadForm);
                let url = API_ROOT + '/note/upload';

                $.ajax({
                    url:url,
                    type:'POST',
                    data:formData,
                    async:false,
                    cache:false,
                    contentType:false,
                    processData:false,
                    success:function(data){



                        if(200 === data.code){
                            this.showMsg('上传成功','success')

                        }else{
                            this.showMsg('上传失败')
                        }
                    }.bind(this),
                    error:function(data){

                        debugger;

                        this.showMsg("与服务器发生错误")
                    }.bind(this)
                })
            }
        },
        data(){
            return {
                current:new Date(),
                text:'',
                color:'',
                calltime:''
            }
        }

    }
</script>
