<template>
  <div>
    <el-row>
      <el-col :span="8">
        <chart title="周使用量" id="main1"/>
        <el-row>
          <el-col><chart title="分类访问量" id="main2"/></el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <LogBoard class="logBoard"></LogBoard>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Chart from '@/components/Chart'
import LogBoard from '@/components/LogBoard'

export default {
  name: 'SystemLog',
  components: {Chart, LogBoard}
}
</script>

<style scoped>

</style>
