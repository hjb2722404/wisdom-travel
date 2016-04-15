/**
 * Created by hjb2722404 on 2016/3/30.
 */
(function(){
    'use strict';

    angular
        .module('static')
        .service('ticketservice',Ticket);

    /** @ngInject */

    function Ticket($http,toastr,wtConfig){

        var service = {
            getTicketList : getTicketList,
            getTicketDetail :getTicketDetail
        };

        return service;

        /*获取门票列表*/

        function getTicketList(){
            var apiUrl = wtConfig.apiHost;
            var url = apiUrl + wtConfig.getTicketsUrl;
            return $http.get(url)
                .then(getTicketsComplete)
                .catch(getTicketsFaild);


            function getTicketsComplete(res){
                return res.data.data;
            }

            function getTicketsFaild(res){
                toastr.error(res.data.code);
                return false;
            }
        }

        /*获取门票详情*/

        function getTicketDetail(id){
            var apiUrl = wtConfig.apiHost;
            var url = apiUrl + wtConfig.getTicketDetailUrl;
            return $http.get(url+"?id="+id)
                .then(getTicketComplete)
                .catch(getTicketFaild);


            function getTicketComplete(res){
                return res.data.data;
            }

            function getTicketFaild(res){
                toastr.error(res.data.msg);
                return false;
            }
        }


    }
})();