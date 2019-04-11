import request from '@/api/core'

export function getSystemLog (from) {
  return request('api/getSystemLog', {from}, 'GET')
}

export function createTask (iTaskType) {
  return request('api/createTask', {iTaskType}, 'GET')
}

export function executeTask (sTaskCode, iTaskType, param) {
  // TODO 添加参数
  return request('api/executeTask', {sTaskCode, iTaskType}, 'GET')
}

export function getTaskProgress (iTaskType, sTaskCode) {
  return request('api/getTaskProgress', {iTaskType, sTaskCode}, 'GET')
}
