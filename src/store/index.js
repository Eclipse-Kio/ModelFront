import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [
      /**
       *state代表任务状态:
       * 0-没有创建
       * 1-正在创建
       * 2-创建成功
       * 3-创建失败
       * 4-正在执行
       * 5-执行出错
       * 6-执行完成
       */
      {sTaskCode: '', response: '', parameters: {}, result: [], progress: 0, state: 0},
      {sTaskCode: '', response: '', parameters: {}, result: [], progress: 0, state: 0},
      {sTaskCode: '', response: '', parameters: {}, result: [], progress: 0, state: 0}
    ]
  },
  mutations: {
    updateTaskCode (state, payload) {
      state.data[payload.iTaskType - 1].sTaskCode = payload.sTaskCode
    },
    updateTaskResult (state, payload) {
      state.data[payload.iTaskType - 1].result = payload.data
    },
    updateProgress (state, payload) {
      state.data[payload.iTaskType - 1].progress = payload.data
    },
    updateData (state, payload) {
      state.data[payload.iTaskType - 1].sTaskCode = payload.sTaskCode
      state.data[payload.iTaskType - 1].response = payload.response
      state.data[payload.iTaskType - 1].parameters = payload.parameter
      state.data[payload.iTaskType - 1].result = payload.result
      state.data[payload.iTaskType - 1].progress = payload.progress
      state.data[payload.iTaskType - 1].state = payload.state
    },
    resetData (state, iTaskType) {
      console.log('hell' + iTaskType)
      state.data[iTaskType - 1].sTaskCode = ''
      state.data[iTaskType - 1].response = ''
      state.data[iTaskType - 1].parameters = {}
      state.data[iTaskType - 1].result = []
      state.data[iTaskType - 1].progress = 0
      state.data[iTaskType - 1].state = 0
    }
  },
  getters: {
    getData (state) {
      return state.data
    }
  }
})
