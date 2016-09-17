<template>
    <div>
        <router-view></router-view>
        <Toaster></Toaster>
    </div>
</template>
<style>

</style>
<script>
import store from '../vuex/store'
import Toaster from './Toaster'


    export default{
        store,
        components:{
            Toaster
        }
    }
</script>
