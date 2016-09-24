<template>
    <div class="new-page" :class="color">
        <div class="new-nav">
            <a @click="back" class="back-btn"><i class="fa fa-chevron-left"></i></a>
            <div class="time-panel">
                <p class="time1">{{current | formatDate1}}</p>
                <p class="time2">{{current | formatDate2}}</p>
            </div>

            <a class="time-btn" @click="showTPanel"><i class="fa fa-clock-o"></i></a>
            <span class="time-show">{{calltime | formatDate3}}</span>
            <div class="setTime" v-show="showTimePanel">
                <input class="form-controller" id="date" type="date" v-model="calltime" @change="timechange">
            </div>
            <a class="upload-btn" @click="showUPanel"><i class="fa fa-paperclip"></i></a>
            <div class="setUpload" v-show="showUploadPanel">
                <form class="uploadForm" id="uploadForm" role="form" method="post" enctype='multipart/form-data' action='javascript:;'>
                    <input id="fulAvatar" name="files" type="file"/>
                    <button id="btnSub" class="btn btn-success btn-xs" @click="upload">上 传</button>
                </form>
            </div>
            <a class="color-btn" @click="showCPanel"><i class="fa fa-dashboard"></i></a>
            <div class="setColor" v-show="showColorPanel">
                <div class="color color1" :class="{selected:color=='color1'}" @click="chooseColor('color1')"></div>
                <div class="color color2" :class="{selected:color=='color2'}" @click="chooseColor('color2')"></div>
                <div class="color color3" :class="{selected:color=='color3'}" @click="chooseColor('color3')"></div>
                <div class="color color4" :class="{selected:color=='color4'}" @click="chooseColor('color4')"></div>
                <div class="color color5" :class="{selected:color=='color5'}" @click="chooseColor('color5')"></div>
            </div>
            <a class="save-btn" @click="save"><i class="fa fa-plus"></i></a>
        </div>
        <div class="note-content" contenteditable="true">
            {{{text}}}
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
                            $('.note-content').append('<img src="'+data.msg.url+'" />');
                            this.showUPanel()

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
                    this.showColorPanel = false;
                    this.nowShow = '';
                }else{
                    this.showColorPanel = true;
                    if(this.nowShow){
                        this[this.nowShow] = false;
                    }
                    this.nowShow = 'showColorPanel';
                }
            },
            showTPanel(){
                if(this.showTimePanel){
                    this.showTimePanel = false;
                    this.nowShow = '';
                }else{
                    this.showTimePanel = true;
                    if(this.nowShow){
                        this[this.nowShow] = false;
                    }
                    this.nowShow = 'showTimePanel';
                }
            },
            showUPanel(){
                if(this.showUploadPanel){
                    this.showUploadPanel = false;
                    this.nowShow = '';
                }else{
                    this.showUploadPanel = true;
                    if(this.nowShow){
                        this[this.nowShow] = false;
                    }
                    this.nowShow = 'showUploadPanel';
                }
            },
            chooseColor(color){
                this.color = color;
                this.showCPanel();
            },
            timechange(){
                this.showTPanel();
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
                calltime:'',
                nowShow:''

            }
        },
        created(){

        }

    }
</script>
