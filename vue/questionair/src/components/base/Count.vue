<template>
    
</template>

<script>
export default {
    name:'Count',
    created(){
        console.log(this.$route.params.id);
    },
    data(){
        return {
            dataObj:{

            }
        }
    }
}
</script>

<style scoped lang="less"> 

</style>
