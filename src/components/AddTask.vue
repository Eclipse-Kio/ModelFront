<template>
  <div class="main">
    <el-tabs stretch type="border-card" value="create">
      <el-tab-pane class="webIcon" name="create">
        <span slot="label"><label class="webIcon">&#xe655;</label>&nbsp;&nbsp;新建任务</span>
        <div class="tips">
          <div class="el-icon-info tip-title">&nbsp;&nbsp;小提示</div>
          <div>
            您可以通过新建任务创建一个新的任务执行空间，然后通过填写运行参数执行实时查看运行情况
          </div>
        </div>
        <div class="float-right">
          <el-button style="margin: 16px 0 0 0;display: block" :disabled="loadingCreated" @click="createTask"
                     type="primary">
            <label v-if="loadingCreated" class="el-icon-loading"></label>
            <label v-else class="webIcon">&#xe655;</label>&nbsp;&nbsp;
            &nbsp;&nbsp;新建任务
          </el-button>
          <el-button @click="reset" style="margin: 16px 0 0 0;display: block" type="danger">
            <label v-if="loadingCreated" class="el-icon-loading"></label>
            <label v-else class="el-icon-delete"></label>&nbsp;&nbsp;
            &nbsp;&nbsp;移除任务
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane name="executeTask">
        <span slot="label"><label class="webIcon">&#xe626;</label>&nbsp;&nbsp;执行任务</span>
        <slot name="form"></slot>
        <el-button class="float-right" @click="executeTask" type="warning"><label class="webIcon">&#xe626;</label>&nbsp;&nbsp;执行任务
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {createTask, executeTask, getTaskProgress} from '@/api'

export default {
  name: 'AddTask',
  props: {
    tskType: Number
  },
  data () {
    return {
      loadingCreated: false,
      from: 0
    }
  },
  methods: {
    createTask () {
      this.loadingCreated = true
      createTask(this.tskType).then(data => {
        this.loadingCreated = false
        if (data.code !== 0) {
          this.$message({message: data.msg, type: 'error'})
        } else {
          this.$notify({
            title: '成功',
            message: '新建任务成功！',
            type: 'success',
            duration: 2000
          })
          this.$store.commit('updateTaskResult', {iTaskType: this.tskType, data: []}) // 清空原先结果
          this.$store.commit('updateProgress', {iTaskType: this.tskType, data: 0})
          this.$store.commit('updateTaskCode', {iTaskType: this.tskType, sTaskCode: data.msg})
        }
      }).catch(() => {
        this.loadingCreated = false
      })
    },
    executeTask () {
      executeTask(this.$store.getters.getData[this.tskType - 1].sTaskCode, this.tskType, {}).then(data => {
        if (data.code !== 0) {
          this.$message({message: data.msg, type: 'error'})
        } else {
          this.$notify({
            title: '成功',
            message: data.msg,
            type: 'success',
            duration: 2000
          })
          this.$store.commit('updateTaskResult', {iTaskType: this.tskType, data: []}) // 清空原先结果
          this.$store.commit('updateProgress', {iTaskType: this.tskType, data: 0})
          this.from = 0
          this.updateTaskProgress(this.tskType, this.$store.getters.getData[this.tskType - 1].sTaskCode)
        }
      })
    },
    updateTaskProgress (iTaskType, sTaskCode) {
      setTimeout(() => {
        getTaskProgress(iTaskType, sTaskCode, this.from).then(data => {
          if (data.code === 0) { // 有数据添加
            this.from = data.stamp
            let current = this.$store.getters.getData[this.tskType - 1].result
            this.$store.commit('updateProgress', {iTaskType: this.tskType, data: data.progress})
            this.$store.commit('updateTaskResult', {iTaskType: this.tskType, data: current.concat(data.msg)})
            if (!data.isEnd) { // 如果没有结束继续发送请求
              this.updateTaskProgress(iTaskType, sTaskCode)
            } else {
              this.$notify({
                title: '成功',
                message: '任务执行完成！',
                type: 'success',
                duration: 2000
              })
            }
          } else if (data.code === 1) {
            this.$store.commit('updateProgress', {iTaskType: this.tskType, data: data.progress})
            this.updateTaskProgress(iTaskType, sTaskCode)
          }
        })
      }, 1000)
    },
    reset () {
      this.$store.commit('resetData', this.tskType)
    }
  }
}
</script>

<style scoped>
  .main {
    text-align: center;
    width: 360px;
    margin: 20px 0 0 10px;
  }

  .float-right {
    float: right;
  }

  .tip-title {
    color: cornflowerblue;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .tips {
    margin: 0 auto;
    border: 1px solid #dde;
    font-size: 12px;
    border-radius: 8px;
    background-color: #eef;
    padding: 16px 12px;
    text-align: left;
    color: #778;
    font-family: '微软雅黑', serif;
    transition: .3s;
    cursor: pointer;
  }

  .tips:hover {
    transition: .3s;
    box-shadow: 1px 1px 10px 0 #ccc;
  }
</style>
