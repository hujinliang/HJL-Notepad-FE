<template>
    <div>
        <div class="note-page" :class="noteDetail.color">
            <div class="new-nav">
                <a @click="back"><</a>
                <p>{{noteDetail.created | formatDate1}}</p>
                <p>{{noteDetail.created | formatDate2}}</p>
                <button @click="showTPanel"><i class="fa fa-clock-o"></i></button><span>{{noteDetail.calltime | formatDate3}}</span>
                <div class="setTime" v-show="showTimePanel">
                    <div class="input-group date" id="datetimepicker">
                        <input class="form-controller" id="date" type="date" v-model="noteDetail.calltime" @change="change">
                    </div>
                </div>
                <button @click="showUPanel"><i class="fa fa-paperclip"></i></button>
                <div v-show="showUploadPanel">
                    <form class="uploadForm" id="uploadForm" role="form" method="post" enctype='multipart/form-data' action='javascript:;'>
                        <input id="fulAvatar" name="files" type="file"/>
                        <button id="btnSub" class="btn btn-primary" @click="upload">上 传</button>
                    </form>
                </div>
                <button @click="showCPanel"><i class="fa fa-dashboard"></i></button>
                <div class="setColor" v-show="showColorPanel">
                    <div class="color color1" :class="{selected:noteDetail.color=='color1'}" @click="chooseColor('color1')"></div>
                    <div class="color color2" :class="{selected:noteDetail.color=='color2'}" @click="chooseColor('color2')"></div>
                    <div class="color color3" :class="{selected:noteDetail.color=='color3'}" @click="chooseColor('color3')"></div>
                    <div class="color color4" :class="{selected:noteDetail.color=='color4'}" @click="chooseColor('color4')"></div>
                    <div class="color color5" :class="{selected:noteDetail.color=='color5'}" @click="chooseColor('color5')"></div>
                </div>
                <button @click="save">update</button>
                <div class="note-content" contenteditable="true" style="border:1px solid #999999">
                    {{{noteDetail.content}}}
                </div>

            </div>
        </div>
    </div>
</template>
<style>
    .note-page{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .note-page.color1{
        background-color:  #f7eee5;
    }
    .note-page.color2{
        background-color:  #e9dfc7;
    }
    .note-page.color3{
        background:#a4a4a4;
    }
    .note-page.color4{
        background:#cdefce;
    }
    .note-page.color5{
        background: #e8cad3;
    }

</style>
<script>
    import {getNoteDetail,showMsg,updateNote} from '../../vuex/actions'
    import $ from 'jquery'
    import jQuery from 'jquery'
    import {API_ROOT}  from '../../config'

    export default{
        vuex:{
            getters:{
                noteDetail:state => state.noteDetail.item
            },
            actions:{
                getNoteDetail,showMsg,updateNote
            }
        },
        route:{
            data(transition){

                this.getNoteDetail(this.$route.params.nid);
                transition.next();
            }
        },
        data(){

            return {
                showColorPanel:false,
                showTimePanel:false,
                showUploadPanel:false,

            }
        },
        methods:{
            save(){

                var obj = {
                    content:$('.note-content').html(),
                    color:this.noteDetail.color
                }

                if(this.noteDetail.calltime !== ''){
                    obj.calltime = this.noteDetail.calltime;
                }


                var pack = {
                    id:this.$route.params.nid,
                    obj
                }

//                console.log(obj)
                this.updateNote(pack);
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
                            $('.note-content').append('<img src="'+data.msg.url+'" />')
                            $('.note-content').append('<br/>')

                        }else{
                            this.showMsg('上传失败')
                        }
                    }.bind(this),
                    error:function(data){

                        this.showMsg("与服务器发生错误")
                    }.bind(this)
                })
            },
            showCPanel(){
                if(this.showColorPanel){
                    this.showColorPanel = false
                }else{
                    this.showColorPanel = true
                }
            },
            showTPanel(){
                if(this.showTimePanel){
                    this.showTimePanel = false;
                }else{
                    this.showTimePanel = true;
                }
            },
            showUPanel(){
                if(this.showUploadPanel){
                    this.showUploadPanel = false;
                }else{
                    this.showUploadPanel = true;
                }
            },
            chooseColor(color){
                this.noteDetail.color = color;
            },
            change(){
                console.log(new Date($('#date')[0].value))
            }
        },
        created(){

        }
    }
</script>
