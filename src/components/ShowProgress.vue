<template>
  <el-card>
    <div slot="header">
      <span>实时任务视图</span>
      <TaskCode :tskType="tskType"></TaskCode>
      <el-progress :percentage="$store.getters.getData[tskType-1].progress"></el-progress>
    </div>
    <div class="data">
      <div :key="item" v-for="item in $store.getters.getData[tskType - 1].result">
        <div>{{item}}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import TaskCode from '@/components/TaskCode'

export default {
  name: 'ShowProgress',
  components: {TaskCode},
  props: {
    tskType: Number
  }
}
</script>

<style scoped>
  .data {
    max-height: 600px;
    overflow-y: scroll;
  }
</style>
