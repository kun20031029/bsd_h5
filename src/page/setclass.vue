<template>
  <div class="home-container ct-flex-box">
    <div class="cc-head block-w">
      <div class="txt">
        <div class="title">排课意向</div>
        <div class="tit-desc">2022上学期老师排课时间意向采集</div>
      </div>
      <div class="pic">
        <img src="../assets/img/i5.png">
      </div>
    </div>
    <div class="ct-flex-content">
      <div class="pad-class">
        <div class="block-w mb10">
          <div class="form-tit require">
            课程信息
          </div>

          <van-cell-group inset>
            <van-field type="text" readonly
                       v-model="form.class.chinese_name"
                       label="课程名称" >
              <template #button>
                <van-button size="small"  type="default" plain class="s-btn" @click="selectClassFn()" >课程选择</van-button>
              </template>
            </van-field>
            <van-field v-model="form.class.xuefen" input-align="right" readonly placeholder="课程学分" type="number" label="课程学分" />
          </van-cell-group>
        </div>
        <div class="block-w mb10" style="padding-bottom:10px">
          <div class="form-tit require">
            期望授课时间
          </div>
          <ul class="weeb-bd mb10">
            <li v-for="(item,index) in timeList" :class="{'on':item.fenlei.fenlei == currentTime.fenlei.fenlei }" @click="getTab(item)">{{item.fenlei.fenlei}}</li>
          </ul>
          <div class="wek-btn-bd">
            <van-button size="small"   v-for="(item,index) in currentTime.dataList" :class="{'on': selectTime[item.id] == item.id }" type="default" plain  @click="getSelectTime(item)">
              {{ item.shijian }}
              <van-icon slot="icon" name="time"></van-icon>
            </van-button>
          </div>
        </div>
        <div class="block-w mb10">
          <div class="form-tit require">
            教室类型
          </div>
          <van-radio-group v-model="form.jiaoshi_type">
            <van-cell-group inset>
              <van-cell :title="item.mingzi" v-for="(item, index) in classList" clickable @click="form.jiaoshi_type = item.id ">
                <template #right-icon>
                  <van-radio :name="item.id" />
                </template>
              </van-cell>

            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="block-w mb10">
          <div class="form-tit require">
            预排人数
          </div>
          <van-cell-group inset>

            <van-field v-model="form.yupairenshu" input-align="right" placeholder="预排人数" type="number" label="预排人数" />
          </van-cell-group>
        </div>
        <div class="block-w mb10">
          <div class="form-tit ">
            是否有楼层要求
          </div>
          <van-cell-group inset>

            <van-field v-model="form.loucengyaoqiu" input-align="right" placeholder="楼层要求" type="text" label="楼层要求" />
          </van-cell-group>
        </div>
        <div class="block-w mb10">
          <div class="form-tit ">
            老师
          </div>
          <van-cell-group inset>

            <van-field v-model="form.teacher.name" input-align="right" placeholder="老师" type="text" readonly  disabled label="老师" />
          </van-cell-group>
        </div>

      </div>
    </div>
    <div  class="bottom-bd">
      <van-button type="primary" block round class="c-btn-blue" @click="save()">提交</van-button>
    </div>


    <selectPage v-if="selectShowIf"
                :show="popShow"
                :text="searchKey"
                @closeSelect="popShow=false"
                @setItem="setClassItem"></selectPage>
    <mydialog :showDialog="dialogShow" msg="提交成功" @closeSelect="closeDialog"></mydialog>
  </div>
</template>

<script>

import { getwekDayClass,getclasstype,savePk } from '@/api/api'
import selectPage from '@/components/select'
import mydialog from '@/components/mydialog'

export default {
  components: {
    selectPage,
    mydialog
  },
  data() {
    return {
      selectShowIf:false,
      searchKey:'请输入要搜索的课程名字',
      popShow:false,
      type:'',
      id : '',
      form:{
        jiaoshi_type:'',
        class:{},
        teacher:{},
      },
      currentTime:{ },
      selectTime:{},
      timeList : [],
      classList : [],
      dialogShow:false

    }
  },

  created(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    //获取当前老师
    let user = sessionStorage.getItem("USER");
    this.form.teacher = JSON.parse(user);
    this.getData();
  },
  methods : {
    setClassItem(item){
      this.form.class = item;
      this.popShow=false;
    },
    async getData(){
      //选时间
      let wekDay = await getwekDayClass();
      // 选教室
      let clsList = await getclasstype();
      if(wekDay.code == 200){
        this.timeList = wekDay.data;
        this.currentTime = this.timeList[0]
      }
      if(clsList.code == 200){
        this.classList = clsList.data;
      }
    },
    getTab(item){
      this.currentTime = item;
    },
    getSelectTime(time){
      if(this.selectTime[time.id]){
        this.$set(this.selectTime,time.id,null)
      }else
      this.$set(this.selectTime,time.id,time.id)
    },
    save(){

      let str = "";
      for(let key in this.selectTime){
        str = str ? str + "," + key : key;
      }
      let error ;
      error || this.form.class.id || (error = "请选择课程");
      error || str || (error = "请选择授课时间");
      error || this.form.jiaoshi_type || (error = "请选择教室类型");
      error || this.form.yupairenshu || (error = "请填写预排人数");
      if(error){
        this.$notify({ type: 'danger', message: error });
        return;
      }


      let param = {
        course_id:this.form.class.id,
        expect_date:str,
        jiaoshi_type:this.form.jiaoshi_type,
        loucengyaoqiu:this.form.loucengyaoqiu,
        teache_id:this.form.teacher.id,
        yupairenshu:this.form.yupairenshu,
        xiaoxi_id:this.id
      };

      savePk(param).then((res)=>{
        if(res.code == 200){
          this.dialogShow = true;
        }
      })

    },
    closeDialog(type){
      this.dialogShow = false;
      if(!type){
        this.$router.go(-1)
      }
    },
    selectClassFn(){
        this.popShow = !this.popShow;
        this.selectShowIf = true;
    }

  }

}
</script>

<style >
@import "../assets/style/css.css";
</style>
<style scoped>

.pad-class{
  padding: 10px 20px;
}

.block-w{
  border-radius: 11px;
}
.pad-class .block-w{
  padding: 0 15px;
}
.weeb-bd{
  overflow-y:hidden;
  height:50px;
  line-height: 50px;
  display: flex;
  border-bottom:1px solid #efefef;
}

.weeb-bd li{
  min-width: 70px;
  width: 70px;
  margin-right:10px;
  font-size:15px;
  position:relative;
}
.weeb-bd li.on:after{
  position:absolute;
  bottom:0px;
  width:33px;
  height:3px;
  background:#2E6CFF;
  content:" ";
  left:6px;
}
.wek-btn-bd .van-button{
  min-width: 80px;
  border-radius: 8px;
  height: 40px;
  margin-right: 10px;
  position: relative;
  border: 1px solid #efefef;
}
.wek-btn-bd .van-button.on{
  background:rgba(46, 108, 255, 0.2);
  color:#2E6CFF;
  border: 1px solid #2E6CFF;
}
.wek-btn-bd .van-button.on .van-icon-time{
  background:url(../assets/img/i7.png) no-repeat center center;
  width:18px;
  height:18px;
  background-size: 18px 18px;
  position:absolute;
  right:0;
  bottom:0;
}
.pad-class .van-cell{
  padding-left:0;
  padding-right:0;
}
.pad-class .van-cell-group--inset{
  margin:0;
}
.s-btn{
  color:#2E6CFF;
  font-size:15px;
  border:1px solid #2E6CFF;
  border-radius: 24px;
  height:32px;
}
</style>
