<template>
  <el-container>
    <el-aside width="auto" class="aside">
      <AddTask :tskType="1">
        <el-form label-width="40px" slot="form">
          <el-form-item  label="参数">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </AddTask>
    </el-aside>
    <el-main>
    <ShowProgress :tskType="1"></ShowProgress>
    </el-main>
  </el-container>
</template>

<script>
import AddTask from '@/components/AddTask'
import TaskCode from '@/components/TaskCode'
import ShowProgress from '@/components/ShowProgress'

export default {
  name: 'Model1',
  components: {ShowProgress, AddTask, TaskCode}
  // activated () {
  //   alert('请耐心等候')
  // },
  // updated () {
  //   this.$nextTick(function () {
  //     alert('等待结束')
  //   })
  // }
}
</script>

<style scoped>
</style>
