<template>
  <div class="home-container ct-flex-box">
      <div class="cc-head block-w">
        <div class="txt">
          <div class="title">北师大心理学部</div>
          <div class="tit-desc">{{ status == "0" ? "待办任务" : "已办任务" }}</div>
        </div>
        <div class="pic">
          <img src="../assets/img/i5.png">
        </div>
      </div>
    <ul class="taskList" v-if="list.length">
      <li class="block-w" v-for="(item,idx) in list" @click="itemClick(item)">
        <van-row>
          <van-col span="18" class="font15 overCell ">{{ item.biaoti }}</van-col>
          <van-col span="6" class="font12 fc3 ttRight">{{ item.shijian | DATEFORMATE("mm月dd日") }}</van-col>
          <van-col span="24" class="font12 fc3 overCell ">{{ item.neirong }}</van-col>
        </van-row>
      </li>
    </ul>
    <div v-else class="taskList list-empty">
      <img src="../assets/img/e2.png">
      <div class="font13 fc3">暂无{{ status == "0" ? "待办任务" : "已办任务" }}</div>
    </div>
  </div>
</template>

<script>

import { getTask } from '@/api/api'

export default {
  components: {

  },
  data() {
    return {
      type:false,
      status:"0",
      list : []
    }
  },

  created(){
    this.type = this.$route.query.type;
    this.status = this.$route.query.status
    this.getData();
  },
  methods : {
    async getData(){
      let res = await getTask({
        task_status:this.status
      },this.type);
      if(res.code == 200){
        this.list = res.data;
      }
    },
    itemClick(item){
      this.$router.push({
        path: '/details',
        query: {
          type:this.type,
          id:item.id
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

</style>
