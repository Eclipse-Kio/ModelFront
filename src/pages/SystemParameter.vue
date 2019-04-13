<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="input">
          <div style="color: #ff4f4f;font-weight: bold" slot="header">
            <label class="webIcon">&#xe677;</label>&nbsp;&nbsp;系统参数
          </div>
          <label for="maxThread">最大并发数</label>
          <el-input v-model="maxThread" style="width: 80%;margin-left: 30px" id="maxThread"></el-input>
          <br>
          <br>
          <label for="model1">模型一路径</label>
          <el-input v-model="model1" style="width: 80%;margin-left: 30px" id="model1"></el-input>
          <br>
          <br>
          <label for="model2">模型二路径</label>
          <el-input v-model="model2" style="width: 80%;margin-left: 30px" id="model2"></el-input>
          <br>
          <br>
          <label for="model3">模型三路径</label>
          <el-input v-model="model3" style="width: 80%;margin-left: 30px" id="model3"></el-input>
          <br>
          <br>
          <el-button @click="onChangeParameter" style="float: right;margin-bottom: 30px;margin-right: 5%" type="danger">
            <label class="webIcon">&#xe621;</label>&nbsp;&nbsp;修改
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <RoundChart id="sysP" title="运行空间"></RoundChart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getSystemParameter, changeSystemParameter} from '@/api'
import RoundChart from '@/components/RoundChart'
export default {
  name: 'SystemConfig',
  components: {RoundChart},
  data () {
    return {
      maxThread: 0,
      model1: '',
      model2: '',
      model3: ''
    }
  },
  methods: {
    loadProperties () {
      getSystemParameter().then(data => {
        this.maxThread = data.maxThreadNum
        this.model1 = data.model_1_path
        this.model2 = data.model_2_path
        this.model3 = data.model_3_path
      })
    },
    onChangeParameter () {
      this.$confirm('不正确的配置将导致系统无法正常运行，是否继续操作？', '警告', {
        type: 'warning'
      }).then(() => {
        changeSystemParameter(
          JSON.stringify({
            'maxThreadNum': this.maxThread,
            'model_1_path': this.model1,
            'model_2_path': this.model2,
            'model_3_path': this.model3
          })
        ).then(data => {
          if (data.success) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.loadProperties()
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            })
            this.loadProperties()
          }
        }).catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
      })
    }
  },
  mounted () {
    this.loadProperties()
  }
}
</script>

<style scoped>
  .input {
    margin: 20px;
  }
</style>
