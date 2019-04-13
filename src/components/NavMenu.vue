<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    :router="true"
    active-text-color="#ffd04b">
    <el-menu-item index="/SystemLog"><label class="webIcon">&#xe60f;&nbsp;&nbsp;&nbsp;</label>系统日志</el-menu-item>
    <el-menu-item index="/SystemParameter"><label style="font-size: 1.2em" class="webIcon">&#xe677;&nbsp;&nbsp;&nbsp;</label>系统配置</el-menu-item>
    <el-submenu index="3">
      <template slot="title"><label class="webIcon">&#xe7ba;&nbsp;&nbsp;&nbsp;</label>{{modelCompute}}</template>
      <el-menu-item index="/Model1" class="text-center">水动力正常扩散模型</el-menu-item>
      <el-menu-item index="/Model2" class="text-center">水动力应急调控模型</el-menu-item>
      <el-menu-item index="/Model3" class="text-center">追踪溯源模型</el-menu-item>
    </el-submenu>
  </el-menu>

</template>

<script>

export default {
  name: 'NavMenu',
  data () {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    modelCompute () {
      let result = '模型运算'
      if (this.$route.path === '/Model1') { result = '水动力正常扩散模型' }
      if (this.$route.path === '/Model2') { result = '水动力应急调控模型' }
      if (this.$route.path === '/Model3') { result = '追踪溯源模型' }
      return result
    }
  }
}
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
</style>
