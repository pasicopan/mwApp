/*
MWChoiceQuestionFrom8.js
 */
define(['modules/mwcommunicate/mwcommunicate.js','modules/mwfooter/mwfooter.js'],function(mwcommunicate,mwfooter){
  
  var g_index = 0;
  function init(a_o){
    g_index++;
    return new MWChoiceQuestionFrom8(a_o);
  }

  function MWChoiceQuestionFrom8(a_o){
    var that = this;
    that.data = a_o.data;
    that.$view = $('#view');
    that.$choiceQuestion = $('<div id="viewCQ8'+g_index+'" class="full center" style="display:none;">'+
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
    '</div>');
    // that.$choiceQuestion = $('#choiceQuestion');
    that.$view.append(that.$choiceQuestion);
    // that.$choiceQuestion.hide();
    that.$question = $('#questionCQ8'+g_index+'');
    that.$answer = $('#choiceQuestionFrom8'+g_index+'>.answer');
    that.$answer.each(function(a_i, a_e){
      $(a_e).click(function(){
                that.userSelectedData = {
                  aid:that.data.answer[a_i].aid,
                  qid:that.data.answer[a_i].qid,
                  correct:a_i
                }
                mwcommunicate.setTasksData(that.userSelectedData);
                console.log('MWChoiceQuestionFrom8 select:',a_i)
            })
    });
  }
  MWChoiceQuestionFrom8.prototype = {

    startCallback:function(){
      var that = this;
      that.$question.html(that.data.title);
      that.$answer.each(function(i,e){
        $(e).html(that.data.answer[i].name);
      })
      that.$choiceQuestion.show();
      mwfooter.hide();
      // $('#view').html('MWChoiceQuestion startCallback')
    },
    endCallback:function(){
      var that = this;
      that.$choiceQuestion.hide();
      mwfooter.show();
      // alert('endCallback')
      // $('#view').html('MWChoiceQuestion endCallback')
    }
  }
  return {init:init};
})
