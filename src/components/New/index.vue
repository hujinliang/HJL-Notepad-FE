<template>
    <div class="new-page" :class="color">
        <div class="new-nav">
            <a @click="back"><</a>
            <p>{{current | formatDate1}}</p>
            <p>{{current | formatDate2}}</p>
            <div class="setTime"></div>
            <button @click="showTPanel"><i class="fa fa-clock-o"></i></button><span>{{calltime | formatDate3}}</span>
            <div class="setTime" v-show="showTimePanel">
                <div class="input-group date" id="datetimepicker">
                    <input class="form-controller" id="date" type="date" v-model="calltime" @change="change">
                </div>
            </div>
            <button @click="showUPanel"><i class="fa fa-paperclip"></i></button>
            <div v-show="showUploadPanel>
                <form class="uploadForm" id="uploadForm" role="form" method="post" enctype='multipart/form-data' action='javascript:;'>
                    <input id="fulAvatar" name="files" type="file"/>
                    <button id="btnSub" class="btn btn-primary" @click="upload">上 传</button>
                </form>
            </div>
            <button @click="showCPanel"><i class="fa fa-dashboard"></i></button>
            <div class="setColor" v-show="showColorPanel">
                <div class="color color1" :class="{selected:color=='color1'}" @click="chooseColor('color1')"></div>
                <div class="color color2" :class="{selected:color=='color2'}" @click="chooseColor('color2')"></div>
                <div class="color color3" :class="{selected:color=='color3'}" @click="chooseColor('color3')"></div>
                <div class="color color4" :class="{selected:color=='color4'}" @click="chooseColor('color4')"></div>
                <div class="color color5" :class="{selected:color=='color5'}" @click="chooseColor('color5')"></div>
            </div>
            <button @click="save">添加</button>
            <div class="note-content" contenteditable="true" style="border:1px solid #999999">
                {{{text}}}
            </div>


        </div>
    </div>
</template>
<style>
    .new-page{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .new-page.color1{
        background-color:  #f7eee5;
    }
    .new-page.color2{
        background-color:  #e9dfc7;
    }
    .new-page.color3{
        background:#a4a4a4;
    }
    .new-page.color4{
        background:#cdefce;
    }
    .new-page.color5{
        background: #e8cad3;
    }
    .setColor{
        background: #cccccc;
        padding:10px;
        padding-bottom:5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;

    }
    .color{
        width:60px;
        height:60px;
        display: inline-block;
        margin-right:5px;
    }
    .color1{
        background:#f7eee5;
        -webkit-background-clip: content-box;
        -moz-background-clip: content-box;
        background-clip: content-box;
    }
    .color2{
        background:#e9dfc7;
        -webkit-background-clip: content-box;
        -moz-background-clip: content-box;
        background-clip: content-box;
    }
    .color3{
        background:#a4a4a4;
        -webkit-background-clip: content-box;
        -moz-background-clip: content-box;
        background-clip: content-box;
    }
    .color4{
        background:#cdefce;
        -webkit-background-clip: content-box;
        -moz-background-clip: content-box;
        background-clip: content-box;
    }
    .color5{
        background: #e8cad3;
        -webkit-background-clip: content-box;
        -moz-background-clip: content-box;
        background-clip: content-box;
    }
    .color.selected{
        border:1px solid #d96f5d;
    }
    .note-content img{
        width:300px;
        height:auto;
    }
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
                var instance = this;
                var obj = {
                    content:$('.note-content').html(),
                    color:instance.color
                }

                if(instance.calltime !== ''){
                    obj.calltime = instance.calltime
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

                        console.log(data)


                        if(200 === data.code){
                            this.showMsg('上传成功','success')
                            $('.note-content').append('<img src="'+data.msg.url+'" />')

                        }else{
                            this.showMsg('上传失败')
                        }
                    }.bind(this),
                    error:function(data){

                        debugger;

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
                this.color = color
            }
        },
        data(){
            return {
                current:new Date(),
                showColorPanel:false,
                showTimePanel:false,
                showUploadPanel:false,
                text:'',
                color:'color1',
                calltime:''
            }
        },
        created(){

        }

    }
</script>
