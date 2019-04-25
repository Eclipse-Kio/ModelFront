<template>
  <el-container>
    <el-aside width="auto" class="aside">
      <AddTask :tskType="3">
        <div slot="form" style="margin-bottom: 20px">
          <div class="parameterPlane">
            <div class="parameterPlaneHead">参数面板</div>
            <el-input v-model="inputNum">
              <template slot="prepend">检测时间</template>
            </el-input>
            <el-button @click="addParameter" plain style="float: right;margin:20px 0">
              <label class="webIcon">&#xe655;</label>&nbsp;&nbsp;添加节点
            </el-button>
            <el-collapse style="clear: right" accordion>
              <template v-for="(parameter,index) in parameters">
                <el-collapse-item v-bind:key="index">
                  <div slot="title">{{parameter.code}}
                    <el-button type="text" @click="modifyParameter(index)" class="margin-left-50">修改</el-button>
                    <el-button @click="remove({index})" type="text">移除</el-button>
                    <el-button @click="addItem(index)" type="text">增加</el-button>
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
          </div>
        </div>
      </AddTask>
    </el-aside>
    <el-main>
      <ShowProgress :tskType="3"></ShowProgress>
    </el-main>
    <el-dialog
      title="请输入"
      :close-on-click-modal="false"
      :visible.sync="ModifyItemDialogVisible"
      width="30%">
       <el-input v-model="currentTime">
         <label slot="prefix" style="font-size: 28px;line-height: 40px;margin-left: -4px;" class="webIcon">&#xe6d1;</label>
       </el-input>
      <br>
      <br>
       <el-input v-model="currentWeight">
         <label slot="prefix" style="font-size: 24px;line-height: 40px;" class="webIcon">&#xe62d;</label>
       </el-input>
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
      currentWeight: '0',
      currentTime: '0',
      currentParameterIndex: 0,
      currentItemIndex: 0,
      ModifyItemDialogVisible: false,
      flag: false,
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
    inputNum () {
      this.toSend()
    }
  },
  methods: {
    toSend () {
      this.$store.commit('updateParameters',
        {
          iTaskType: 3,
          data: {
            startTime: this.inputNum,
            param: this.parameters
          }
        }
      )
    },
    addParameter () {
      this.$prompt('请输入桩号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      }).then(({value}) => {
        this.parameters.push({
          code: value,
          data: []
        })
        this.toSend()
      })
    },
    remove (index) {
      if (!index.hasOwnProperty('index2')) {
        this.parameters.splice(index.index, 1)
      } else {
        this.parameters[index.index].data.splice(index.index2, 1)
      }
      this.toSend()
    },
    modifyParameter (index) {
      this.$prompt('请输入桩号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      }).then(({value}) => {
        this.parameters[index].code = value
        this.toSend()
      })
    },
    modifyItem (index, index2) {
      this.currentParameterIndex = index
      this.currentItemIndex = index2
      let parameter = this.parameters[index].data
      this.currentTime = parameter[index2].time
      this.currentWeight = parameter[index2].weight
      this.flag = true
      this.ModifyItemDialogVisible = true
    },
    submitModifyItem () {
      this.ModifyItemDialogVisible = false
      let parameter = this.parameters[this.currentParameterIndex].data
      if (this.flag) {
        parameter[this.currentItemIndex].time = this.currentTime
        parameter[this.currentItemIndex].weight = this.currentWeight
      } else {
        parameter.push({time: this.currentTime, weight: this.currentWeight})
      }
      this.toSend()
    },
    addItem (index) {
      this.flag = false
      this.currentParameterIndex = index
      this.ModifyItemDialogVisible = true
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

  .parameterPlane{
    overflow: hidden;
    margin: 0 auto;
    border: 1px solid #dde;
    font-size: 12px;
    border-radius: 8px;
    padding: 16px 12px;
    text-align: left;
    color: #778;
    font-family: '微软雅黑', serif;
    transition: .3s;
    cursor: pointer;
  }
  .parameterPlane:hover {
    transition: .3s;
    box-shadow: 1px 1px 10px 0 #ccc;
  }
  .parameterPlaneHead{
    border-bottom: 1px solid #ccc;
    margin-bottom:10px;
    padding-bottom:10px;
    color: rgb(180, 50, 50);
    font-weight: bold;
    font-size: 16px
  }
</style>
