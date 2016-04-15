(function() {
  'use strict';

  angular
    .module('static')
    .run(runBlock);

  /** @ngInject */
  function runBlock($http,wtConfig,toastr){
      var url = wtConfig.apiHost +"/api/getSignature?url="+location.origin + location.pathname;
      $http.get(url)
          .then(function(res){
              wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: res.data.appId, // 必填，公众号的唯一标识
                  timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                  signature: res.data.signature,// 必填，签名，见附录1
                  jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
          })
          .catch(function(res){
              toastr.error(res.data.msg);
              return false;
          });
  }

})();
