/*
mwtimeline.js
 */
define(['require','exports'],function(require,exports){
  

  function init(a_o){

    return new MWChoiceQuestion(a_o);
  }

  function MWChoiceQuestion(a_o){
    var that = this;
    that.data = a_o.data;
    that.$choiceQuestion = $('#choiceQuestion');
    that.$choiceQuestion.hide();
    that.$question = $('#question');
    that.$answer = $('#choiceQuestion>.answer');
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
