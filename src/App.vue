<template>
  <div class="app">
    <NavMenu></NavMenu>
    <transition name="el-fade-in" mode="out-in"><keep-alive><router-view></router-view></keep-alive></transition>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'

export default {
  name: 'App',
  components: {NavMenu}
}
</script>

<style scoped>
  .el-fade-in-enter-active,
  .el-fade-in-leave-active{
    transition: .2s;
  }
</style>
