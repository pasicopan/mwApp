/*
MWChoiceQuestion.js
 */
define(['modules/mwcommunicate/mwcommunicate.js','modules/mwfooter/mwfooter.js'],function(mwcommunicate,mwfooter){
 
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
          '<div class="singerContainer">'+
            '<img class="singerImg" src="">'+
            '<div class="singerName"></div>'+
            '<img class="singerShadow" src="img/singerShadow.png" >'+
          '</div>'+
          '<div id="question'+g_index+'" class="question"></div>'+
          '<div class="answer "></div>'+
          '<div class="answer "></div>'+
          // '<div class="answer answerBtn"></div>'+
          // '<div class="answer answerBtn"></div>'+
        '</section>'+
    '</div>');
    // that.$choiceQuestion = $('#choiceQuestion');
    that.$view.append(that.$choiceQuestion);
    // that.$choiceQuestion.hide();
    that.$question = $('#question'+g_index+'');
    that.$singerImg = $('#choiceQuestion'+g_index+' .singerImg');
    that.$singerName = $('#choiceQuestion'+g_index+' .singerName');
    mwcommunicate.getSingerInfo(that.data.singerId,function(a_oSingerInfo){
      that.$singerImg.attr('src',a_oSingerInfo.url);
      that.$singerName.html(a_oSingerInfo.name);
    });

    that.$answer = $('#choiceQuestion'+g_index+'>.answer');
    that.$answer.each(function(a_i, a_e){
      $(a_e).click(function(){
        that.userSelectedData = {
          aid:that.data.answer[a_i].aid,
          qid:that.data.answer[a_i].qid,
          correct:a_i
        }
        mwcommunicate.setTasksData(that.userSelectedData);
        console.log('MWChoiceQuestion select:',a_i)
      })
    });
  }
  MWChoiceQuestion.prototype = {

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
