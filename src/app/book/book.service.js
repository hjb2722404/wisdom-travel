/**
 * Created by hjb2722404 on 2016/3/30.
 */
(function(){
    'use strict';

    angular
        .module('static')
        .service('bookservice',Book);

    /** @ngInject */

    function Book($http,$location , toastr,wtConfig){

        var self = this;
        self.msgInfo = {};

        self.service = {
            bookSave : bookSave,
            orderSave : orderSave,
            wxPay : wxPay,
            getConfirmInfo : getConfirmInfo,
            getOrderId : getOrderId,
            getSuccessInfo :getSuccessInfo
        };

        return self.service;

        /*生成订单*/

        function bookSave(bookInfo){
            var url = wtConfig.apiHost + wtConfig.ganerateOrderUrl;
            return $http.post(url,bookInfo)
                .then(bookSaveComplete)
                .catch(bookSaveFailed);

            function bookSaveComplete(res){
                if(res.data.code == "OK"){
                    self.orderNo = res.data.data.orderId;
                    self.msgInfo = {
                        ticketTitle : bookInfo.orderTitle,
                        tNum : bookInfo.num,
                        tDate : bookInfo.playTime,
                        orderNo : self.orderNo,
                        tUserName : bookInfo.userName,
                        tPhone : bookInfo.phone
                    };
                    return res.data.data.orderId;
                }
            }

            function bookSaveFailed(){
                toastr.error("发生错误");
            }
        }

        /*确认订单*/

        function orderSave(upInfo){

            var url = wtConfig.apiHost + wtConfig.updateOrderUrl;
            return $http.post(url,upInfo)
                .then(saveComplete)
                .catch(saveFaild);

            function saveComplete(res){

                return res.data.data;
            }

            function saveFaild(res){
                toastr.error(res.data.msg);
                return false;
            }
        }

        /*微信支付*/

        function wxPay(payData){
            var url = wtConfig.apiHost + wtConfig.wxPayUrl;
            var data = payData;
            return $http.post(url,data)
                .then(wxPayComplete)
                .catch(wxPayFailed);

            function wxPayComplete(res){
                res = res.data;
                wx.chooseWXPay({
                    timestamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                    package: res.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: res.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: res.paySign, // 支付签名
                    success: function (resp) {
                        if(resp){
                            window.location.hash = '#/msg';
                        }
                    }
                });
            }


            function wxPayFailed(res){
                toastr.error("error:"+res);
            }
        }
        /*获取订单确认信息*/
        function getConfirmInfo(orderId){
            var url = wtConfig.apiHost + wtConfig.getConfirmInfoUrl;
            return $http.get(url+"?orderId="+orderId)
                .then(getConfirmComplete)
                .catch(getConfirmFailed);

            function getConfirmComplete(res){
                return res.data.data;
            }

            function getConfirmFailed(res){
                console.log("error:"+res);
            }
        }

        function getOrderId(){
              return self.orderNo;
        }


        /*获取购买成功后的提示页面信息*/

        function  getSuccessInfo(){
            return self.msgInfo;
        }

    }
})();
