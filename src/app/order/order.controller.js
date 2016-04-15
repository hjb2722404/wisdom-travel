(function() {
  'use strict';

  angular
    .module('static')
    .controller('OrderController',OrderController);

  /** @ngInject */
  function OrderController(ordertservice) {
    var vm = this;
    vm.orders = [];

    activate();

    function activate() {
      getOrders();
    }

      function getOrders(){
          return ordertservice.getOrderList()
              .then(function(res){
                  vm.orders = res;
              })
              .catch();
      }

  }
})();
