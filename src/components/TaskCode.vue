<template>
  <el-tag class="main" type="danger" v-if="$store.getters.getData[tskType-1].sTaskCode">获取到的任务编号：{{$store.getters.getData[tskType-1].sTaskCode}}</el-tag>
</template>

<script>
export default {
  name: 'TaskCode',
  props: {
    tskType: Number
  }
}
</script>

<style scoped>
.main{
  margin: 0 20px;
}
</style>
