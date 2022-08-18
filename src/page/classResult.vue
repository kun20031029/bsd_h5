<template>
  <div class="home-container ct-flex-box bottom-padding-fixed">
    <div class="cc-head block-w">
      <div class="txt">
        <div class="title">北师大心理学部</div>
        <div class="tit-desc">通知详情</div>
      </div>
      <div class="pic">
        <img src="../assets/img/i5.png">
      </div>
    </div>
    <div class="ct-flex-content">
      <div class="pad">
        <div class="list-reslt mb10">
          <ul>
            <li v-for="(item,index) in data" :class="{'on': index == currentIndex }" @click="clickItem(item,index)">{{ item.c_kechengming }}</li>
          </ul>
        </div>
        <div class="block-w r-cont mb10">
          <div class="pk-title">课程信息</div>
          <van-cell-group>
            <van-cell title="课程类别" :value="currentItem.c_kechengleibie" />
            <van-cell title="课程代码" :value="currentItem.c_kechengdaima" />
            <van-cell title="课程名" :value="currentItem.c_kechengming" />
            <van-cell title="学分" :value="currentItem.c_xuefen" />
            <van-cell title="周学时" :value="currentItem.c_zhouxueshi" />
            <van-cell title="考核方式" :value="currentItem.c_kaohefangshi"/>
            <van-cell title="随堂考试" :value="currentItem.c_suitangkaoshi" />
            <van-cell title="考试周次" :value="currentItem.c_kaoshizhouci" />
            <van-cell title="成绩构成" :value="currentItem.c_chengjigoucheng" />
          </van-cell-group>
        </div>
        <div class="block-w r-cont mb10">
          <div class="pk-title">上课班级信息</div>
          <van-cell-group>
            <van-cell title="周次" :value="currentItem.c_zhouci"/>
            <van-cell title="授课方式" :value="currentItem.c_shoukefangshi" />
            <van-cell title="适应性别" :value="currentItem.c_shiyingxingbie"/>
            <van-cell title="适应学号" :value="currentItem.c_shiyingxuehao" />

          </van-cell-group>
        </div>
        <div class="block-w r-cont mb10">
          <div class="pk-title">教师信息</div>
          <van-cell-group>
            <van-cell title="上课班号" :value="currentItem.c_shangkebanhao" />
            <van-cell title="上课班级名称" :value="currentItem.c_shangkebanjimingcheng" />
            <van-cell title="连上节数" :value="currentItem.c_lianshangjieshu" />
            <van-cell title="任课教师" :value="currentItem.c_renkejiaoshi" />

            <van-cell title="上课时间" :value="currentItem.c_shangkeshijian" />
            <van-cell title="上课地点" :value="currentItem.c_shangkedidian" />

          </van-cell-group>
        </div>
        <div class="block-w r-cont">
          <div class="pk-title">学生信息</div>
          <van-cell-group>
            <van-cell title="授课对象" />
            <van-cell >
              <van-field
                v-model="currentItem.c_shoukeduixiang"
                rows="1"
                autosize
                type="textarea"
                readonly
              />
            </van-cell>
            <van-cell title="排课人数" :value="currentItem.c_paikerenshu" />


          </van-cell-group>
        </div>
      </div>


    </div>
    <div class="bottom-bd bottom-box-fixed" v-if="!disabled">
      <van-button type="primary" block round class="c-btn-blue" @click="save()">确认</van-button>
    </div>

  </div>
</template>

<script>

import { getPaikeResult } from '@/api/api'


export default {
  components: {

  },
  data() {
    return {
      type:'',
      id : '',
      data:[],
      currentItem:{},
      currentIndex:0,
      disabled:false
    }
  },

  created(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.disabled = this.$route.query.statu ? true:false;
    this.getData();
  },
  methods : {
    clickItem(item,index){
      this.currentIndex = index;
      this.currentItem = item;
    },
    async getData(){
      let res = await getPaikeResult({
        xiaoxiId : this.id
      });
      if(res.code == 200){
        this.data = res.data || [];
        this.currentItem = this.data[0];
      }
    },
    save(){
      taskResultSave({"xiaoxi_id":this.id,"zhuangtai":1}).then((res)=>{
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
  padding: 15px;
}
.ct-flex-content .block-w{
  padding: 15px;
  border-radius: 11px;
}
.pk-title{
  font-size:17px;
  line-height: 2em;
}

.r-cont .van-cell{
  padding-left: 0;
  padding-right:0
}
.r-cont  .van-hairline--top-bottom::after,
.r-cont .van-hairline-unset--top-bottom::after{
  border-width: 0 ;
}

.r-cont .pk-title{
  line-height: 2em;
}
</style>
