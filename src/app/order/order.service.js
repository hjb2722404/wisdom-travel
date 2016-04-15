/**
 * Created by hjb2722404 on 2016/3/30.
 */
(function(){
    'use strict';

    angular
        .module('static')
        .service('ordertservice',Order);

    /** @ngInject */

    function Order($http,toastr,wtConfig){

        var service = {
            getOrderList : getOrderList
        };

        return service;

              /*获取兑换券列表*/

        function getOrderList(){
            var apiUrl = wtConfig.apiHost;
            var url = apiUrl + wtConfig.getOrderListUrl;
            return $http.get(url)
                .then(getOrdersComplete)
                .catch(getOrdersFaild);


            function getOrdersComplete(res){
                return res.data.data;
            }

            function getOrdersFaild(res){
                toastr.error(res.data.msg);
                return false;
            }
        }
    }
})();