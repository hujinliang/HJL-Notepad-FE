<template>
    <div>
        <h1>{{noteDetail._id}}</h1>
        <p>{{noteDetail.content}}</p>
        <h6>{{noteDetail.created}}</h6>
    </div>
</template>
<style>

</style>
<script>
    import {getNoteDetail} from '../../vuex/actions'


    export default{
        vuex:{
            getters:{
                noteDetail:state => state.noteDetail.item
            },
            actions:{
                getNoteDetail
            }
        },
        route:{
            data(transition){



                this.getNoteDetail(this.$route.params.nid);
                transition.next();
            }
        }
    }
</script>
