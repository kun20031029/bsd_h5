
<template>
  <div class="file-box" v-if="list.length">
    {{list.length}}
    <ul>
      <li v-for="(item,index) in list" >
        <van-icon name="file" class-prefix="my-icon"></van-icon>
        <span class="tit">{{item}}</span>
      </li>
    </ul>

  </div>
</template>
<script>
export default{
  components:{
  },
  props: {
      file:{
        type: String
      }
  },


  methods:{


  },

  data(){
    return {
      list : []
    }
  },

  mounted (){
    this.list = this.file ? this.file.split(",") : [];
  }
}
</script>
<style scoped>
.file-box li{
  padding:5px 0;
  line-height: 25px;
  font-size:15px;
}
.my-icon-file{
  margin-right:5px;
}
</style>
