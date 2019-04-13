<template>
  <el-card id="card">
    <div style="color: #ff4f4f;font-weight: bold" slot="header" class="tip">{{title}}</div>
    <div class="main" :id="id"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'RoundChart',
  data () {
    return {
      option: {
        tooltip: {},
        series: [
          {
            name: this.title,
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 40, name: this.title}]
          }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      const myChart = echarts.init(document.getElementById(this.id))
      myChart.setOption(this.option)
    })
  },
  props: {
    id: String,
    title: String
  }
}
</script>

<style scoped>
  .tip {
    color: brown;
    font-size: 14px;
  }

  #card {
    margin-top: 20px;
    margin-right: 20px;
    height: 500px;
  }

  .main {
    width: 96%;
    height: 380px;
  }
</style>
