<template>
    <div class="container">
        <div class="item" v-for="(item,index) in count" :key="index">
            {{item}}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            count:10
        }
    }
    
}
</script>

<style>
.container{
    display:flex;
    flex-wrap:wrap;
    align-content:flex-start;
}
.item{
    width: 15%;
    /* flex: 1; */
    margin: 20px 10px;
    min-width: 180px;
    height: 300px;
    border: 1px solid red;
}
</style>