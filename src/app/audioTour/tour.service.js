/**
 * Created by hjb2722404 on 2016/3/30.
 */
(function(){
    'use strict';

    angular
        .module('static')
        .service('tourservice',Tour);

    /** @ngInject */

    function Tour($http,toastr,wtConfig) {


        var service = {

            getAudioInfo: getAudioInfo
        };

        return service;

        function getAudioInfo(tId) {
            var url = wtConfig.apiHost + wtConfig.getAudioUrl;
            return $http.get(url + "?id=" + tId)
                .then(getAudioComplete)
                .catch(getAudioFailed);

            function getAudioComplete(res) {
                return res.data.data;
            }

            function getAudioFailed(res) {
                toastr.error(res.data.code);
            }
        }


    }

})();