<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <!--表格显示尺码信息-->
    <table v-for="(table,index) in paramInfo.sizes" :key="index">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <!--表格显示是厂地、颜色，材质等信息-->
    <table class="info-param">
      <tr v-for="(info,index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="info-param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length!==0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props:{
      paramInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .param-info table{
    width: 100%;
    border-collapse: collapse;
  }
  .param-info table tr{
    height: 42px;
  }
  .param-info table tr td{
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  /*表格显示是厂地、颜色，材质等信息*/
  .info-param{
    border-top: 1px solid rgba(0,0,0,.1);
  }
  .info-param-key{
    /*当value的值太多时，可能会挤到key，所以给key设置一个固定的宽度*/
    width: 95px;
  }
  .info-param-value{
    color: #eb4868;
  }
  .info-img img{
    width: 100%;
  }

</style>