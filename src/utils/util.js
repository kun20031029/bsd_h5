
import Vue from 'vue'
import { getApi,getLeiXingList } from '@/api/api'

Vue.prototype.$getApi = async function (){
  let host = localStorage.getItem("host");
  if(!host){
    let apiRes = await getApi();
    if(apiRes.code == 200){
      host = apiRes.data[0].paramvalue;
      localStorage.setItem("host",host);
    }
  }
  return host;
}
Vue.prototype.$getCommonType = async function(param,type){
  let listRes = await getLeiXingList(param);
  if(listRes.code == 200){
    let arr = listRes.data || [];
    for(var i = 0; i <　arr.length; i ++){
      let temp = arr[i];
      if(type == temp.leixing){
          return temp;
      }
    }
  }
}
Vue.prototype.$importFile = function(res,fileType,fileName){

  var blob = new Blob([res], { type: fileType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
  var fileName = fileName || "文件名";
  if (window.navigator.msSaveBlob) {  //没有此判断的话，ie11下的导出没有效果
    window.navigator.msSaveBlob(blob, unescape(fileName.replace(/\\u/g, '%u')));
  } else {
    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); //创建下载的链接

    downloadElement.href = href;
    downloadElement.download = unescape(fileName.replace(/\\u/g, '%u')); //下载后文件名

    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    console.log(111)
    document.body.removeChild(downloadElement); //下载完成移除元素

    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
}
