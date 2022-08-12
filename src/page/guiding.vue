<template>
  <div class="home-container ct-flex-box">
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
                       @click="selectTeacher('teacher1')"
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
    <div  class="bottom-bd">
      <van-button type="primary" block round class="c-btn-blue" @click="save()">提交</van-button>
    </div>

    <selectPage v-if="selectShowIf"
                :show="popShow"
                :text="searchKey"
                @closeSelect="popShow=false"
                @setItem="setClassItem"
                :type="type"
    ></selectPage>
    <mydialog :showDialog="dialogShow" :btnMore="false" msg="提交成功" @closeSelect="closeDialog"></mydialog>
  </div>
</template>

<script>

import { saveNumStudent } from '@/api/api'
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
      popShow:false,
      searchKey:'请输入要搜索的导师',
      type:'',
      id : '',
      curentKey:'',
      form:{
        teacher1:{},
        teacher2:{}
      },

      dialogShow:false

    }
  },

  created(){
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    //获取当前老师
    let user = sessionStorage.getItem("USER");
    let keyStatu = this.type ? "student" : "teacher";
    this.form[keyStatu] = JSON.parse(user);
  },
  methods : {
    selectTeacher(key){
      this.curentKey = key;
      this.popShow = !this.popShow;
      this.selectShowIf = true;
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
