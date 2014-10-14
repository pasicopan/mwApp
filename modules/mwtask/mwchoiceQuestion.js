/*
mwtimeline.js
 */
define(['require','exports'],function(require,exports){
  
  var g_index = 0;
  function init(a_o){
    g_index++;
    return new MWChoiceQuestion(a_o);
  }

  function MWChoiceQuestion(a_o){
    var that = this;
    that.data = a_o.data;
    that.$view = $('#view');
    that.$choiceQuestion = $('<div id="viewCQ'+g_index+'" class="full center" style="display:none;">'+
        '<section id="choiceQuestion'+g_index+'" class="choiceQuestion">'+
          '<div id="question'+g_index+'" class="question b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
          '<div class="answer b"></div>'+
        '</section>'+
    '</div>');
    // that.$choiceQuestion = $('#choiceQuestion');
    that.$view.append(that.$choiceQuestion);
    // that.$choiceQuestion.hide();
    that.$question = $('#question'+g_index+'');
    that.$answer = $('#choiceQuestion'+g_index+'>.answer');
  }
  MWChoiceQuestion.prototype = {

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
