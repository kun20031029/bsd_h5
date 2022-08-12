import request from '@/utils/request'
//登录
export function login(param,type) {
  let url = "/teacher/teacherLogin/loginMobile";
  if(type) url = "/user/student/loginMobile";
  return request.post(url,param)
}
//首页
export function getIndexData(type) {
  let url = "/teacher/teacherTask/shouye";
  if(type) url = "/student/studentTask/liebiao"
  return request.get(url)
}
//任务列表
export function getTask(param,type){
  let url = "/teacher/teacherTask/liebiao";
  if(type) url = "/student/studentTask/liebiao";
  return request.post(url,param)
}
