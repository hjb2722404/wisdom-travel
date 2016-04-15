(function() {
  'use strict';

  angular
    .module('static')
    .controller('DetailController', DetailController);

  /** @ngInject */
  function DetailController($location,$timeout, toastr,ticketservice) {
    var vm = this;

    vm.details = [];
    vm.classAnimation = '';
    vm.creationDate = 1459215771733;
    vm.showToastr = showToastr;
    var id = $location.search().id;
    activate();
    getDetail(id);

    function activate() {

      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

      function getDetail(id){
          return ticketservice.getTicketDetail(id)
              .then(function(res){
                  vm.details = res;
              })
              .catch();
      }

  }
})();
