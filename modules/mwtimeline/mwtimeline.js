/*
mwtimeline.js
 */
var debug = true;
define(['require','exports','modules/mwcommunicate/mwcommunicate.js','modules/mwclock/mwclock.js'],function(require,exports,mwcommunicate,mwclock){
  // console.log('require is:',require)
  function TaskController(a_o,a_activityStart){
    var that = this;
    that.activityStart = a_activityStart;
    console.log('that.activityStart is:',that.activityStart)
    // that.timeStart = that.getAbsoluteTime(a_o.timeStart);
    that.timestampStart = that.getAbsoluteTime(a_o.timeStart);
    // that.timestampEnd  = a_o.timeEnd;
    that.timestampEnd = that.getAbsoluteTime(a_o.timeEnd);
    that.data = a_o;
    // console.log('TaskController data is:',a_o)
    that.startCallback  = function(){};
    that.endCallback  = function(){};

  }
  TaskController.prototype = {
    getAbsoluteTime:function(a_s){
      // console.log('getAbsoluteTime, a_s is:',a_s)
      var that = this;
      var rTimestamp = 0;
      var ts = [60*60*1000,60*1000,1000];
      a_s.split(':').forEach(function(e,i){
        rTimestamp += parseInt(e)*ts[i];
      })
      return (new Date(that.activityStart).getTime() + rTimestamp);
    },
    set:function(a_o){
      var that = this;
      that.startCallback = a_o.startCallback;
      that.endCallback = a_o.endCallback;
    }
  }
  function MWTimeline(){
    var that = this;
    that.__serverTimeURL__ = '';
    that.__relativeTime__ = '';
    that.iTime = 1000*60;
    that.intervalCallbacks = [];
    that.refleshServerTime();
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

      var that = this;
      var _relativeTime;
      console.log('setRelativeTime ,a_serverDate is:',a_serverDate)
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
    countdown:function(a_o){
      var _len = a_o.len-1;
      var _t = that.setInterval(function() {
        a_o.callback();
        if(_len--) that.clearInterval(_t);
      })
    },
    setTimer:function(a_o){
      // console.log('setTimer--------------')
      var that = this;
      var _t = that.setInterval(function(){
        // console.log(' now is:',new Date(that.getTime()))
        // console.log('goal is:',new Date(a_o.timestamp))
        // console.log('--------')
      // console.log('setTimer, a_o.callback is:',a_o.callback)
        if(that.getTime()>=a_o.timestamp){
          a_o.callback();
          that.clearInterval(_t);
        }
      });
    },
    setTasksAction:function(a_o){
      var that = this;
      mwcommunicate.getTasksData(function(a_tasksData){
        var question = a_tasksData.question[0];
        if(debug){
          var activityStart = (new Date().getTime())+999995000;
          var activityEnd = (new Date().getTime())+1000*21//*60;// 1 hour
        }else{
          var activityStart = new Date(question['eptimeStart']).getTime();
          var activityEnd = new Date(question['eptimeEnd']).getTime();
        }
        var now = that.getTime();
        var taskControllers = [];
        if(now < activityStart){
          console.warn('now is:',new Date(now));
          console.warn('activityStart is:',new Date(activityStart));
          console.warn('活动时间外，早了');
          // if($.isFunction(a_o.callback)) a_o.callback([{activityStart:activityStart}]);
          // return false;
          taskControllers.push({
            activityStart : activityStart,
            activityEnd : activityEnd,
            // console.log('that.activityStart is:',that.activityStart)
            // that.timeStart = that.getAbsoluteTime(a_o.timeStart);
            // timestampStart : that.getAbsoluteTime(a_o.timeStart),
            // that.timestampEnd  = a_o.timeEnd;
            // timestampEnd : that.getAbsoluteTime(a_o.timeEnd),
            data : {type:1}
            // console.log('TaskController data is:',a_o)
            // that.startCallback  = function(){};
            // that.endCallback  = function(){};
          })
        }else if(now>question['eptimeEnd']){
          
          console.warn('活动时间外，晚了');
          // if($.isFunction(a_o.callback)) a_o.callback({activityStart:activityStart});
          // return false;
        }
        console.log('setTasksAction-----')
        question.questionList.forEach(function(e){
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
                }
            });
          }
        })
        if($.isFunction(a_o.callback)) a_o.callback(taskControllers);
        
      })
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
    formatTime:function(){}
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