/*
MWChoiceQuestionFrom8.js
 */
define(['modules/mwcommunicate/mwcommunicate.js','modules/mwtimeline/mwtimeline.js','modules/mwfooter/mwfooter.js','modules/mwheader/mwheader.js','modules/mwwindow/mwwindow.js'],function(mwcommunicate,mwtimeline,mwfooter,mwheader,mwwindow){
   
  var g_index = 0;
  function init(a_o){
    g_index++;
    return new MWChoiceQuestionFrom8(a_o);
  }

  function MWChoiceQuestionFrom8(a_o){
    var that = this;
    that.data = a_o.data;
    that.taskController = a_o.taskController;
    that.$view = $('#view');
    that.$choiceQuestionView = $('<div id="viewCQ8'+g_index+'" class="full center" style="display:none;">'+
        '<section id="choiceQuestionFrom8'+g_index+'" class="choiceQuestionFrom8">'+
          '<div id="questionCQ8'+g_index+'" class="question "></div>'+
          '<div class="answer answerBtn"></div>'+
          '<div class="answer answerBtn"></div>'+
          '<div class="answer answerBtn"></div>'+
          '<div class="answer answerBtn"></div>'+
          '<div class="answer answerBtn"></div>'+
          '<div class="answer answerBtn"></div>'+
          '<div class="answer answerBtn"></div>'+
          '<div class="answer answerBtn"></div>'+
          '<div style="clear: both"></div>'+
        '</section>'+
        '<section id="choiceQuestionFrom8Result'+g_index+'" class=" choiceQuestionFrom8Result">'+
          '<div class="nextQuestionTimeContainer">'+
            '<p class="nextQuestionTime"></p>'+
          '</div>'+
          '<p class="resultText center">'+
          '</p>'+
          '<div class="center">'+
            '<div id="choujiang'+g_index+'" class="choujiang answerBtn">先去抽奖</div>'+
          '</div>'+
        '</section>'+
        '<section id="choiceQuestionFrom8Waiting'+g_index+'" class=" choiceQuestionFrom8Waiting">'+
          '<p class="choiceQuestionWaitingTime tc">'+
          '</p>'+
          '<p class="choiceQuestionWaitingText tc">'+
          '</p>'+
        '</section>'+
    '</div>');
    // that.$choiceQuestion = $('#choiceQuestion');
    that.$view.append(that.$choiceQuestionView);
    that.$viewCQ = $('#viewCQ8'+g_index);

    that.$choiceQuestion = $('#choiceQuestionFrom8'+g_index);
    that.$choiceQuestionWaiting = that.$viewCQ.find('.choiceQuestionFrom8Waiting');
    that.$choiceQuestionWaitingTime = that.$choiceQuestionWaiting.find('.choiceQuestionWaitingTime');
    that.$choiceQuestionWaitingText = that.$choiceQuestionWaiting.find('.choiceQuestionWaitingText');

    that.$choiceQuestionResult = that.$viewCQ.find('.choiceQuestionFrom8Result');
    that.$nextQuestionTime = that.$choiceQuestionResult.find('.nextQuestionTime');
    that.$resultText = that.$choiceQuestionResult.find('.resultText');
    that.$choujiang = that.$choiceQuestionResult.find('.choujiang');


    // that.$choiceQuestion.hide();

    that.$choujiang.click(function(){
      // alert('抽奖')
      mwwindow.showLottery();
    });


    that.$question = $('#questionCQ8'+g_index+'');
    that.$answer = that.$choiceQuestion.find('.answer');
    that.$answer.each(function(a_i, a_e){
      $(a_e).click(function(){
                $(that.$answer.get(a_i)).addClass('selected').siblings().removeClass('selected');
                mwwindow.showConfirm({
                  msg:'你确定？',
                  callback:function(a_b){
                    
                    // console.log('you select is:',a_b);
                    if(a_b){
                      // 禁止修改
                      // that.$choiceQuestion.addClass('noevent');
                      // 隐藏header 的倒计时
                      mwheader.hideCountDown();
                      // 保存用户选择
                      that.userSelectedData = {
                        aid:that.data.answer[a_i].aid,
                        qid:that.data.answer[a_i].qid,
                        correct:a_i
                      }
                      // mwcommunicate.setTasksData(that.userSelectedData);
                      console.log('MWChoiceQuestionFrom8 select:',a_i)
                      that.$choiceQuestion.addClass('selected');
                      // that.$PKAnswer.hide();
                      that.$choiceQuestionWaiting.show().addClass('show');
                      that.$choiceQuestionWaitingText.html('<p>答题结束，马上揭晓答案！</p><p>快要求你的小伙伴一起参与吧！</p>');

                      if(mwtimeline.mwtimeline){
                        mwtimeline = mwtimeline.mwtimeline;
                      }
                      // 显示下一题的倒计时
                      mwtimeline.countDown({
                        timestamp:that.taskController.timestampEnd,
                        callback:function(a_t){
                          var arr = mwtimeline.formatTime(a_t);
                          // console.log('MWHeader setCountDown:',arr)
                          if(0>a_t){
                            return;
                          }
                          that.$choiceQuestionWaitingTime.html(arr[2]+':'+arr[3]);
                        }
                      });
                      
                    }else{
                      $(that.$answer.get(a_i)).removeClass('selected');
                    }// end if
                  }
                });
              })// end click
            })
  }
  MWChoiceQuestionFrom8.prototype = {

    startCallback:function(a_o){
      var that = this;
      that.$question.html(that.data.title);
      that.$answer.each(function(i,e){
        $(e).html(that.data.answer[i].name);
      })
      that.$choiceQuestionView.show();
      mwfooter.hide();

      // header 倒计时  
      mwheader.setCountDown({
        time:that.taskController.timestampEnd
      });
    },
    endCallback:function(a_o){
      var that = this;

      var textAfteranswer = '，准备进入下一题！';

      if(a_o){
        if(mwtimeline.mwtimeline){
          mwtimeline = mwtimeline.mwtimeline;
        }
        mwtimeline.setTimer({
          timestamp:a_o.timestampStart,
          callback:function(){
            that.$viewCQ.hide();
          }
        });

        // 显示下一题的倒计时
        mwtimeline.countDown({
          timestamp:a_o.timestampStart,
          callback:function(a_t){
            var arr = mwtimeline.formatTime(a_t);
            // console.log('MWHeader setCountDown:',arr)
            if(0>a_t){
              return;
            }
            that.$nextQuestionTime.html(arr[2]+':'+arr[3]);
          }
        });
      }else{
        // 已经是最后一题
        setTimeout(function(){
          
            that.$viewCQ.hide();
        }, 1000*60*10)// 十分钟后自动隐藏
        textAfteranswer = '';
      }

      mwwindow.hideConfirm();
      if(that.userSelectedData && that.userSelectedData.correct == that.data.right){
        that.$resultText.html('恭喜你，答对了'+textAfteranswer);
      }else if(that.userSelectedData){
        that.$resultText.html('很遗憾你错过答题时间了'+textAfteranswer);
      }else{
        that.$resultText.html('很遗憾答错了'+textAfteranswer);
        that.userSelectedData = {
          aid:'',
          qid:that.data.answer[0].qid,
          correct:''
        }
      }


      // 隐藏等待答案的ui
      that.$choiceQuestionWaiting.hide();

      // 显示结果
      that.$choiceQuestionResult.show().addClass('show');

      mwfooter.show();
      // 隐藏header 倒计时
      mwheader.hideCountDown();
      // post data to server
      // mwcommunicate.setTasksData(that.userSelectedData);
    }
  }
  return {init:init};
})
