<template>
  <el-card id="card">
    <div slot="header" class="tip">{{title}}</div>
    <div class="main" :id="id"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Chart',
  data () {
    return {
      option: {
        tooltip: {},
        legend: {
          data: ['服务端使用量', '客户端使用量', '合计量']
        },
        xAxis: {
          data: ['3/8', '3/9', '3/10', '3/11', '3/12', '3/13']
        },
        yAxis: {},
        series: [{
          name: '服务端使用量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }, {
          name: '客户端使用量',
          type: 'line',
          data: [25, 80, 46, 10, 230, 120]
        }, {
          name: '合计量',
          type: 'bar',
          data: [30, 100, 82, 20, 240, 140]
        }]
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
    height: 330px;
    margin: 10px;
  }

  .main {
    width: 96%;
    height: 260px;
  }
</style>
