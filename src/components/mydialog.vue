
<template>

  <van-overlay :show="dialogVisible"  >
    <div class="over-my-bd " >
      <div class="over-ct block-w">
        <div class="d-pic ttCenter mb20">
          <img src="../assets/img/i8.png" />
        </div>
        <div class="font14 ttCenter mb20">{{msg}}</div>
        <div class="ttCenter btn-foot" v-if="btnMore">
          <van-button  type="default" plain round size="small" class="c-btn-gray" @click="close()">{{ closeBtnText || "不用了" }}</van-button>
          <van-button  type="primary" round size="small" class="c-btn-blue" @click="close(1)">{{ sureBtnText || "继续添加" }}</van-button>
        </div>
        <div class="ttCenter btn-foot" v-else>
          <van-button  type="primary" round block style="margin:0" size="small" class="c-btn-blue" @click="close()">{{ closeBtnText || "知道了" }}</van-button>
        </div>
      </div>
    </div>

  </van-overlay>
</template>
<script>
export default{
  components:{
  },
  props: {
    title:{
      type: String
    },
    showDialog:{
      type : Boolean
    },
    msg:{
      type: String
    },
    closeBtnText:{
      type : String
    },
    sureBtnText:{
      type : String
    },
    btnMore:{
      type: Boolean,
      value:true
    }
  },
  computed: {
    dialogVisible: {
      get:function(){
        return this.showDialog;
      },
      set:function () {
        return  this.$emit("closeSelect",this.type);
      }
    }
  },

  methods:{
    close(type){
      this.type = type;
      this.dialogVisible = false;
    }

  },

  data(){
    return {
      type : false
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
.d-pic img{
  width:104px;
  height:96px;
}
.over-my-bd{

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.over-my-bd .over-ct{
  border-radius: 11px;
  padding: 20px;
  min-width: 70%;
}
.btn-foot .van-button{
  margin:0 10px;
  padding: 0 20px;
  min-width: 90px;
}
</style>
