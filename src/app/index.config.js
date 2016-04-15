(function () {
    'use strict';

    angular
        .module('static')
        .config(config);

    /** @ngInject */
    function config($logProvider,toastrConfig) {

        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = true;
        toastrConfig.progressBar = true;
    }

    angular
        .module('static')
        .constant('wtConfig', {
            apiHost: 'http://travel.njxuqiang.com',
            cosapi_cgi_url: "http://web.file.myqcloud.com/files/v1",
            getTicketsUrl: '/api/goods/getTicketList',
            getTicketDetailUrl: '/api/goods/getTicketDetailById',
            ganerateOrderUrl: '/api/order/generateOrder',
            getOrderListUrl: '/api/order/getOrderList',
            wxPayUrl: '/api/payJsParam',
            getConfirmInfoUrl: '/api/order/getConfirmInfo',
            getAudioUrl : '/api/sound/getAudioById'
        });

})();
