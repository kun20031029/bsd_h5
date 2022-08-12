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
//任务详情
export function getDetail(param,type){
  let url = "/teacher/teacherTask/detail";
  if(type) url = "/student/studentTask/detail";
  return request.post(url,param)
}
//获取排课时间
export function getwekDayClass(){
  let url = "/common/gongju/kechengShijian";
  return request.get(url)
}
//教室类型
export function getclasstype(){
  let url = "/common/gongju/jiaoshiLiebiao";
  return request.get(url)

}
//获取课程
export function getKCList(param){
  let url = "/teacher/paike/getKCList";
  return request.post(url,param)
}
//提交排课要求
export function savePk(param){
  let url = "/teacher/paike/savePaike";
  return request.post(url,param)
}