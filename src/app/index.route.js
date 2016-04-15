(function() {
  'use strict';

  angular
    .module('static')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

      $stateProvider
          .state('detail', {
              url: '/detail',
              templateUrl: 'app/detail/detail.html',
              controller: 'DetailController',
              controllerAs: 'detail'
          });

      $stateProvider
          .state('book', {
              url: '/book',
              templateUrl: 'app/book/book.html',
              controller: 'BookController',
              controllerAs: 'book'
          });

      $stateProvider
          .state('confirm', {
              url: '/confirm',
              templateUrl: 'app/book/msg_confirm.html',
              controller: 'ConfirmController',
              controllerAs: 'confirm'
          });

      $stateProvider
          .state('msg', {
              url: '/msg',
              templateUrl: 'app/book/msg_success.html',
              controller: 'SuccessController',
              controllerAs: 'msg'
          });

      $stateProvider
          .state('order', {
              url: '/order',
              templateUrl: 'app/order/order.html',
              controller: 'OrderController',
              controllerAs: 'order'
          });

      $stateProvider
          .state('tour', {
              url: '/tour',
              templateUrl: 'app/audioTour/tour.html',
              controller: 'TourController',
              controllerAs: 'tour'
          });

    $urlRouterProvider.otherwise('/');
  }

})();
