import request from '@/utils/request'
//登录
export function login(param,type) {
  let url = "/teacher/teacherLogin/loginMobile";
  if(type) url = "/student/StudentLogin/loginMobile";
  return request.post(url,param)
}
//发送验证码
export function getCode(param) {
  let url = "/common/gongju/vocode";
  return request.post(url,param)
}
//首页
export function getIndexData(type) {
  let url = "/teacher/teacherTask/shouye";
  if(type) url = "/student/studentTask/shouye"
  return request.post(url)
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
//获取课程 默认获取
export function getCommonList(param,type){
  let url = "/teacher/paike/getKCList";
  if(type) url = "/student/studentDaoshi/daoshiLiebiao"
  return request.post(url,param)
}
//提交排课要求
export function savePk(param){
  let url = "/teacher/paike/savePaike";
  return request.post(url,param)
}
//提交多个排课要求
export function saveListPk(param){
  let url = "/teacher/paike/savePaikeList";
  return request.post(url,param)
}
//提交老师接收的学生数量
export function saveNumStudent(param){
  let url = "/teacher/daoshi/addXueShengNum";
  return request.post(url,param)
}
//通知的通知确认
export function taskResultSave(param,type){
  let url = "/teacher/teacherTask/confirm";
  if(type) url = "/student/studentTask/confirm"
  return request.post(url,param)
}
export function selectTeacher(param){
  let url = "/student/studentDaoshi/addXuanDaoshi";
  return request.post(url,param)
}
//排课结果 对象：老师
export function getPaikeResult(param){
  let url = "/teacher/paike/myCourseResult";
  // let url = "/teacher/paike/getPaikeInfo"
  return request.post(url,param)
}
export function getPaikeInfo(param){
  let url = "/teacher/paike/getPaikeInfo"
  return request.post(url,param)
}
//老师指导的学生列表   学生的老师列表
export function getNoticeObj (type){
  let url = "/teacher/daoshi/xinshengList";
  if(type) url = '/student/studentDaoshi/myDaoshi'
  return request.post(url)
}
//api接口域名地址
export function getApi(){
  let url = "/common/gongju/appParams";
  return request.get(url)
}
//消息类型
export function getLeiXingList(param){
  let url = "/common/gongju/leixingList";
  return request.post(url,param)
}

//查看详情
export function getNoticeDetail(param,type){
  let url = "/teacher/daoshi/getXinshengNum";
  if(type){
    url = '/student/studentDaoshi/getXuanDaoshi'
  }
  return request.post(url,param)
}
