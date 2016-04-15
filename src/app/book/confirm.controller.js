(function() {
  'use strict';

  angular
    .module('static')
    .controller('ConfirmController',ConfirmController);

  /** @ngInject */
  function ConfirmController(bookservice) {

      var vm = this;
      var id ;
      vm.orderInfo=[];
      vm.pay = function(){
          var payData ={
              'body' : vm.orderInfo.orderTitle,
              'orderNo' : id,
              //'total_fee' : 1
              'total_fee' : vm.orderInfo.amount * 100
          };

          weixinPay(payData);
      };

    getOrderInfo();

      function getOrderInfo(){

          id = bookservice.getOrderId();
          return bookservice.getConfirmInfo(id)
              .then(function(resp){
                  vm.orderInfo = resp;
              })
              .catch();
      }

      function weixinPay(payData){
          return bookservice.wxPay(payData);
      }




  }


})();
