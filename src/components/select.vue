
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
        <li class="block-w" v-for="(item,idx) in list" @click="itemClick(item)">
          <van-row>
            <van-col span="18" class="font15">{{ item.chinese_name }}</van-col>
            <van-col span="6" class="font12 fc3 ttRight">{{ item.cate }}</van-col>
            <van-col span="24" class="font12 fc3 ">课程学分：{{ item.xuefen }}分</van-col>
          </van-row>
        </li>
      </ul>
      <ul class="selectList" v-else>
        <li class="block-w" v-for="(item,idx) in list" @click="itemClick(item)">
          <div class="card-list">
            <img src="">
            <van-row>
              <van-col span="21" >
                <span class="font15">{{ item.name }}</span>
                <span class="font12 fc3">{{ item.name }}</span>
              </van-col>
              <van-col span="3" class="font12 fc3 ttRight">{{ item.cate }}</van-col>
              <van-col span="24" class="font12 fc3 ">{{ item.xuefen }}</van-col>
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
    show:{
      type: Boolean
    },
    text:{
      type: String
    },
    type:{
      type: String
    }
  },


  methods:{
    close(){
      this.$emit("closeSelect");
    },
    async getList(){
      let res = await getCommonList({
        name: this.key
      },(this.type == 1 ? true:false));
      if(res.code == 200){
        this.list = res.data;
      }
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
      list:[]
    }
  },

  mounted (){
    this.getList();
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
  .selectList{
    padding: 0 15px
  }
  .selectList li{
    margin-bottom: 10px;
    padding: 8px 15px;
    line-height: 25px;
    border-radius: 11px;
  }
  .card-list{
    display: flex;
  }
</style>
