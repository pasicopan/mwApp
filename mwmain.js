
// require(['modules/mwevent/mwevent.js','modules/mwwindow/mwwindow.js',],function(mwevent){
//     // mwwindow.alert({msg:'hello'});
//     // mwevent.trigger('mwalert_show',{msg:'准备好开始游戏？',submit:'Yes'});
//     // console.log('mwevent.listener.trigger is:',mwevent.listener.trigger)
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
require(['modules/mwtimeline/mwtimeline.js'],function(mwtimeline){
    // mwcommunicate
    // return
    // console.log('mwcommunicate 123 is:',mwcommunicate)
    // var mwcommunicate = mwcommunicate;
    var mwtimeline = mwtimeline.mwtimeline;
      // return

      mwtimeline.setTasksAction({
        callback:function(a_taskControllers){
          a_taskControllers.forEach(function(a_taskController,a_taskDataIndex){
          // console.log('a_taskController is:',a_taskController)
          // type
          // 0: description
          // 1: pk
          // 2: choiceQuestion 竞猜歌词
          // 3: choiceQuestionFrom8 8选1
            // var taskType = 1;//a_taskController.taskType
            var taskType = a_taskController.data.type;
            // console.log('taskType is:',taskType)
            if(0<a_taskDataIndex){
              console.log('【第'+(a_taskDataIndex)+'题】')
            }
            switch(taskType){
            case 2:
            console.log('【pk】')
              // console.log('mwpk');
             
              require(['modules/mwtask/mwpk.js'],function(mwchoiceQuestionFrom8){
                // (function(){
                  var mwcq = mwchoiceQuestionFrom8.init({
                    data:a_taskController.data,
                    taskController:a_taskController,
                  });
                  a_taskController.set({
                    startCallback:function(){
                        mwcq.startCallback()
                      },
                    endCallback  :function(){
                      if(a_taskControllers[1+a_taskDataIndex]){
                        mwcq.endCallback(a_taskControllers[1+a_taskDataIndex]);
                      }else{
                        mwcq.endCallback();
                      }
                    },
                    waitingCallback  :function(){mwcq.waitingCallback()},
                  });
               // })()
              })
              break;
            case 0:
              // console.log('description')
              // // console.log('description')
              // require(['modules/mwtask/mwDescription.js'],function(mwdescription){
                
              //   // (function(){
                  

              // })
              break;
            case 3:
              // console.log('MWChoiceQuestionFrom8');
              console.log('【8选1】')
             
              require(['modules/mwtask/mwchoiceQuestionFrom8.js'],function(mwchoiceQuestionFrom8){
                // (function(){
                  var mwcq = mwchoiceQuestionFrom8.init({
                    data:a_taskController.data,
                    taskController:a_taskController,
                  });
                  a_taskController.set({
                    startCallback:function(){
                        mwcq.startCallback()
                      },
                    endCallback  :function(){
                      if(a_taskControllers[1+a_taskDataIndex]){
                        mwcq.endCallback(a_taskControllers[1+a_taskDataIndex]);
                      }else{
                        mwcq.endCallback();
                      }
                    },
                    waitingCallback  :function(){mwdc.waitingCallback()},
                  });
               // })()
              })
              break;
            case 1:
              // console.log('mwchoiceQuestion')
              console.log('【猜歌词】')
                require(['modules/mwtask/mwchoiceQuestion.js'],function(mwchoiceQuestion){
                    var mwcq = mwchoiceQuestion.init({
                      data:a_taskController.data,
                      taskController:a_taskController,
                    });
                  // console.log('a_taskController is:',a_taskController)
                    a_taskController.set({
                      startCallback:function(){
                          mwcq.startCallback()
                        },
                      endCallback  :function(){
                        if(a_taskControllers[1+a_taskDataIndex]){
                          mwcq.endCallback(a_taskControllers[1+a_taskDataIndex]);
                        }else{
                          mwcq.endCallback();
                        }
                      },
                    waitingCallback  :function(){mwdc.waitingCallback()},
                    });
                })
                break;
              

            default:
              break;
            }
          })
          
        }
      })
    // });

})


require(['modules/mwfooter/mwfooter.js'],function(mwfooter){
  mwfooter.show();
})
require(['modules/mwheader/mwheader.js'],function(mwheader){
  mwheader.show();
})