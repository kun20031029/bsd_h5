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
          <van-button  type="primary" round class="c-btn-blue" style="float:right">获取验证码</van-button>
        </van-col>

      </van-row>
      <div class="ttCenter">
        <van-button type="primary" block round class="c-btn-blue" @click="login">登录</van-button>
      </div>
    </div>

  </div>
</template>

<script>

import { login } from '@/api/api'
import { setToken } from '@/utils/auth'
export default {
  components: {

  },
  data() {
    return {
      mobile:'13811564500',
      code:'123456'
    }
  },

  created(){

  },
  methods : {
      async login(){
        let type = this.$route.query.type;
        sessionStorage.clear();
        let res = await login({
          mobile : this.mobile,
          code : this.code
        },type);

        if(res.code == 200){
          let data = res.data;
          let key = data.student || data.teacher;

          sessionStorage.setItem("USER",JSON.stringify(key));
          sessionStorage.setItem("CURRENTKEY",type);
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
