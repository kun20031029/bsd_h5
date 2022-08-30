<template>
  <div class="home-container ct-flex-box " :class="{'bottom-padding-fixed': !disabled }">
    <div class="cc-head block-w mb10">
      <div class="txt">
        <div class="title">排课意向</div>
        <div class="tit-desc">2022上学期老师排课时间意向采集</div>
      </div>
      <div class="pic">
        <img src="../assets/img/i5.png">
      </div>
    </div>
    <div class="list-reslt mb10" style="padding:0 20px">
      <ul>
        <li v-for="(item,index) in formArr" class="p-tt" :class="{'on': index == currentIndex }" @click="clickItem(item,index)">
          排课任务{{ index+1 }}
          <van-icon name="close" v-if=" disabled ?  !disabled :  formArr.length!=1" :disabled="disabled" @click.stop="clear(item,index)"></van-icon>
        </li>
        <li class="btn-li">
          <van-button icon="plus" type="primary" round small class="c-btn-blue" style="width:30px;height:30px;" :disabled="disabled" @click="addFromFn()" >
          </van-button>
        </li>
      </ul>
    </div>
    <div class="ct-flex-content">
      <div class="pad-class">
        <div class="block-w mb10">
          <div class="form-tit require">
            课程信息
          </div>

          <van-cell-group inset>
            <van-field type="text" readonly
                       v-model="formArr[currentIndex].class.chinese_name"
                       label="课程名称" >
              <template #button>
                <van-button size="small"  type="default" plain class="s-btn" @click="selectClassFn()" :disabled="disabled" >课程选择</van-button>
              </template>
            </van-field>
            <van-field v-model="formArr[currentIndex].class.xuefen" input-align="right" readonly placeholder="课程学分" :disabled="disabled" type="number" label="课程学分" />
          </van-cell-group>
        </div>
        <div class="block-w mb10" style="padding-bottom:10px">
          <div class="form-tit require">
            期望授课时间
          </div>
          <ul class="weeb-bd mb10">

            <li v-for="(item,index) in timeList" :class="{'on':index == timeIndex }" @click="getTab(item,index)">

              {{item.fenlei.fenlei}}
            </li>
          </ul>
          <div class="wek-btn-bd"  v-if="timeList[timeIndex] && timeList[timeIndex].dataList" >
<!--            {{timeList[timeIndex]}}-->

            <van-button size="small" v-for="(item,index) in timeList[timeIndex].dataList" :class="{'on': formArr[currentIndex].selectTime[item.id] == item.id }" type="default" plain  @click="getSelectTime(item,index)">
<!--            <van-button size="small"   v-for="(item,index) in formArr[currentIndex].currentTime.dataList" :class="{'on': formArr[currentIndex].selectTime[item.id] == item.id }" type="default" plain  @click="getSelectTime(item)">-->
              {{ item.shijian }}
              <van-icon slot="icon" name="time"></van-icon>
            </van-button>
          </div>
        </div>
        <div class="block-w mb10">
          <div class="form-tit require">
            教室类型
          </div>
          <van-radio-group v-model="formArr[currentIndex].jiaoshi_type" :disabled="disabled" class="jsTypeRadio" >
            <van-cell-group inset>
              <van-cell :title="item.mingzi" v-for="(item, index) in classList" clickable @click="statu ? false : (formArr[currentIndex].jiaoshi_type = item.id) ">
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

            <van-field v-model="formArr[currentIndex].yupairenshu" input-align="right" :disabled="disabled"  placeholder="预排人数" type="number" label="预排人数" />
          </van-cell-group>
        </div>
        <div class="block-w mb10">
          <div class="form-tit ">
            是否有楼层要求
          </div>
          <van-cell-group inset>

            <van-field v-model="formArr[currentIndex].loucengyaoqiu" input-align="right" :disabled="disabled"  placeholder="楼层要求" type="text" label="楼层要求" />
          </van-cell-group>
        </div>
        <div class="block-w mb10">
          <div class="form-tit ">
            老师
          </div>
          <van-cell-group inset>

            <van-field v-model="teacher.name" input-align="right" placeholder="老师" type="text" readonly  disabled label="老师" />
          </van-cell-group>
        </div>

      </div>
    </div>
    <div  class="bottom-bd bottom-box-fixed" v-if="!disabled">
      <van-button type="primary" block round class="c-btn-blue" @click="save()" :disabled="disabled"  >提交</van-button>
    </div>


    <selectPage v-if="selectShowIf"
                :show="popShow"
                :text="searchKey"
                @closeSelect="closeSelectFn"
                :searchList="searchList"
                @searchListFn="searchListFn"
                @setItem="setClassItem"></selectPage>
    <mydialog :showDialog="dialogShow" msg="提交成功" @closeSelect="closeDialog"></mydialog>
  </div>
</template>

<script>

