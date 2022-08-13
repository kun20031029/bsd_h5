
<template>
  <van-popup v-model:show="dialogVisible" position="top" :style="{ height: '100%',background:'#F8F9FD' }" >
    <div class="select-box">
      <div class="head-search block-w mb10">
        <div class="search-bd">
          <van-field v-model="key" @keyup="getList"  :placeholder="text" >
            <van-icon name="search" slot="left-icon" />
            <van-icon name="close" slot="right-icon" @click="close" />
          </van-field>
        </div>

      </div>
      <ul class="selectList" v-if="type != '1'">
        <li class="block-w" v-for="(item,idx) in searchList" @click="itemClick(item)">
          <van-row>
            <van-col span="18" class="font15">{{ item.chinese_name }}</van-col>
            <van-col span="6" class="font12 fc3 ttRight">{{ item.cate }}</van-col>
            <van-col span="24" class="font12 fc3 ">课程学分：{{ item.xuefen }}分</van-col>
          </van-row>
        </li>
      </ul>
      <ul class="selectList selectList_user" v-else>
        <li class="block-w" v-for="(item,idx) in searchList" @click="itemClick(item)">
          <div class="card-list">
            <img :src="item.icon" class="c-img">
            <van-row class="v-item-bd">
              <van-col span="21" >
                <span class="font15">{{ item.name }}</span>
                <span class="font12 fc3">{{ item.yanjiufangxiang }}</span>
              </van-col>
              <van-col span="3" class="font16 fc3 ttRight" @click.stop="checkTeacherDetail(item)">
                <van-icon name="info-o" />
              </van-col>
              <van-col span="24" class="font12 fc3 ">{{ item.zaiyanxiangmu }}</van-col>
            </van-row>
          </div>

        </li>
      </ul>
    </div>
  </van-popup>

</template>
<script>
import { getCommonList } from '@/api/api'
export default{
  components:{
  },
  props: {
    searchList:{
      type: Array
    },
    show:{
      type: Boolean
    },
    text:{
      type: String
    },
    type:{
      type: String
    },
    param:{
      type: Object,
      value:{}
    }
  },


  methods:{
    checkTeacherDetail(item){
      this.$emit("checkTeacherDetail",item)
    },
    close(){
      this.key = "";
      this.$emit("closeSelect");
    },
    async getList(){
      this.$emit("searchListFn",this.key)
    },
    itemClick(item){
      this.$emit("setItem",item);

    }
  },
  computed: {
    dialogVisible: {
      get:function(){
        return this.show;
      },
      set:function () {
        return  this.$emit("closeSelect");
      }
    }
  },
  data(){
    return {
      key:'',
    }
  },

  mounted (){
  }
}
</script>
<style >
@import "../assets/style/css.css";
</style>
<style scoped>
  .select-box{
    height:100%;
    overflow-x:hidden;
    display: flex;
    flex-flow: column;

  }
  .select-box .head-search{
    padding: 30px 15px 10px 15px;
  }
  .select-box .head-search .search-bd{
    background:#F7F7F7;
    border-radius: 15px;
  }
  .search-bd .van-cell{
    background:transparent;
    padding: 3px 16px;
  }

</style>
