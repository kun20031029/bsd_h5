
<template>
  <div class="file-box" v-if="list.length">
    <ul>
      <li v-for="(item,index) in list" v-if="item" @click="downloadEvt(item.url,item.name)" :data-url="host+item.url" >
        <van-icon name="file" class-prefix="my-icon"></van-icon>
        <span class="tit">{{item.name}}</span>
      </li>
    </ul>

  </div>
</template>
<script>
import { getApi } from '@/api/api'
export default{
  components:{
  },
  props: {
      file:{
        type: String
      }

  },


  methods:{
    downloadEvt(url, fileName = '未知文件') {
      const el = document.createElement('a');
      el.style.display = 'none';
      // el.setAttribute('target', '_blank');
      /**
       * download的属性是HTML5新增的属性
       * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
       * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
       * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
       */
      fileName && el.setAttribute('download', fileName);
      el.href = this.host + url;
      console.log(el);
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    }

  },

  data(){
    return {
      list : [],
      host:''
    }
  },

  async mounted (){
    this.host = await this.$getApi();
    let arr = this.file ? this.file.split(",") : [];
    for(let i = 0; i < arr.length; i ++){
      let item = arr[i];
      if(item){
        let name = item.substring(item.lastIndexOf("/"),item.lastIndexOf("."))
        this.list.push({
          name : name,
          url : item
        })
      }

    }
    // this.list = this.file ? this.file.split(",") : [];
  }
}
</script>
<style scoped>
.file-box li{
  padding: 5px 0;
  line-height: 25px;
  font-size: 15px;
  height: 31px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.my-icon-file{
  margin-right:5px;
}
</style>
