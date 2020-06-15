<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>
<script>
  export default {
    name: "Toast",
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message = "默认文字",duration = 2000){
        this.message = message;
        this.isShow = true;//显示

        setTimeout(() => {
          this.isShow = false;//隐藏
          this.message = '';//清空内容
        },duration)
      }
    }
    /*props:{
      message:{
        type:String,
        default:''
      },
      show:{
        type:Boolean,
        default: false
      }
    }*/
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 999;
    padding: 8px 10px;/*文字和边框的距离*/
    /*使得整个div居中显示*/
    transform: translate(-50%,-50%);
    color: #fff;
    background-color: rgba(0,0,0,.6);
  }
</style>