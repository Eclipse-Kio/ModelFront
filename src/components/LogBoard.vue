<template>
  <div class="board">
    <el-card>
      <div slot="header">
        <span>详细日志</span>
        <el-date-picker
          style="margin-left: 50px"
          v-model="timeStamp"
          @change="update"
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
      loading: true
    }
  },
  methods: {
    update () {
      alert(this.timeStamp)
    }
  },
  mounted () {
    getSystemLog(0).then(data => {
      this.logData = data
      this.loading = false
    })
  }
}
</script>

<style scoped>
.board{
  margin: 10px;
}
</style>
