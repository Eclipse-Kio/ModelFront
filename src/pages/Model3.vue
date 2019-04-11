<template>
<el-container>
  <el-aside width="auto" class="aside">
    <AddTask :tskType="3"></AddTask>
  </el-aside>
  <el-main>
    <ShowProgress :tskType="3"></ShowProgress>
  </el-main>
</el-container>
</template>

<script>
import AddTask from '@/components/AddTask'
import TaskCode from '@/components/TaskCode'
import ShowProgress from '@/components/ShowProgress'

export default {
  name: 'Model3',
  components: {TaskCode, AddTask, ShowProgress}
}
</script>

<style scoped>

</style>
