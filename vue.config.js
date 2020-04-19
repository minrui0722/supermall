module.exports={
  configureWebpack:{//首先要写上configureWebpack，表示对webpack进行配置
    resolve:{//resolve可以解决一些路径相关的问题
     // extensions:[]//用来配置文件的后缀名，就可以在后面的使用文件中，不用谢后缀名，但是该属性已经默认配置过了，一般不用我们再修改
    alias:{//alias专门用来配置文件的别名
      //'@':'src'//默认已经配置过的src文件夹的别名叫@，在CLI2中不支持再alias中直接使用@，在CLI3则支持
      'assets':'@/assets',
      'common':'@/common',
      'components':'@/components',
      'network':'@/network',
      'views':'@/views'
    }
    }
  },
  lintOnSave:false,
}