<template>
  <div class="home-container ct-flex-box bottom-padding-fixed">
    <div class="cc-head block-w">
      <div class="txt">
        <div class="title">学术硕士招生</div>
        <div class="tit-desc">请{{ type == "1" ? "学生":"老师"}}确认</div>
      </div>
      <div class="pic">
        <img src="../assets/img/i5.png">
      </div>
    </div>
    <div class="ct-flex-content">
      <div class="pad">
        <div class="block-w dt-ct">
          <div class="s-hd">
            {{ data.biaoti }}
          </div>
          <div class="s-ct font15">
            {{ data.neirong }}
          </div>

        </div>
      </div>


    </div>
    <div  class="bottom-bd bottom-box-fixed"
          v-if="data.leixing=='paike_task_result' || data.leixing=='laoshi_benke_daoshi_jieguo' || data.leixing=='yanjiusheng_paike_task_result'">
      <van-button type="primary" block round class="c-btn-blue" @click="save(1)">确认</van-button>
    </div>
    <div  class="bottom-bd ttCenter bottom-bd-more bottom-box-fixed" v-else>
      <van-button  type="default" plain round  class="c-btn-gray" @click="save(1)">不参加</van-button>
      <van-button type="primary"  round class="c-btn-blue" @click="save(2)">参加</van-button>
    </div>

  </div>
</template>

<script>

import { getDetail,taskResultSave } from '@/api/api'
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
        this.data = res.data;
      }
    },
    save(statu){
      taskResultSave({"xiaoxi_id":this.id,"zhuangtai":statu},this.type).then((res)=>{
        if(res.code == 200){
          this.$toast.success(res.msg);
          this.$router.go(-1);
        } else this.$toast.fail(res.msg);
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
  padding: 10px 15px;
}
.ct-flex-content .block-w{
  padding: 0;
  border-radius: 11px;
}
.dt-ct{
  padding:11px;
  line-height: 30px;
}
.dt-ct .s-hd{
  background:url(../assets/img/bg2.png) no-repeat center center;
  background-size: 100%;
  min-height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#fff;
  font-size:21px;
  padding: 0 20px
}
.dt-ct .s-ct{
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-all;
  padding: 0 20px 20px 20px;
}
.bottom-bd-more .van-button{
  width: 40%;
  margin:0 4%;
}
</style>
