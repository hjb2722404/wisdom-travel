(function() {
  'use strict';

  angular
    .module('static')
    .controller('BookController',BookController);

  /** @ngInject */
  function BookController($location,bookservice,ticketservice,toastr) {
    var vm = this;
    vm.details = [];
    vm.save = save;
    vm.num = numChange;
    vm.tId = $location.search().id;
    vm.tType = angular.element("#tType1").val();


     function save() {

         var year = vm.tDate.getFullYear();
         var month = vm.tDate.getMonth()+1;
         var date = vm.tDate.getDate();
         var playDate = ""+year+"年"+month+"月"+date+"日";
         var bookInfo ={
             "ticketId" : vm.tId,
             "ticketType" : vm.details.ticketType,
             "num" : parseInt(vm.tNum),
             "playTime":playDate,
             "userName" :vm.tUsername,
             "phone" : vm.tPhone,
             "price" : parseFloat(vm.details.price),
             "orderTitle" : vm.details.ticketTitle
         } ;

         bookservice.bookSave(bookInfo)
             .then(function(res){
                 console.log("order:"+res);
                 toastr.success("提交成功");
                 $location.path('/confirm');
             })
             .catch();

     }

      function numChange(str){
          if(str == "+"){
              vm.tNum++;
          }else if(str=="-"){
              if(vm.tNum>0){
                  vm.tNum--;
              }
          }
      }
    activate();

    function activate() {
        getDetail(vm.tId);
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