import { getwekDayClass,getclasstype,savePk,getCommonList ,saveListPk,getPaikeInfo} from '@/api/api'
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
      statu:'',
      formArr:[{
          class:{},

          currentTime:{
            index : 0
          },
          selectTime:{},
      }],
      currentIndex:0,
      timeIndex:0,
      teacher:{},

      timeList : [],
      classList : [],
      dialogShow:false,
      searchList:[],
      disabled:false,

    }
  },

  created(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.statu = this.$route.query.statu;
    this.disabled = this.statu ? true:false;
    //获取当前老师
    let user = localStorage.getItem("USER");
    this.teacher = JSON.parse(user) || {};


    this.getData();

  },
  methods : {
    clear(item,index){
      if(index <= this.currentIndex){
        this.currentIndex --;
      }

      this.$delete(this.formArr,index) ;
    },
    error(curtent,idx){
      let error ;
      let str = "";
      for(let key in curtent.selectTime){
        if(curtent.selectTime[key]) str = str ? str + "," + key : key;
      }
      error || curtent.class.id || (error = "请选择课程");
      error || str || (error = "请选择授课时间");
      error || curtent.jiaoshi_type || (error = "请选择教室类型");
      error || curtent.yupairenshu || (error = "请填写预排人数");
      if(error){
        let msg = "当前排课还未填写完整:"
        if(idx){
          idx = idx +1;
          msg = "第" + idx + "页还未填写完整:"
        }
        this.$notify({ type: 'danger', message: msg + error });
        return;
      }
      return true;
    },
    clickItem(item,index){
      // if(!this.error()){
      //   return;
      // }
      this.currentIndex = index;
      this.timeIndex = 0;
    },
    addFromFn(){
      if(!this.error(this.formArr[this.currentIndex])){
        return;
      }
      let currentTime = this.timeList[0];
      currentTime.index = 0;
      let len = this.formArr.length;
      this.currentIndex = len;
      this.$set(this.formArr,len,{
        class: {},
        currentTime:currentTime,
        selectTime:{},
      })
      this.$set(this.formArr[len],'jiaoshi_type','')
    },
    closeSelectFn(){
      this.popShow = false;
      this.searchListFn();
    },
    async searchListFn(key){
      //选课
      let kcList = await getCommonList({
        name:key
      },(this.type == 1 ? true:false));
      if(kcList.code == 200){
        this.searchList = kcList.data;
      }
    },
    setClassItem(item){
      this.formArr[this.currentIndex].class = item;
      this.popShow=false;
    },

    async getData(){
      //选时间
      let wekDay = await getwekDayClass();
      // 选教室
      let clsList = await getclasstype();
      //选课
      await this.searchListFn();
      // this.searchList
      if(this.statu == 1){
        let details = await getPaikeInfo({
          xiaoxi_id:this.id
        });
        details = details.data;
        for(let i = 0; i < details.length; i ++){
          let temp = details[i];
          let eD = temp.expect_date,param = {};
          eD = eD.split(",");
          let classParam = {};
          this.searchList.forEach((value,index,ary)=>{
            if(value.id == temp.course_id){
              classParam = value;
            }
          })
          for(let j = 0; j < eD.length; j ++){
            let t = eD[j];
            param[t] = t;
          }
          this.$set(this.formArr,i,{
            class: classParam,
            currentTime: {
              index : i
            },
            selectTime:param,
            ...temp
          })
          this.teacher = {
            name : temp.tianbaoren
          }
        }

      }




      if(wekDay.code == 200){
        this.timeList = wekDay.data;
        this.formArr[this.currentIndex].currentTime = this.timeList[0];
        this.formArr[this.currentIndex].currentTime.index = 0;
      }
      if(clsList.code == 200){
        this.classList = clsList.data;
      }

    },
    getTab(item,idx){

      this.formArr[this.currentIndex].currentTime = item;
      this.formArr[this.currentIndex].currentTime.index = idx;
      this.timeIndex = idx;
    },
    getSelectTime(time,index){
      if(this.statu) return;
      if(this.formArr[this.currentIndex].selectTime[time.id]){
        this.$set(this.formArr[this.currentIndex].selectTime,time.id,null);
      }else
      this.$set(this.formArr[this.currentIndex].selectTime,time.id,time.id);


    },
    getExpectData(time){
      let str = "";
      for(let key in time){
        if(time) str = str ? str + "," + key : key;
      }
      return str;
    },
    save(){
      if(!this.error(this.formArr[this.currentIndex],this.currentIndex)){
        return;
      }
      let param = [];
      for(let i = 0; i < this.formArr.length; i ++){
        let item = this.formArr[i];
        let error = this.error(item,i);
        if(!error){
          return;
        }
        let str = this.getExpectData(item.selectTime);
        let obj = {
            course_id:item.class.id,
            expect_date:str,
            jiaoshi_type:item.jiaoshi_type,
            loucengyaoqiu:item.loucengyaoqiu,
            teache_id:this.teacher.id,
            yupairenshu:item.yupairenshu,
            xiaoxi_id:this.id || "5"
        };
        param.push(obj)
      }
      if(param.length){

      }else{
        this.$notify({ type: 'danger', message: "请先排课" });
      }
      this.$dialog.confirm({
        title:'提示',
        message:`当前总提交${param.length}个排课任务!`
      }).then(()=> {
        saveListPk(param).then((res)=>{
          if(res.code == 200){
            this.dialogShow = true;
          }
        })
      }).catch(()=>{

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
.jsTypeRadio .van-radio__icon--disabled.van-radio__icon--checked .van-icon{
  color: #fff;
  background-color: #1989fa;
  border-color: #1989fa;
}
</style>
<style scoped>

.pad-class{
  padding: 0 15px 20px 15px;
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
.list-reslt .p-tt{
  background:rgba(46, 108, 255, 0.1000);
  border-radius: 16px;
  height: 33px;
  line-height: 33px;
  font-size: 15px;
  color:#2E6CFF;
  padding: 0 10px;
}
.list-reslt .p-tt.on{
  border:1px solid #2E6CFF;
  background:#fff;
}

.list-reslt  .btn-li{
  line-height: 33px;
  top:-5px
}
.list-reslt li.on:after{
  content:none;
}
.list-reslt li .van-icon-close{
  /*position:absolute;*/
  font-size:16px;
  margin-left: 10px;
  line-height: inherit;

}

</style>
