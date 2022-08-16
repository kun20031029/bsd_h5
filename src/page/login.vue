<template>
  <div class="home-container">
    <div class="logo-bd ttCenter">
      <img src="../assets/img/logo.png">
      <div class="logo-tit">
        欢迎登录北师大心理学部
      </div>
    </div>
    <div class="logo-form">

      <van-cell-group inset>

      </van-cell-group>
      <van-row>
        <van-col span="24">
          <van-field
            v-model="mobile"
            placeholder="请输入手机号"
          >
            <van-icon slot="left-icon" class-prefix="my-icon" name="mobile" />
          </van-field>
        </van-col>
      </van-row>
      <van-row style="margin-bottom:30px">
        <van-col span="16">
          <van-field
            v-model="code"

            placeholder="验证码"
          >
            <van-icon slot="left-icon" class-prefix="my-icon" name="code" />
          </van-field>
        </van-col>
        <van-col span="8">
          <van-button  type="primary" round :disabled="disabled" class="c-btn-blue" style="float:right;min-width: 100px" @click="getCode">
            {{ text }}</van-button>
        </van-col>

      </van-row>
      <div class="ttCenter">
        <van-button type="primary" block round  :disabled="disabledLogin"  class="c-btn-blue" @click="login">登录</van-button>
      </div>
    </div>

  </div>
</template>

<script>

import { login,getCode } from '@/api/api'
import { setToken } from '@/utils/auth'
export default {
  components: {

  },
  data() {
    return {
      mobile:'13811564500',
      code:'123456',
      disabled:false,
      disabledLogin:false,
      text:'获取验证码'
    }
  },

  created(){

  },
  methods : {
      async getCode(){
        if(!this.mobile){
          this.$notify({ type: 'danger', message: "请先填写手机号" })
          return;
        }
        this.disabled = true;
        this.text = 59;
        let timer = setInterval(()=>{
          if(this.text <= 0){
            clearInterval(timer);
            this.disabled = false;
          }
          this.text --;
        },1000)
        let res = await getCode({
          mobile: this.mobile
        });
        if(res.code == 200){
          this.$toast.success(res.msg);
        }
      },
      async login(){
        let error ;
        error || this.mobile || (error = "请填写手机号");
        error || this.code || ( error = "请填写验证码");
        if(error){
          this.$notify({ type: 'danger', message: error })
          return;
        }

        this.disabledLogin = true;

        let type = this.$route.query.type;
        localStorage.clear();
        let res = await login({
          mobile : this.mobile,
          code : this.code
        },type);
        this.disabledLogin = false;

        if(res.code == 200){
          let data = res.data;
          let key = data.student || data.teacher;

          localStorage.setItem("USER",JSON.stringify(key));
          localStorage.setItem("CURRENTKEY",type);
          setToken(data.token);
          this.$router.push({
            path: '/index',
            query: {
              type:type
            }
          })
        }
      }
  }

}
</script>

<style >
  @import "../assets/style/css.css";

  .logo-bd img{
    width:113px;
    height:113px;
    margin-bottom:20px;
  }
  .logo-form{
    padding: 20px
  }
  .logo-form .van-cell{
    background:rgba(46, 108, 255, 0.07);
    border-radius: 23px;
  }
  .logo-form .van-row{
    margin-bottom:15px;
  }

</style>
<style scoped>
.logo-tit{
  font-size:20px;
  font-weight: bold;
  margin-bottom:20px
}
.home-container{
  padding-top: 100px;

}
</style>
