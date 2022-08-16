<template>
  <div class="home-container ct-flex-box bottom-padding-fixed">
    <div class="cc-head block-w">
      <div class="txt">
        <div class="title">本科新生导师</div>
        <div class="tit-desc">{{ type == "1" ? "学生":"老师"}}通知</div>
      </div>
      <div class="pic">
        <img src="../assets/img/i5.png">
      </div>
    </div>
    <div class="ct-flex-content">
      <div class="pad">
        <div class="block-w dt-ct">
          <div class="s-hd">
            {{ type ? "恭喜了！" : "指导学生名单" }}
          </div>
          <div class="s-ct">
            <div class="card-list" v-for='(item,index) in data'>
              <div class="cd-icon">{{ type ? "导" : index+1 }}</div>
              <van-row class="v-item-bd">
                <van-col span="18" >
                  <span class="font15">{{ item.name }}</span>
                  <span class="font12 fc3"> {{item.tags || item.grade}}</span>
                </van-col>
                <van-col span="6" class="ttRight">
                  <span class="font15" style="color:#2E6CFF">{{ item.xuehao }}</span>
                </van-col>
                <van-col span="24" class="font12" v-if="item.email">{{ item.email}}</van-col>
              </van-row>
            </div>
          </div>

        </div>
      </div>


    </div>
    <div  class="bottom-bd bottom-box-fixed">
      <van-button type="primary" block round class="c-btn-blue" @click="save(1)">确认</van-button>
    </div>


  </div>
</template>

<script>

import { taskResultSave ,getNoticeObj} from '@/api/api'
import fileBox from '@/components/file'

export default {
  components: {
    fileBox
  },
  data() {
    return {
      type:'',
      id : '',
      data:{
      },
    }
  },

  created(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.key = this.type ? "teacher":"student";
    this.getData();
  },
  methods : {
    async getData(){
      let res = await getNoticeObj(this.type);
      if(res.code == 200){
        if(this.type) this.data = res.data ? [res.data.teacher] : [];
        else this.data = res.data || [];
      }
    },
    save(statu){
      taskResultSave({"xiaoxi_id":this.id,"zhuangtai":1},this.type).then((res)=>{
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
  padding: 15px 0 ;
}
.bottom-bd-more .van-button{
  width: 40%;
  margin:0 4%;
}
.card-list{
  align-items: center;
  padding: 15px 0;
  border-bottom:1px solid #efefef;
  margin:0 15px;
}
.card-list .cd-icon{
  background:rgba(46, 108, 255, 0.1000);
  width:32px;
  height:32px;
  border-radius: 50%;
  margin-right:15px;
  line-height: 32px;
  text-align: center;
  color:#2E6CFF;
  font-size:12px;
  font-weight: bold;
}
</style>
