/*
mwtimeline.js
 */
var debug = true;
define(['require','exports','modules/mwcommunicate/mwcommunicate.js','modules/mwclock/mwclock.js'],function(require,exports,mwcommunicate,mwclock){
  // var mwcommunicate = mwcommunicate;
  // console.log('mwcommunicate is:',mwcommunicate)
  function TaskController(a_o,a_activityStart){
    var that = this;
    that.activityStart = a_activityStart;
    // console.log('that.activityStart is:',that.activityStart)
    // that.timeStart = that.getAbsoluteTime(a_o.timeStart);
    that.timestampStart = that.getAbsoluteTime(a_o.timeStart);
    // that.timestampEnd  = a_o.timeEnd;
    that.timestampEnd = that.getAbsoluteTime(a_o.timeEnd);
    that.data = a_o;
    // console.log('TaskController a_o is:',a_o)
    that.startCallback  = function(){};
    that.endCallback  = function(){};
    that.waitingCallback  = function(){};

  }
  TaskController.prototype = {
    getAbsoluteTime:function(a_s){
      var that = this;
      var rTimestamp = 0;
      // console.log('getAbsoluteTime ,a_s is:',a_s)
      // console.log('getAbsoluteTime ,a_s.length is:',isNaN(a_s));
      // 已经是绝对时间
      if(!isNaN(a_s)){
        return (new Date(a_s).getTime() + rTimestamp);
      }else{
        // console.log('getAbsoluteTime, a_s is:',a_s)
        var ts = [60*60*1000,60*1000,1000];
        a_s.split(':').forEach(function(e,i){
          rTimestamp += parseInt(e)*ts[i];
        })
      }
      return (new Date(that.activityStart).getTime() + rTimestamp);
    },
    set:function(a_o){
      var that = this;
      that.startCallback = a_o.startCallback;
      that.endCallback = a_o.endCallback;
      that.waitingCallback = a_o.waitingCallback;
    }
  }
  function MWTimeline(){
    var that = this;
    that.__serverTimeURL__ = '';
    that.__relativeTime__ = '';
    that.iTime = 1000*60;
    that.intervalCallbacks = [];
    that.refleshServerTime();
    mwcommunicate.getServerData(function(){});
  }
  MWTimeline.prototype = {
    // 获取服务器时间
    // getServerDate:function(a_callback){
    //   var that = this;
    //   mwcommunicate.getServerData(function(a_serverData){
      
    //     a_callback(a_serverData.serverDate);
    //   });
    // },
    getRelativeTimestamp:function(a_timestamp, a_callback){
      var that = this;
      if(that.__relativeTime__){
        a_callback(that.__relativeTime__ );
      }else{
        mwcommunicate.getServerDate(function(a_serverData){
          var r = (new Date(a_serverData.serverDate).getTime())-(new Date(a_serverData.serverDate).getTime());
          // if()
          a_callback(r);
        });
      }
    },
    // 计算相对时间，
    setRelativeTime:function(a_serverDate){
      console.log('--setRelativeTime')
      var that = this;
      var _relativeTime;
      // console.log('setRelativeTime ,a_serverDate is:',a_serverDate)
      var localnowstamp = new Date().getTime();
      var servernowstamp = new Date(a_serverDate).getTime();
      _relativeTime =  localnowstamp - servernowstamp;// - dalayTime
      // console.log('localnowstamp:', localnowstamp)
      // console.log('a_data.serverDate is:', servernowstamp);
      // console.log('_relativeTime is:', _relativeTime)
      // 取网速误差值较少的值
      that.__relativeTime__ = that.__relativeTime__?((that.__relativeTime__>_relativeTime?that.__relativeTime__:_relativeTime)):_relativeTime;
      // that.__relativeTime__ =  new Date().getTime() - a_data.time;
      // console.log('__relativeTime__ is:', that.__relativeTime__)
      // if($.isFunction(a_o.callback)) a_o.callback(that.__relativeTime__);
      
    },
    // 获取当前时间
    getTime:function(){
      var that = this;
      var d = new Date();
      var timestamp = d.getTime() - that.__relativeTime__;
      // console.log('getTime, that.__relativeTime__ is:',that.__relativeTime__)
      // console.log('getTime is:',d)
      return timestamp;
    },
    // 倒计时
    countDown:function(a_o){
      var that = this;
      console.log('timeline countDown')
      var _t = function() {
        var r = a_o.timestamp - that.getTime();
        // console.log(new Date(a_o.timestamp))
        // console.log(new Date(that.getTime()))
        if(0>r){
          that.clearInterval(_t);
          return;
        }
        
        // console.log('r is:',r)
        a_o.callback(r);
        // if(_len--) that.clearInterval(_t);
      }
      that.setInterval(_t);
    },
    setTimer:function(a_o){
      // console.log('setTimer--------------')
      var that = this;
      var _t = that.setInterval(function(){
        // console.log(' now is:',new Date(that.getTime()))
        // console.log('goal is:',new Date(a_o.timestamp))
        // console.log('--------')
      // console.log('setTimer, a_o.callback is:',a_o.callback)
        if(that.getTime()>=a_o.timestamp&&that.getTime()<a_o.timestamp+1000){
          a_o.callback();
          that.clearInterval(_t);
        }
      });
    },
    setTasksAction:function(a_o){
      var that = this;
      // console.log('mwcommunicate 2 is:',mwcommunicate)
      mwcommunicate.getTasksData(function(a_tasksData){
        var question = a_tasksData.question[0];
        if(debug){
          var activityStart = (new Date().getTime())+2000//999995000;
          var activityEnd = (new Date().getTime())+1000*21*60;// 1 hour
        }else{
          var activityStart = new Date(question['eptimeStart']).getTime();
          var activityEnd = new Date(question['eptimeEnd']).getTime();
        }
        var now = that.getTime();
        var taskControllers = [];
        console.warn('现在时间 is:',new Date(now));
        console.warn('活动开始时间 is:',new Date(activityStart));
        var _timeout = false;
        if(now < activityStart){
          console.warn('活动时间外，早了');
          _timeout = true;
        }else if(now>activityEnd){
          console.warn('活动时间外，晚了');
          _timeout = true;
        }

        // 处理节目外的情况
        (function(){
          var _taskController = new TaskController({
            timeStart:activityStart,
            timeEnd:activityEnd,
            type : 0
          },activityStart);
          taskControllers.push(_taskController);


          that.setTimer({
            timestamp : _taskController.timestampStart,
            callback  : function(){
              _taskController.startCallback();
              if(taskControllers[1]){
                // console.log('taskControllers[1] is:',taskControllers[1])
                _taskController.waitingCallback(taskControllers[1]);
              }
              }
          });
          that.setTimer({
            timestamp : _taskController.timestampEnd,
            callback  : function(){
              _taskController.endCallback();
              }
          });

          if(_timeout){
            require(['modules/mwtask/mwDescription.js'],function(mwdescription){

              var mwdc = mwdescription.init({
                // data:a_taskController.data,
                taskController:_taskController,
              });
              _taskController.set({
                startCallback:function(){
                    mwdc.startCallback()
                  },
                endCallback  :function(){mwdc.endCallback()},
                waitingCallback  :function(){mwdc.waitingCallback(taskControllers[1])},
              });
              _taskController.endCallback();

            })
          }
          
        })();


        console.log('【初始化题型】')
        question.questionList.forEach(function(e,i){
          var taskController = new TaskController(e,activityStart);
          taskControllers.push(taskController);
          
          // console.log('taskController is:',taskController)
          // console.log('taskController.timestampStart is:', taskController.timestampStart)
          // console.log('that.getTime() is:',that.getTime())

          // 已经过去的就不加定时器
          if(now < taskController.timestampStart){
            that.setTimer({
              timestamp : taskController.timestampStart,
              callback  : function(){
                taskController.startCallback();
                }
            });
            that.setTimer({
              timestamp : taskController.timestampEnd,
              callback  : function(){
                taskController.endCallback();
                // console.log('timeline ,taskControllers[i+1] is:',taskControllers[i+1])
                // console.log('timeline ,taskControllers[i+1] is:',i+1)
                taskController.waitingCallback();
                }
            });
          }
        })
        // taskController.forEach(function(e,i){
        //   if(i<taskController.length-1)
        //   that.setTimer({
        //     timestamp : e.timestampEnd,
        //     callback  : function(){
        //       taskController[i+1].waitingCallback();
        //       }
        //   });
        // });
        if($.isFunction(a_o.callback)) a_o.callback(taskControllers);
        
      })
    },
    setTaskLoaded:function(a_f){

    },
    setInterval:function(a_f){
      var that = this;
      // console.log('setInterval f is:',a_f)
      that.intervalCallbacks.push(a_f);
      mwclock.setIntervalPerSecond.call(that,that.interval);
      return a_f;
    },
    clearInterval:function(a_f){
      var that = this;
      // console.log('clearInterval f is:',a_f)
      var _len = that.intervalCallbacks.length;
      while(_len--){
        if(that.intervalCallbacks[_len]==a_f){
          that.intervalCallbacks.splice(_len,1);
        }
      }
    },
    interval:function(a_o){
      var that = this;
      // console.log('that is:',that)
      // console.log('intervalCallbacks is:',that.intervalCallbacks)
      var _len = that.intervalCallbacks.length;
      while(_len--){
        that.intervalCallbacks[_len]();
      }
    },
    refleshServerTime:function(){
      var that = this;
      // that.setRelativeTime({
      //   callback:function(){
      //     if(that.to) clearTimeout(that.to);
      //     that.to = setTimeout(function(){
      //     that.refleshServerTime();
      //   },that.iTime);
      //   if(that.ti) clearInterval(that.ti);
      //     that.ti = setInterval(function(){
      //       that.interval();
      //     },1000);
      // }});
      
      // that.i2 = setInterval(function(){},that.iTime);
    },
    formatTime:function(s){
      var seconds = s/1000;
      var timeArr = [Math.floor(seconds/(24*60*60)),  Math.floor(seconds/3600)%24, Math.floor(seconds/60)%60  ,Math.floor(seconds%(60))];
      timeArr.forEach(function(e,i){
        if(e<10){
          timeArr[i]="0"+e
        };
      })
      
      return timeArr;
    }
  }
  // mwevent.addEvent('getTime',function(a_options) {
  //     mwtimeline = mwtimeline || new MWTimeline();
  //     a_options.a_callback(mwtimeline.getTime());
  //     return;
  // });
  var m = new MWTimeline();
  // exports.mwtimeline = function () {
  //       return m;
  //   };
  exports.mwtimeline = m;
  // return m;
})

// require(['modules/mwevent/mwevent.js'],function(mwevent){
    // task start
    // create dom
    // get data from server ,such as user data,question data
    // bind event,trigger modules
    // hide dom
    // task end
// })