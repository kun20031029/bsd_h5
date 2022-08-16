<template>
  <van-popup v-model:show="dialogVisible" position="top" :style="{ height: '100%',background:'#F8F9FD' }" >
    <div class="home-container ct-flex-box">
    <div class="block-w top-head-box">
      <div class="a-left-bd" @click="dialogVisible=false">
        <van-icon name="arrow-left" />
      </div>

    </div>
    <div class="block-w info-head mb10">
      <div class="card-list">
        <img :src="host + item.icon" class="c-img">
        <van-row class="v-item-bd">
          <van-col span="24" >
            <span style="font-size: 26px">{{ item.name }}</span>
          </van-col>
          <van-col span="24" style="font-size:19px;">{{ item.email}}</van-col>
        </van-row>
      </div>
    </div>
    <div class="block-w info-ct">
        <div class="i-tt">
          研究方向：
        </div>
        <div class="i-txt">
          {{ item.yanjiufangxiang }}
        </div>
      <div class="i-tt">
        近三年研究项目与成果：
      </div>
      <div class="i-txt">
        {{ item.zaiyanxiangmu }}
      </div>
      <div class="i-tt">
        指导计划：
      </div>

    </div>

  </div>
  </van-popup>
</template>

<script>

import { getDetail } from '@/api/api'
import fileBox from '@/components/file'

export default {
  components: {
    fileBox
  },
  props: {
    item:{
      type: Object
    },
    show:{
      type: Boolean
    }
  },
  computed: {
    dialogVisible: {
      get:function(){
        return this.show;
      },
      set:function () {
        return  this.$emit("closeComponent");
      }
    }
  },
  data() {
    return {
      type:'',
      id : '',
      host:''
    }
  },

  async created(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.host = await this.$getApi();
  },
  methods : {

  }

}
</script>

<style >
@import "../assets/style/css.css";



</style>
<style scoped>

.card-list .v-item-bd .van-col{
  height: 2em;
  line-height: 2em;
}
.info-head{
  padding: 10px 20px;
}
.card-list .c-img{
  width: 75px;
  height: 75px
}
.info-ct{
  margin: 0 15px 15px 15px;
  padding: 10px;
  line-height: 2em;
  border-radius: 11px;
}
.info-ct .i-tt{
  font-size: 15px;
}
.info-ct .i-txt{
  font-size:12px;
  word-break: break-all;
}
</style>
