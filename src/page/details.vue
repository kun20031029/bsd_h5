<template>
  <div class="home-container ct-flex-box bottom-padding-fixed">
    <div class="cc-head block-w">
      <div class="txt">
        <div class="title">{{ title || '--' }}</div>
        <div class="tit-desc">通知详情</div>
      </div>
      <div class="pic">
        <img src="../assets/img/i5.png">
      </div>
    </div>
    <div class="ct-flex-content">
      <div class="pad">
        <div class="block-w pad-ct mb20">
          <van-row class="mb10">
            <van-col span="18" class="font15">{{ data.biaoti }}</van-col>
            <van-col span="6" class="font12 fc3 ttRight">{{ data.shijian | DATEFORMATE("mm月dd日") }}</van-col>
          </van-row>
          <van-row>
            <van-col span="24" class="font12 fc3 " style="  line-height: 2em;  word-break: keep-all;overflow-wrap: break-word;">{{ data.neirong }}</van-col>
          </van-row>
        </div>
        <div class="block-w  mb20" v-if="data.fujian">
          <div class="font15 mb10 bor-bt pad10">附件</div>
          <fileBox :file="data.fujian"></fileBox>
        </div>

      </div>

    </div>
    <div class="bottom-bd bottom-box-fixed" >
      <van-button type="primary" block round class="c-btn-blue" v-if="data.task_status == 0"  @click="goto()">处理</van-button>
      <van-button type="primary" block round class="c-btn-blue" v-else @click="goto(1)">查看</van-button>
    </div>

  </div>
</template>

<script>

import { getDetail,getLeiXingList } from '@/api/api'
import fileBox from '@/components/file'

export default {
  components: {
    fileBox
  },
  data() {
    return {
      type:'',
      id : '',
      data:{},
      title : ''
    }
  },

  created(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.getData();
  },
  methods : {
    async getData(){
      let res = await getDetail({
        xiaoxiId : this.id
      },this.type);
      if(res.code == 200){
        this.data = res.data || {};
      }
      let listRes = await this.$getCommonType({
        mubiao:this.type ? "2" : "1"
      },this.data.leixing);
      this.title = listRes.mingcheng;
    },
    goto(sign){
      let item = this.data;


      // if(item.task_status != 0){
      //   return;
      // }
      let url = "",param = {};
      switch (item.leixing){

        case "paike_task":  //排课任务
        case "paike_task_yanjiusheng":
          url = '/setclass'
          break;
        case "benke_xinsheng_daoshi":
        case "benke_xinsheng_daoshi_to_xuesheng":
          url = "/guiding"
          break;
        case "paike_task_result":
        case "yanjiusheng_paike_task_result":
          url = "/classResult"
          break;
        case "xuesheng_benke_daoshi_jieguo":
        case "laoshi_benke_daoshi_jieguo":
          url = "/notice"
          break;
        default:
          url = "/surepage"
          break;

      }
      url && this.$router.push({
        path : url,
        query : {
          type : this.type,
          id: this.id,
          statu:sign
        }
      })
    }
  }

}
</script>

<style >
@import "../assets/style/css.css";



</style>
<style scoped>
.taskList{
  padding:15px;
  flex:1;
  overflow-x:hidden;
}
.taskList li{
  padding: 9px 15px;
  border-radius: 11px;
  margin-bottom: 10px;
  line-height: 25px;
}
.ct-flex-content .pad{
  padding: 20px;
}
.ct-flex-content .block-w{
  padding: 15px;
  border-radius: 11px;
}


</style>
