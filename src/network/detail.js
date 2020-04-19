import {request} from "./request";
//1.请求详情页数据
export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
//2.请求推荐信息的数据
export function getRecommend() {
  return request({
    url:'/recommend'
  })
}


//如果new出来的对象（即构造函数）需要传一些参数，我们一般需要在类里面定义一个constructor函数
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title=itemInfo.title;
    this.desc=itemInfo.desc;
    this.newPrice=itemInfo.price;
    this.oldPrice=itemInfo.oldPrice;
    this.discount=itemInfo.discountDesc;
    this.columns=columns;
    this.services=services;
    /*有时详情页中的而价格是一个区间，所以定义一个realPrice用来记录在购物车展示的价格*/
    this.realPrice=itemInfo.lowNowPrice;
  }
}
export class shop{
  constructor(shopInfo) {
    this.logo=shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.goods=shopInfo.cGoods;
    this.score=shopInfo.score;
    this.sells=shopInfo.cSells;
    this.goodsCount=shopInfo.cGoods;
  }
}
export class paramInfo {
  constructor(info,rule) {
    this.infos=info.set;
    this.sizes=rule.tables;
    this.image=info.image ?info.images[0]:'';
  }

}