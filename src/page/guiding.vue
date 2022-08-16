<template>
  <div class="home-container ct-flex-box bottom-padding-fixed">
    <div class="cc-head block-w">
      <div class="txt">
        <div class="title">本科新生导师</div>
        <div class="tit-desc">{{type ? "请填写导师申报指导意向" : "请填写学生意向请求"}}</div>
      </div>
      <div class="pic">
        <img src="../assets/img/i5.png">
      </div>
    </div>
    <div class="ct-flex-content">
      <div class="pad-class">
        <div class="block-w mb10" v-if="!type">
          <div class="form-tit ">
            指导意向
          </div>

          <van-cell-group inset>

            <van-field v-model="form.yanjiufangxiang" input-align="right"  placeholder="研究方向" type="text" label="研究方向" />
            <van-field v-model="form.zaiyanxiangmu"
                       input-align="left"
                       placeholder="在研项目"
                       type="textarea"
                       rows="4"
                       label="在研项目" />
          </van-cell-group>
          <van-cell-group inset>

            <van-field input-align="right"
                       placeholder="指导学生数量"
                       type="text"
                       label="指导学生数量" >
              <template #input>
                <van-stepper v-model="form.zhidaoshuliang" input-width="60px" button-size="32px" />
              </template>
            </van-field>

            <van-field v-model="form.teacher.name"
                       input-align="right"
                       placeholder="老师"
                       type="text"
                       readonly
                       disabled label="导师" />

          </van-cell-group>

        </div>
        <div class="block-w mb10" v-else>
          <div class="form-tit ">
            意向导师
          </div>
          <van-cell-group inset>

            <van-field v-model="form.teacher1.name"
                       input-align="right"
                       placeholder="可选导师"
                       type="text"
                       is-link
                       readonly
                       label="可选导师"
                       @click="selectTeacher('teacher1')"
            />
            <van-field v-model="form.teacher2.name"
                       input-align="right"
                       placeholder="期望导师"
                       type="text"
                       is-link
                       readonly
                       @click="selectTeacher('teacher2')"
                       label="期望导师" />
            <van-field v-model="form.student.name"
                       input-align="right"
                       placeholder="学生"
                       type="text"
                       readonly
                       label="学生" />

          </van-cell-group>
        </div>


      </div>
    </div>
    <div  class="bottom-bd bottom-box-fixed" v-if="!type">
      <van-button type="primary" block round class="c-btn-blue" @click="save()">提交</van-button>
    </div>
    <div  class="bottom-bd bottom-box-fixed" v-else>
      <van-button type="primary" block round class="c-btn-blue" @click="saveStu()">提交</van-button>
    </div>

    <selectPage v-if="selectShowIf"
                :show="popShow"
                :text="searchKey"
                @closeSelect="closeSelectPageFn"
                @setItem="setClassItem"
                @searchListFn="searchListFn"
                :searchList="searchList"
                :type="type"
                @checkTeacherDetail="checkTeacherDetail"
                :param="searchParam"
    ></selectPage>
    <mydialog :showDialog="dialogShow" :btnMore="false" msg="提交成功" @closeSelect="closeDialog"></mydialog>
    <teacherPage :item="teacherItem" :show="teachShow" @closeComponent="teachShow=false"></teacherPage>
  </div>
</template>

<script>

import { saveNumStudent,getCommonList,selectTeacher } from '@/api/api'
import selectPage from '@/components/select'
import mydialog from '@/components/mydialog'
import teacherPage from '@/components/teacherDetail'

export default {
  components: {
    selectPage,
    mydialog,
    teacherPage
  },
  data() {
    return {
      teacherItem:{},
      teachShow:false,
      selectShowIf:false,
      popShow:false,
      searchKey:'请输入要搜索的导师',
      type:'',
      id : '',
      curentKey:'',
      form:{
        teacher:{},
        teacher1:{},
        teacher2:{}
      },
      searchList:[],
      dialogShow:false,
      searchParam:{}

    }
  },

  created(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    //获取当前老师
    let user = localStorage.getItem("USER");


    let keyStatu = this.type ? "student" : "teacher";

    this.form[keyStatu] = JSON.parse(user) || {};
  },
  methods : {
    closeSelectPageFn(){
      this.popShow=false;
      this.searchListFn();
    },
    checkTeacherDetail(item){
      this.teacherItem = item;
      this.teachShow = true;
    },
    async searchListFn(key){
      this.searchParam.name=key;
      let res = await getCommonList(this.searchParam,(this.type == 1 ? true:false));
      if(res.code == 200){
        this.searchList = res.data;
      }
    },
    selectTeacher(key){
      this.curentKey = key;
      this.popShow = !this.popShow;
      this.selectShowIf = true;

      this.searchParam = {
        searchQiwangDaoshi:"all"
      }
      if(key == "teacher1"){
        this.searchParam = {}
      }
      this.searchListFn();
    },
    setClassItem(item){
      this.form[this.curentKey] = item;
      this.popShow =false;
    },
    save(){

      let error ;
      error || this.form.yanjiufangxiang || (error = "请填写研究方向");
      error || this.form.zaiyanxiangmu || (error = "请填写在研项目");
      error || this.form.zhidaoshuliang || (error = "请填写学生数量");
      if(error){
        this.$notify({ type: 'danger', message: error });
        return;
      }


      let param = {
        yanjiufangxiang:this.form.yanjiufangxiang,
        zaiyanxiangmu:this.form.zaiyanxiangmu,
        zhidaoshuliang:this.form.zhidaoshuliang,
        xiaoxi_id:this.id,
        techer_id:this.form.teacher.id
      };

      saveNumStudent(param).then((res)=>{
        if(res.code == 200){
          this.dialogShow = true;
        }
      })

    },
    saveStu(){
      if( (this.form.teacher1 && this.form.teacher1.id) || (this.form.teacher2 && this.form.teacher2.id)){
        selectTeacher({
          xiaoxi_id:this.id,
          teacher_id:this.form.teacher2.id,
          beixuan_techer_id:this.form.teacher1.id
        }).then((res)=>{
          if(res.code == 200){
            this.dialogShow = true;
          }
        })
      }else {
        this.$notify({ type: 'danger', message: "请至少选择一位导师" });
      }
    },
    closeDialog(type){
      this.dialogShow = false;
      this.$router.go(-1)
    },


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
