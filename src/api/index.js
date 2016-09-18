/**
 * Created by jialao on 2016/9/16.
 */
import {AuthResource,NoteResource,UserResource} from './resources'

export default {
    localLogin: function(data){
        return AuthResource.save({id:'local'},data);
    },
    getNoteList: function(){
        return NoteResource.get({id:'getNoteList'})
    },
    getNoteCount: function(){
        return NoteResource.get({id:'getNoteCount'})
    },
    addNote: function(data){
        return NoteResource.save({id:'addNote'},data);
    },
    getNoteDetail: function(id){

        return NoteResource.get({controller:'getNoteDetail',id:id});
    },
    updateNote: function(id,data){
        return NoteRerouce.update({id:id,controller:'updateNote'},data);
    },
    deleteNote: function(id){
        return NoteResource.remove({id:id,controller:'deleteNote'}); 
    },
    getMe: function(){
        return UserResource.get({id:'me'})
    }
}