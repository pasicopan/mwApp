
// require(['modules/mwevent/mwevent.js','modules/mwwindow/mwwindow.js',],function(mwevent){
//     // mwwindow.alert({msg:'hello'});
//     // mwevent.trigger('mwalert_show',{msg:'准备好开始游戏？',submit:'Yes'});
//     // console.log('mwevent.listener.trigger is:',mwevent.listener.trigger)
// })
// require(['modules/mwevent/mwevent.js','modules/mwfooter/mwfooter.js',],function(mwevent,mwfooter){
//     // mwwindow.alert({msg:'hello'});
//     // mwevent.trigger('mwfooter_show',{msg:'准备好开始游戏？',submit:'Yes'});
//     // console.log('mwevent.listener.trigger is:',mwevent.listener.trigger)
//     mwevent.trigger('mwfooter_show');
// })





// wechat share set
// require(['modules/mwevent/mwevent.js','modules/wechatshare/wechatshare.js',],function(wechatShare){
//     wechatShare.set({
//       WechatShareTitle:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect',
//       WechatShareContent:'',
//       WechatShareUrl:'',
//       WechatShareImgUrl:'http://wx.gz.1251113199.clb.myqcloud.com/html/images/shareIcon.jpg',
//       WechatShareSuccessCallBack:function(){},
//     });
// })

// init timeline,auto load task,such 'choice question'
require(['modules/mwtimeline/mwtimeline.js','modules/mwcommunicate/mwcommunicate.js'],function(mwtimeline,mwcommunicate){
    // mwcommunicate
    // console.log('mwtimeline 123 is:',mwtimeline.mwtimeline)
    mwcommunicate.getServerData(function(){
      // return
      mwtimeline.mwtimeline.setTasksAction({
        callback:function(a_taskControllers){
          a_taskControllers.forEach(function(a_taskController,a_taskDataIndex){
        	// console.log('a_taskController is:',a_taskController)
          // type
          // 1: description
          // 2: choiceQuestion
          // 3: choiceQuestionFrom8
            // var taskType = 1;//a_taskController.taskType
            var taskType = a_taskController.data.type;
            console.log('taskType is:',taskType)
            switch(taskType){

            case 1:
              require(['modules/mwtask/mwDescription.js'],function(mwdescription){
                
                // (function(){
  	              var mwdc = mwdescription.init({
                    data:a_taskController.data,
  	                taskController:a_taskController,
  	              });
  	              a_taskController.set({
  	                startCallback:(function(a_mwcq){
                      return function(){
                        mwdc.startCallback()
                      }
  	                })(mwdc),
  	                endCallback:function(){mwdc.endCallback()}
  	              });
  	           // })()
              })
              break;
              case 2:
              console.log('mwchoiceQuestion')
              require(['modules/mwtask/mwchoiceQuestion.js'],function(mwchoiceQuestion){
                // (function(){
                  var mwcq = mwchoiceQuestion.init({
                    data:a_taskController.data,
                  });
                  a_taskController.set({
                    startCallback:(function(a_mwcq){
                      return function(){
                        mwcq.startCallback()
                      }
                    })(mwcq),
                    endCallback  :function(){mwcq.endCallback()}
                  });
               // })()
              })
              break;

            default:
              break;
            }
          })
          
        }
      })
    });

})