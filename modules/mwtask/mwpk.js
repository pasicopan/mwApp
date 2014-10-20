/*
MWPK.js
 */
define(['modules/mwcommunicate/mwcommunicate.js','modules/mwtimeline/mwtimeline.js','modules/mwheader/mwheader.js','modules/mwfooter/mwfooter.js','modules/mwwindow/mwwindow.js'],function(mwcommunicate,mwtimeline,mwheader,mwfooter,mwwindow){
  console.log('MWPK.js');
  console.log('MWPK,mwtimeline is:',mwtimeline);
  var g_index = 0;
  function init(a_o){
    g_index++;
    return new MWPK(a_o);
  }

  function MWPK(a_o){
    var that = this;
    that.data = a_o.data;
    that.taskController = a_o.taskController;
    that.$view = $('#view');
    that.$choiceQuestion = $('<div id="viewPK'+g_index+'" class="full center" style="display:none;">'+
        '<div style="position:relative;">'+
        '<section id="PK'+g_index+'" class="pk pkTop">'+
          '<div class="answerContainer">'+
            '<img class="pkSingerImg" src="" alt="" />'+
            '<span class="pkSingerName pkSingerName1"></span>'+
          '</div>'+
          '<div class="answerContainer">'+
            '<img class="pkSingerImg" src="" alt="" />'+
            '<span class="pkSingerName pkSingerName2"></span>'+
          '</div>'+
        '</section>'+
        '<img class="singerShadow" src="img/singerShadow.png" >'+
        '</div>'+
        '<section id="PKAnswer'+g_index+'" class="pk pkAnswer">'+
          '<div class="answerContainer">'+
            '<div class="answer"><div class="answerCover"></div></div>'+
          '</div>'+
          '<div class="answerContainer center">'+
            '<p class="pktext">PK</p>'+
          '</div>'+
          '<div class="answerContainer">'+
            '<div class="answer"><div class="answerCover"></div></div>'+
          '</div>'+
        '</section>'+
        '<section id="PKResult'+g_index+'" class="pk pkResult">'+
          '<div class="nextQuestionTimeContainer">'+
            '<p class="nextQuestionTime"></p>'+
          '</div>'+
          '<p class="resultText center">'+
          '</p>'+
          '<div class="center">'+
            '<div id="choujiang" class="answerBtn">先去抽奖</div>'+
          '</div>'+
        '</section>'+
        '<section id="PKWaiting'+g_index+'" class="pk pkWaiting">'+
          '<p class="pkWaitingTime">'+
          '</p>'+
          '<p class="pkWaitingText">'+
          '</p>'+
        '</section>'+
        '<div id="PKQuestion'+g_index+'" class="PKQuestion"></div>'+
    '</div>');
    // that.$choiceQuestion = $('#choiceQuestion');
    that.$view.append(that.$choiceQuestion);
    // that.$choiceQuestion.hide();
    that.$PKResult = $('#PKResult'+g_index);
    that.$nextQuestionTime = that.$PKResult.find('.nextQuestionTime');
    that.$resultText = that.$PKResult.find('.resultText');
    that.$choujiang = that.$PKResult.find('#choujiang');

    that.$choujiang.click(function(){
      // alert('抽奖')
      mwwindow.showLottery();
    });

    that.$PKWaiting = $('#PKWaiting'+g_index);
    that.$pkWaitingTime = that.$PKWaiting.find(' .pkWaitingTime');
    that.$pkWaitingText = that.$PKWaiting.find('.pkWaitingText');

    that.$PKAnswer = $('#PKAnswer'+g_index);
    that.$PKQuestion = $('#PKQuestion'+g_index);

    that.$singerImg = $('#PK'+g_index+' .pkSingerImg');
    that.$pkSingerName = $('#PK'+g_index+' .pkSingerName');
    that.$answer = $('#PKAnswer'+g_index+' .answer');
    that.$singerImg.each(function(a_i, a_e){
      mwcommunicate.getSingerInfo(parseInt(that.data.answer[a_i].name),function(a_oSingerInfo){
        a_e.src = a_oSingerInfo.url;
        that.$pkSingerName.get(a_i).innerHTML = a_oSingerInfo.name;
        that.$answer.get(a_i).style.backgroundImage = 'url('+a_oSingerInfo.url+')';
      });
    });

    // console.log('timestampStart is:',a_o.taskController.timestampStart)
    that.$answer.each(function(a_i, a_e){
      $(a_e).click(function(){
        mwtimeline = mwtimeline.mwtimeline;
        mwwindow.showConfirm({
          msg:'你确定？',
          callback:function(a_b){

            // console.log('you select is:',a_b);
            if(a_b){
              $(that.$answer.get(a_i)).addClass('selected');
              that.$PKAnswer.addClass('selected');
              // that.$PKAnswer.hide();
              // that.$PKWaiting.show();
              // that.$pkWaitingText.html('<p>答题结束，马上揭晓答案！</p><p>快要求你的小伙伴一起参与吧！</p>');

              
            }
          }
        });
        that.userSelectedData = {
          aid:that.data.answer[a_i].aid,
          qid:that.data.answer[a_i].qid,
          correct:a_i
        }
        // 
        // console.log('mwcommunicate:',mwcommunicate)
        console.log('pk select:',a_i)
      })
    });
  }
  MWPK.prototype = {

    startCallback:function(){
      var that = this;
      that.$PKQuestion.html(that.data.title);
      // that.$answer.each(function(i,e){
        console.log('pk startCallback')
        // $(e).html(that.data.answer[i].name);
      // })
      that.$choiceQuestion.show();
      mwfooter.hide();
      mwheader.setCountDown({
        time:that.taskController.timestampEnd
      });
      
      // $('#view').html('MWChoiceQuestion startCallback')
    },
    endCallback:function(a_o){
      var that = this;
      console.log('pk endCallback,a_o is:',a_o)
      console.log('mwtimeline is:',mwtimeline)
      if(mwtimeline.mwtimeline){
        mwtimeline = mwtimeline.mwtimeline;
      }
      if(a_o){
        mwtimeline.setTimer({
          timestamp:a_o.timestampStart,
          callback:function(){

            that.$choiceQuestion.hide();
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
      }
      // 隐藏header 倒计时
      mwheader.hideCountDown();
      // 显示答案
      that.$PKResult.show();
      mwwindow.hideConfirm();
      if(that.userSelectedData && that.userSelectedData.correct == that.data.right){
        that.$resultText.html('恭喜你，答对了，准备进入下一题！');
      }else{
        that.$resultText.html('很遗憾答错了，准备进入下一题！');
        that.userSelectedData = {
          aid:'',
          qid:that.data.answer[0].qid,
          correct:''
        }
      }
      that.$PKAnswer.hide();
      that.$PKQuestion.hide();

      mwfooter.show();
      // post data to server
      mwcommunicate.setTasksData(that.userSelectedData);
    },
  }
  return {init:init};
})
