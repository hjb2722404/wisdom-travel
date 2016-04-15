(function() {
  'use strict';

  angular
    .module('static')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr,ticketservice) {

    var vm = this;
    vm.tickets = [];
    vm.classAnimation = '';
    vm.creationDate = 1459215771733;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getTickets();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

      function getTickets(){
          return ticketservice.getTicketList()
              .then(function(res){
                  vm.tickets = res;
              })
              .catch();
      }


  }
})();
