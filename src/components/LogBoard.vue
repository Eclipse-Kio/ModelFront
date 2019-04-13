<template>
  <div class="board">
    <el-card>
      <div style="color: #ff4f4f;font-weight: bold" slot="header">
        <span>详细日志</span>
        <el-date-picker
          style="margin-left: 50px"
          v-model="timeStamp"
          @change="update"
          placeholder="请选择日期"
          type="date">
        </el-date-picker>
      </div>
      <el-table v-loading="loading" max-height="800px" style="overflow-y: auto" :data="logData" stripe>
        <el-table-column prop="sCreateTime"
                         label="操作时间"></el-table-column>
        <el-table-column
          prop="sOperation" label="操作内容"></el-table-column>
        <el-table-column
          prop="sSession" label="SessionID"></el-table-column>
        <el-table-column
          prop="sIsSelf" label="是否服务端"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getSystemLog} from '@/api/index'

export default {
  name: 'LogBoard',
  data () {
    return {
      timeStamp: new Date(),
      logData: [],
      loading: true,
      from: 0
    }
  },
  methods: {
    update () {
      if (this.timeStamp != null) {
        this.loading = true
        this.logData = []
        this.from = 0
        this.updateSub()
      }
    },
    updateSub () {
      getSystemLog(this.timeStamp, this.from).then((data) => {
        this.logData = data.concat(this.logData)
        this.loading = false
        if (data.length !== 0) {
          this.from = data[0].iId
        }
      })
    }
  },
  mounted () {
    // this.timeStamp = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)// 减掉一天，匹配服务器API
    console.log(this.timeStamp)
    this.update()
    this.timeStamp = new Date()// 将日期选择框设为当前天
    setInterval(() => this.updateSub(), 5000)
  }
}
</script>

<style scoped>
  .board {
    margin: 10px;
  }
</style>
