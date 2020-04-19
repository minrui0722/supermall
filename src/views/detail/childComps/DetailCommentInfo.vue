<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length!==0">
    <!--提示评论信息展示-->
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <!--这里可以给更多监听点击事件@click=""，当用户点击“更多时”，跳转到另一一个页面展示所有的评论信息-->
      <div class="header-more">更多<i class="arrow-right"></i></div>
      <!--这里的i标签是为了设置更多箭头-->
    </div>
    <!--评论者的头像和用户名信息-->
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p><!--评论的内容-->
      <div class="info-other"><!--评论的时间和卖家买的东西的相关属性，如颜色，尺寸等信息-->
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs"><!--买家的晒图信息-->
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils";

  export default {
    name: "DetailCommentInfo",
    props:{
      commentInfo:{
        type:Object,
        default(){
          return{}
        }
      }
    },
    filters:{
      showDate(value){
        /*1.将时间戳转换为一个date对象*/
        const date=new Date(value*1000);
        /*2.将date进行格式化*/
        return formatDate(date,'yyyy-MM-dd hh:mm:ss');
      }
    }
  }
</script>

<style scoped>
  .comment-info{
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-title{
    float: left;
    font-size: 15px;
  }
  .header-more{
    float: right;
    font-size: 13px;
    margin-right: 10px;
  }
  .info-user{
    padding: 10px 0 5px;
  }/*买家头像信息*/
  .info-user img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }/*买家账户名信息设置*/
  .info-user span{
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail{
    padding: 0 5px 15px;
  }/*设置具体的评论内容信息*/
  .info-detail p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .info-detail .info-other{
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .info-other .date{
    margin-right: 8px;
  }
  .info-imgs{
    margin-top: 10px;
  }/*设置晒图信息*/
  .info-imgs img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>