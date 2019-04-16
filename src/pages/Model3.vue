<template>
  <el-container>
    <el-aside width="auto" class="aside">
      <AddTask :tskType="3">
        <div slot="form" style="margin-bottom: 20px">
          <el-form>
            <el-input v-model="inputNum">
              <template slot="prepend">检测时间</template>
            </el-input>
            <el-button type="success" @click="addParameter" style="float: right;margin:20px 0">添加节点信息</el-button>
            <el-collapse style="clear: right" accordion>
              <template v-for="(parameter,index) in parameters">
                <el-collapse-item v-bind:key="index">
                  <div slot="title">{{parameter.code}}
                    <el-button type="text" @click="modifyParameter(index)" class="margin-left-50">修改</el-button>
                    <el-button @click="remove({index})" type="text">移除</el-button>
                    <el-button type="text">增加</el-button>
                  </div>
                  <div v-for="(item,index2) in parameter.data" v-bind:key="index2">
                    <label class="time"><label class="webIcon" style="font-size: 20px">&#xe6d1;</label>时间:{{item.time}}</label>
                    <label class="webIcon weight">&#xe62d;检测量:{{item.weight}}</label>
                    <el-button @click="modifyItem(index,index2)" type="text">修改</el-button>
                    <el-button @click="remove({index,index2})" type="text">移除</el-button>
                  </div>
                </el-collapse-item>
              </template>
            </el-collapse>
          </el-form>
        </div>
      </AddTask>
    </el-aside>
    <el-main>
      <ShowProgress :tskType="3"></ShowProgress>
    </el-main>
    <el-dialog
      title="提示"
      :visible.sync="ModifyItemDialogVisible"
      width="30%">
      <el-input v-model="currentTime"></el-input>
      <el-input v-model="currentWeight"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ModifyItemDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitModifyItem">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import AddTask from '@/components/AddTask'
import TaskCode from '@/components/TaskCode'
import ShowProgress from '@/components/ShowProgress'

export default {
  name: 'Model3',
  components: {TaskCode, AddTask, ShowProgress},
  data () {
    return {
      inputNum: '0915',
      currentWeight: 0,
      currentTime: 0,
      currentParameterIndex: 0,
      currentItemIndex: 0,
      ModifyItemDialogVisible: false,
      parameters: [
        {
          code: '1508',
          data: [
            {
              time: '0',
              weight: '0.000'
            },
            {
              time: '6000',
              weight: '0.000'
            },
            {
              time: '12000',
              weight: '0.003'
            },
            {
              time: '17100',
              weight: '5.74'
            },
            {
              time: '20400',
              weight: '7.01'
            },
            {
              time: '22200',
              weight: '7.12'
            },
            {
              time: '27000',
              weight: '6.28'
            },
            {
              time: '414000',
              weight: '6.28'
            }
          ]
        }
      ]
    }
  },
  watch: {
    parameters () {
      // TODO 提交参数给VUEX
    }
  },
  methods: {
    addParameter () {
      this.$prompt('请输入桩号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.parameters.push({
          code: value,
          data: []
        })
      })
    },
    remove (index) {
      console.log(index)
      if (!index.hasOwnProperty('index2')) {
        this.parameters.splice(index, 1)
      } else {
        this.parameters[index.index].data.splice(index.index2, 1)
      }
    },
    modifyParameter (index) {
      this.$prompt('请输入桩号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.parameters[index].code = value
      })
    },
    modifyItem (index, index2) {
      this.currentParameterIndex = index
      this.currentItemIndex = index2
      let parameter = this.parameters[index].data
      this.currentTime = parameter[index2].time
      this.currentWeight = parameter[index2].weight
      this.ModifyItemDialogVisible = true
    },
    submitModifyItem () {
      this.ModifyItemDialogVisible = false
      let parameter = this.parameters[this.currentParameterIndex].data
      parameter[this.currentItemIndex].time = this.currentTime
      parameter[this.currentItemIndex].weight = this.currentWeight
    },
    addItem (index, index2) {
      this.modifyItem = true
    },
    submitAddItem () {
      this.modifyParameter()
    }
  }
}
</script>

<style scoped>
  .time, .weight {
    display: inline-block;
    width: 100px;
    text-align: left;
  }

  .margin-left-50 {
    margin-left: 50px;
  }
</style>
