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

    </ul>

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

    },
    itemClick(item){

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
