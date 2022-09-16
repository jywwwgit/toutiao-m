const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy:{
      '/api':{
        target: 'http://geek.itheima.net',  //请求的服务器地址
        pathRewrite:{'^/api':''} //可以让发过去的请求不带/api打头
        // changeOrigin: true, //容许跨域
        // ws: true
      }
    }
  }
})
// devServer: {
//     proxy: {
//    //灵活代理；请求前缀为/api时，走下面的代理
//       '/api': {
//         target: 'url',//代理服务器把请求转发给url(真正的后台服务器)
//         ws: true,//用于支持websocket
//         changeOrigin: true,//用于控制请求头中的host值
//         //真正的服务器没有/api，所以要重写路径置空，否则找不到相应的路径
//         pathRewrite: {
//         //匹配以api开头的路径置空
//            '^api': ''
//          }
//       },
//     }
// }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://toutiao.itheima.net/',
  //       pathRewrite: { '^/api': '' },
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }
  // dev: {
  //   proxyTable: {
  //       '/api': {
  //           target: 'https://toutiao.itheima.net/',
  //           changeOrigin: true,
  //       },
  //   }
  // }
  // devServer: {
  //   // 代理目录
  //   proxy: {
  //       '/api': {
  //         target: 'http://ttapi.research.itcast.cn',
  //         ws: true,// 开启webSocket
  //         changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务器，然后发送请求数据，这样服务端和服务端进行数据交互就不会有跨域问题
  //         pathRewrite: {
  //           '^/api': ''
  //         }
  //       }
  //     }
  // }


// module.exports = {
//   pages: {
//     index: {
//       //入口
//       entry: "src/main.js",
//     },
//   },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://toutiao.itheima.net/',
  //       pathRewrite: { '^/api': '' },
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
//   }
// }
