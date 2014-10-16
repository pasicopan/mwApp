/*
mwcommunicate.js
 */
 
define(['require','exports','modules/mwtimeline/mwtimeline.js'],function(require,exports,mwtimeline){
  
  // var openID = 'oW1eDt7y5uhHcf7peoWlkbC9hmDE';
  var debug_openID = 'oW1eDt7y5uhHcf7peoWlkbC9hmDE';
  var mwlotteryURL = 'http://www.51viper.com/api/lottery.jsp';
  // var mwdata = 'http://www.51viper.com/api/data.jsp';
  var mwdata = 'http://127.0.0.1/~pasico/viper/mwApp/js/data3.js';
  var errorRedirectURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwww.51viper.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect'
  var mwcommunicate = null;


  function MWCommunicate(){
    var that = this;
    that.openID = that.getUrlMsg('id')||debug_openID;
    // store.set("maiwang_openid", "");
  }
  MWCommunicate.prototype = {
  	//获取参数
	getUrlMsg:function (a_sParamName) {
	    var reg = new RegExp("(^|\\?|&)" + a_sParamName + "=([^&]*)(\\s|&|$)", "i");
	    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
	    return "";
	},
  getLuckyInfo:function(callback){
    var that = this;
    that.getServerData(function(a_serverData){
      var o = {
        luckyTotal:a_serverData.luckyTotal,
        luckyUse:a_serverData.luckyUse
      }
      callback(o);
    });
  },
  setLuckyUse:function(callback){
    var that = this;
    
  },
  getSingerInfo:function(a_id,callback){
    var that = this;
    function s(a_id,a_arr){
      var l = a_arr.length;
      while(l--){
        if(a_id == a_arr[l].id){
          if(!a_arr[l].url.match('http')){
            a_arr[l].url = 'img/'+a_arr[l].url+'.png';
          }
          return a_arr[l];
        }
      }
      return false;
    }
    if(singerInfo){
      callback(s(a_id, singerInfo));
    }else{
      that.getServerData(function(){
        callback(s(a_id, singerInfo));
      });
    }
    return;
  },
  getServerData:function(a_callback){
      var that = this;
      $.ajax({
        type: 'GET',
        url:mwlotteryURL+'?id='+that.openID,
        dataType: 'jsonp',
        success:function(a_serverData){
        // console.log('mwtimeline abc is:',mwtimeline)
          mwtimeline.mwtimeline.setRelativeTime(a_serverData.serverDate)
    			a_callback(a_serverData);
				return;
	    	}
    	})
    },
    getCurrentTask:function(a_callback){
    	$.ajax({
    		type: 'GET',
    		url:mwdata,
    		dataType: 'jsonp',
    		success:function(){
    			var _len = window.question.length;
    			var _now = mwtimeline.getTime();
    			// 判断当前正在进行哪个题目
    			while(_len--){
    				if(new Date(window.question[_len].eptimeStart).getTime()<=_now && new Date(window.question[_len].eptimeStart).getTime()>=_now){
						a_callback(window.question[_len]);
						return;
					}
    			}
    			a_callback({});
				return;
	    	}
    	})
    },
    setTasksData:function(a_o){
      var that = this;
      var o = {};
      o.lotteryId = 54;
      // o.openId = 'oW1eDt7y5uhHcf7peoWlkbC9hmDE';
      o.openId = that.openID;
      // o.answer = [a_o];
      o.answer = JSON.stringify([a_o]);
      // o.answer = JSON.stringify([{"aid":61,"qid":65,"correct":61}]);

      $.ajax({
          type: 'POST',
          url: mwlotteryURL+'?id='+that.openID,
          // data: {
          //   openId:'ob4BXt--d2eJAtDmFqQSkHxbFAds',
          //   lotteryId:61,
          //   answer:[{"qid":53,"aid":4,"correct":0},{"qid":54,"aid":1,"correct":1}],
          // },
          data:o,
          // dataType: 'jsonp',
          timeout: 10000,
          success: function(data) {
         // console.log('setTasksData, currentEventId is:',currentEventId)
          console.log('success')
          },
          error: function(xhr, type) {
              console.error(xhr)
              // console.error(type)
          }
      })
    },
    getTasksData:function(a_callback){
      // $.post(mwdata,function(){
      // 	console.log('getTasksData, currentEventId is:',currentEventId)
      // 	a_callback({
      // 		currentEventId:currentEventId,
      // 		currentLotteryId:currentLotteryId,
      // 		question:question
      // 	})
      // })


      	// $.ajax({
       //      type: 'GET',
       //      url: mwdata,
       //      data: {'id':openID},
       //      dataType: 'jsonp',
       //      timeout: 10000,
       //      success: function(data) {
	      // 		console.log('getTasksData, currentEventId is:',currentEventId)
	      // 		alert('success')
       //      },
       //      error: function(xhr, type) {
       //          console.error(xhr)
       //      }
       //  })
		var s = document.createElement('script')
		s.onload = function(){
	      	console.log('getTasksData, currentEventId is:',currentEventId);
	      	// console.log('s.onload is:',a_callback)
			a_callback({
	      		currentEventId:currentEventId,
	      		currentLotteryId:currentLotteryId,
	      		question:question
	      	})

		}
		s.src = mwdata;
		document.getElementsByTagName('head')[0].appendChild(s);
    },
    getUserOpenID:function(a_callback){
		var that = this;
		$.ajax({
            type: 'GET',
            url: mwlotteryURL,
            data: {id:that.getUrlMsg('id')||store.get("maiwang_openid")},
            dataType: 'jsonp',
            timeout: 10000,
            context: $('#debug'),
            success: function(data) {
                if (data.errmsg) {
                    if (data.errmsg.match("blank")) {
                        store.set("maiwang_openid", "");
                        window.location = errorRedirectURL;
                    } else {
                        window.location = errorRedirectURL;
                    }
                } else {
                    console.log("get数据");
                    console.log(data);
                    setStoreId(data.openId);
                    if (callback) callback(data);
                    // $("#loading").removeClass("show");
                }

            },
            error: function(xhr, type) {
                window.location = errorRedirectURL;
            }
        })
  	}
  }
  // mwevent.addEvent('getServerDate',function(a_options) {
  //     mwcommunicate = mwcommunicate || new MWCommunicate();
  //     mwcommunicate.getServerDate(a_options.a_callback);
  //     return;
  // });
  // mwevent.addEvent('getCurrentTask',function(a_options) {
  //     mwcommunicate = mwcommunicate || new MWCommunicate();
  //     mwcommunicate.getTask(a_options.a_callback);
  //     return;
  // });
  // return ;
  var m = new MWCommunicate();
  // exports.mwcommunicate = m;
  return m;
})
