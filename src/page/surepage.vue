<template>
  <div class="home-container ct-flex-box">
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
      <div class="block-w">
        <div class="s-hd">

        </div>


      </div>

    </div>
    <div v-if="data.task_result == '0'" class="bottom-bd">
      <van-button type="primary" block round class="c-btn-blue" @click="goto()">处理</van-button>
    </div>

  </div>
</template>

<script>

import { getDetail } from '@/api/api'
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
    goto(item){

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
