(function() {
  'use strict';

  angular
    .module('static')
    .controller('TourController', TourController);

  /** @ngInject */
  function TourController($location,$scope,$sce,$interval,$window,tourservice) {
    var vm = this;
      $scope.sce = $sce.trustAsResourceUrl;
      vm.audioInfo =[];
      var id = $location.search().id;
      if(!id){
          id =1;
      }
      getAudio(id);

      //var defaultLrcLength = 10;
      //vm.lrc = document.getElementById("lrc").innerHTML;
      //vm.lrcArr = vm.lrc.split("[");
      //vm.tmpArr=[];
      //vm.lrcTimeArr=[];
      //vm.defaultLrc =[];
      //for(var i=1; i< vm.lrcArr.length; i++){
      //    vm.tmpArr = vm.lrcArr[i].split(']');
      //    vm.lrcTimeArr.push(vm.tmpArr);
      //}

      var isShowLrc;
      isShowLrc = false;

      function getAudio(id){
          return tourservice.getAudioInfo(id)
              .then(function(res){
                  vm.audioInfo = res;
                  console.log("ainfo:"+angular.toJson(res));
                  var a = vm.audioInfo.enName;
                  var b = a.split(" ");
                  var c = b.join("");
                  vm.audioInfo.enNameShort =c;
                  var d ="./assets/audio/" + c +".mp3";
                  angular.element(".audio").attr("src",d);
                  vm.aplay = playOrPaused;
                  vm.audio = document.getElementById("audio");

                  vm.audio.addEventListener('loadedmetadata', function() {
                      vm.audioTotlaTime = parseInt(vm.audio.duration);
                      vm.totalMinute = parseInt(vm.audioTotlaTime / 60);
                      if(vm.totalMinute < 10){
                          vm.totalMinute = "0"+vm.totalMinute;
                      }
                      vm.totalSecond = parseInt(vm.audioTotlaTime % 60);
                      if(vm.totalSecond<10){
                          vm.totalSecond = "0"+ vm.totalSecond;
                      }
                      vm.totalTime = ""+vm.totalMinute+":"+vm.totalSecond;
                      angular.element(".c-b-total-time").html(vm.totalTime);
                  });

              })
              .catch();
      }




      //function buidDefaultLrc(buildIndex){
      //    var len;
      //    vm.defaultLrc=[];
      //    if(buildIndex + defaultLrcLength < vm.lrcTimeArr.length){
      //        len = buildIndex + defaultLrcLength;
      //    }else{
      //        len = vm.lrcTimeArr.length;
      //    }
      //    for(var j = buildIndex; j<len;j++){
      //        var curArr = vm.lrcTimeArr[j];
      //        var curStr = curArr[1];
      //        curStr = curStr.trim();
      //        if(curStr){
      //            vm.defaultLrc.push(curStr);
      //        }
      //    }
      //    showDefaultLrc(buildIndex);
      //}

      //function showDefaultLrc(curIndex){
      //    vm.lrcHtml='';
      //    var len =10;
      //    for(var k=0; k < len; k++){
      //        var tstr = vm.defaultLrc[k];
      //        if( k == curIndex){
      //            tstr = '<h5 class="cur-text">'+tstr+'</h5>';
      //        }else{
      //            tstr = '<h5>'+tstr+'</h5>';
      //        }
      //        vm.lrcHtml += tstr;
      //    }
      //    angular.element(".lrc-default").html("");
      //    angular.element(".lrc-default").html(vm.lrcHtml);
      //}


      //function lrcScroll(timestr){
      //    var lrc ="";
      //    for(var m=0; m<vm.lrcTimeArr.length;m++){
      //        vm.lrcTmpArr = vm.lrcTimeArr[m];
      //        var tmpTime = vm.lrcTmpArr[0];
      //        var str = tmpTime.substr(3,5);
      //        if(str == timestr){
      //           lrc += vm.lrcTmpArr[1].trim();
      //            var a =vm.lrcTimeArr.length-m;
      //            if(m>4){
      //                if(a>7){
      //                    buidDefaultLrc(m-4);
      //                    showDefaultLrc(4);
      //                }else{
      //                    showDefaultLrc(defaultLrcLength-a);
      //                }
      //            }else{
      //                showDefaultLrc(m);
      //            }
      //        }
      //    }
      //}

      function playOrPaused(){
          if(!isNaN(vm.audio.duration)){
              if(vm.audio.paused){
                  vm.audio.play();
                  vm.updateTime =$interval(function(){
                      vm.audioCurTime =parseInt(vm.audio.currentTime);
                      vm.pagenent = vm.audioCurTime /vm.audioTotlaTime *100+"%";
                      vm.minuteNum = parseInt(vm.audioCurTime / 60);
                      if(vm.minuteNum<10){
                          vm.minuteNum="0"+vm.minuteNum;
                      }
                      vm.secondNum = parseInt(vm.audioCurTime % 60);
                      if(vm.secondNum<10){
                          vm.secondNum="0"+vm.secondNum;
                      }
                      vm.timeStr =""+vm.minuteNum+":"+vm.secondNum;
                      angular.element(".c-b-cur-time").html(vm.timeStr);
                      angular.element(".js_progress").css("width",vm.pagenent);
                      //lrcScroll(vm.timeStr);
                  },1000);
                  return;
              }
          }else {
              alert("请等待音频加载完成..")
          }
          vm.audio.pause();
          $window.clearInterval(vm.updateTime);
      }


    vm.showOrHideLrc = function(){
        var lrcbox = angular.element(".audio-lrc-box");
        if(isShowLrc){
            lrcbox.css("top","100%").fadeOut();
            isShowLrc = !isShowLrc;
        }else{
            lrcbox.css("top","30%").fadeIn();
            isShowLrc = !isShowLrc;
        }
    };

  }
})();
