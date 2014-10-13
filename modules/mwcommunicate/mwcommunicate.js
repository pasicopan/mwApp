/*
mwcommunicate.js
 */
 
define(['require','exports','modules/mwevent/mwevent.js','modules/mwtimeline/mwtimeline.js'],function(require,exports,mwevent,mwtimeline){
  var useID = 'oW1eDt7y5uhHcf7peoWlkbC9hmDE';
  var mwlottery = 'http://www.51viper.com/api/lottery.jsp'+'?id='+useID;
  // var mwdata = 'http://www.51viper.com/api/data.jsp';
  var mwdata = 'http://127.0.0.1/~pasico/viper/mwApp/js/data3.js';
  var errorRedirectURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwww.51viper.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect'
  var mwcommunicate = null;


  function MWCommunicate(){
    var that = this;
    // store.set("maiwang_openid", "");
  }
  MWCommunicate.prototype = {
  	//获取参数
	getUrlMsg:function (a_sParamName) {
	    var reg = new RegExp("(^|\\?|&)" + a_sParamName + "=([^&]*)(\\s|&|$)", "i");
	    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
	    return "";
	},
    getServerDate:function(a_callback){
    	$.ajax({
    		type: 'GET',
    		url:mwlottery,
    		dataType: 'jsonp',
    		success:function(a_serverData){
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
       //      data: {'id':useID},
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
            url: mwlottery,
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
  return new MWCommunicate();
})
