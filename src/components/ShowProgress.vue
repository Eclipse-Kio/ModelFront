<template>
  <el-card>
    <div style="color: #ff4f4f;font-weight: bold" slot="header">
      <span>实时任务视图</span>
      <TaskCode :tskType="tskType"></TaskCode>
      <el-progress :percentage="$store.getters.getData[tskType-1].progress"></el-progress>
    </div>
    <div class="data">
      <div :key="index" v-for="(item,index) in $store.getters.getData[tskType - 1].result">
        <label class="received" style="color: #c00;">
          {{index+1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
          <span v-html="item"></span>
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
  },
  computed: {
    length () {
      return this.$store.getters.getData[this.tskType - 1].result
    }
  },
  watch: {
    length () {
      this.$nextTick(() => {
        let container = this.$el.querySelector('.data')
        container.scrollTop = container.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
  .data {
    max-height: 600px;
    overflow-y: scroll;
  }
</style>
