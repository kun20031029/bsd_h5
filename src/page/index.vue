<template>
  <div class="home-container">
    <div class="pad block-w mb20">
      <div class="home-tit">您好，{{ data[typeKey] ? data[typeKey].name : '--' }}</div>
      <div class="showTab " :class="{'studentShowTab': typeKey == 'student' }">
        <van-row>
          <van-col span="12" v-if="typeKey != 'student'">
            <div class="t-flex">
              <div class="tt">
                目标学时
              </div>
              <div class="tt-desc">
                {{ data[typeKey] && data[typeKey].jindu ? data[typeKey].jindu.total_xueshi : 0 }}
                <span>学时</span>
              </div>
            </div>
          </van-col>
          <van-col span="12" v-if="typeKey != 'student'">
            <div class="t-flex">
              <div class="tt">
                已完成
              </div>
              <div class="tt-desc">
                {{ data[typeKey] && data[typeKey].jindu ? data[typeKey].jindu.yiwancheng : 0 }}
                <span>学时</span>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>

    </div>
    <ul class="list-index">
      <li>
        <div class="c-flex block-w">
          <div class="tt">
            <van-icon slot="left-icon" class-prefix="my-icon" name="dbicon" />
            待办任务
          </div>
          <div class="item" v-for="(item,idx) in data.daibanList" v-if="data.daibanList.length"  @click="clickItem(item)">
            <van-row>
              <van-col span="18" class="font15">{{ item.biaoti }}</van-col>
              <van-col span="6" class="font12 fc3 ttRight">{{ item.shijian | DATEFORMATE("mm月dd日") }}</van-col>
              <van-col span="24" class="font12 fc3 overCell">{{ item.neirong }}</van-col>
            </van-row>
            <van-icon  name="arrow" />
          </div>
          <div class="item item-empty" v-else>
            <img src="../assets/img/e.png">
          </div>
          <van-icon class-prefix="my-icon" name="more"   @click="goto(0)" />
        </div>
      </li>
      <li>
        <div class="c-flex block-w">
          <div class="tt">
            <van-icon slot="left-icon" class-prefix="my-icon" name="ybicon" />
            已办任务
          </div>
          <div class="item" v-for="(item,idx) in data.yibanList" v-if="data.yibanList.length" @click="clickItem(item)">
            <van-row>
              <van-col span="18" class="font15">{{ item.biaoti }}</van-col>
              <van-col span="6" class="font12 fc3 ttRight">{{ item.shijian | DATEFORMATE("mm月dd日") }}</van-col>
              <van-col span="24" class="font12 fc3 ">{{ item.neirong }}</van-col>
            </van-row>
            <van-icon  name="arrow" />
          </div>
          <div class="item item-empty" v-else>
            <img src="../assets/img/e.png">
          </div>
          <van-icon class-prefix="my-icon" name="more"   @click="goto(1)"  />
        </div>
      </li>
    </ul>


  </div>
</template>

<script>

import { getIndexData } from '@/api/api'

export default {
  components: {

  },
  data() {
    return {
      type:false,
      typeKey : 'teacher',
      data : {
        daibanList:[],
        yibanList:[],
        teacher:{}
      }
    }
  },

  created(){
    this.type = this.$route.query.type;
    this.typeKey = this.type ? "student" : "teacher";
    this.getData();
  },
  methods : {
      async getData(){
        let res = await getIndexData(this.type);
        if(res && res.code == 200){
          this.data = res.data;
          console.log(this.data)
        }
      },
    clickItem(item){
      this.$router.push({
        path: '/details',
        query: {
          type:this.type,
          id:item.id
        }
      })
    },
    goto(type){
      this.$router.push({
        path: '/task',
        query: {
          type:this.type,
          status: type,
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
.home-tit{
  line-height: 2em;
  font-size:26px;
  padding: 30px 20px 20px 20px;
}
.t-flex{
  display: flex;
  align-items: center;
  justify-content: center;
  color:#fff;
  font-size:12px;
  width:100%;
  height:140px;
  flex-flow: column;
  line-height: 2em;
  position:relative;
}
.t-flex:after{
  content:"";
  width:1px;
  background:#fff;
  height:20px;
  top:60px;
  right:0;
  position: absolute;
}
.t-flex:last-child:after{
  content:none
}
.showTab{
  padding-bottom:20px;
}
.showTab .van-row{
  background:url(../assets/img/bg.png) no-repeat;
  background-size:100% 100%;
  height:140px;
}
.studentShowTab .van-row{
  background-image: url(../assets/img/bg3.png);
}
.t-flex .tt-desc{
  font-size:25px;
}
.t-flex .tt-desc span{
  font-size:12px;
  margin-left:8px
}
.c-flex{
  position:relative;
  padding: 20px;
  border-radius: 11px;
}
.list-index li{
  padding:10px 25px 10px 15px;
  margin-bottom:20px
}
.c-flex .tt{
  font-size:20px;
  margin-bottom:15px;
  border-bottom: 1px solid #efefef;
  padding-bottom: 15px;
}
.c-flex .my-icon-more{
  position:absolute;
  right:-20px;
  top:10px
}
.c-flex .item{
  line-height: 1.5em;
  position:relative;
}
.c-flex .item .van-icon-arrow{
  position:absolute;
  right:0;
  top: calc( 50% + 5px);
  color:#999;
  font-size:12px;
}
.item-empty img{
  width:100%;
  height:62px;
}
</style>
