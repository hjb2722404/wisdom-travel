(function() {
  'use strict';

  angular
    .module('static')
    .controller('SuccessController',SuccessController);

  /** @ngInject */
  function SuccessController(bookservice) {

      var vm = this;
      vm.msgInfo=[];


    getMsgInfo();

      function getMsgInfo(){
          vm.msgInfo = bookservice.getSuccessInfo();
      }




  }


})();
