/*
MWChoiceQuestionFrom8.js
 */
define(['require','exports'],function(require,exports){
  
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
          '<div id="questionCQ8'+g_index+'" class="question b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div style="clear: both"></div>'+
        '</section>'+
    '</div>');
    // that.$choiceQuestion = $('#choiceQuestion');
    that.$view.append(that.$choiceQuestion);
    // that.$choiceQuestion.hide();
    that.$question = $('#questionCQ8'+g_index+'');
    that.$answer = $('#choiceQuestionFrom8'+g_index+'>.answer');
  }
  MWChoiceQuestionFrom8.prototype = {

    startCallback:function(){
      var that = this;
      that.$question.html(that.data.title);
      that.$answer.each(function(i,e){
        $(e).html(that.data.answer[i].name);
      })
      that.$choiceQuestion.show();
      // $('#view').html('MWChoiceQuestion startCallback')
    },
    endCallback:function(){
      var that = this;
      that.$choiceQuestion.hide();
      // alert('endCallback')
      // $('#view').html('MWChoiceQuestion endCallback')
    }
  }
  return {init:init};
})
