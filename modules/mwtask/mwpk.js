/*
MWPK.js
 */
define(['modules/mwcommunicate/mwcommunicate.js','modules/mwfooter/mwfooter.js'],function(mwcommunicate,mwfooter){
  console.log('MWPK.js');
  var g_index = 0;
  function init(a_o){
    g_index++;
    return new MWPK(a_o);
  }

  function MWPK(a_o){
    var that = this;
    that.data = a_o.data;
    that.$view = $('#view');
    that.$choiceQuestion = $('<div id="viewPK'+g_index+'" class="full center" style="display:none;">'+
        '<section id="PK'+g_index+'" class="pk">'+
          '<div class="answerContainer">'+
            '<img class="pkSingerImg" src="" alt="" />'+
            '<div class="answer answerBtn"></div>'+
          '</div>'+
          '<div class="answerContainer">'+
            '<img class="pkSingerImg" src="" alt="" />'+
            '<div class="answer answerBtn"></div>'+
          '</div>'+
        '</section>'+
        '<div id="PKQuestion'+g_index+'" class="PKQuestion"></div>'+
    '</div>');
    // that.$choiceQuestion = $('#choiceQuestion');
    that.$view.append(that.$choiceQuestion);
    // that.$choiceQuestion.hide();
    that.$question = $('#PKQuestion'+g_index);

    that.$singerImg = $('#PK'+g_index+' .pkSingerImg');
    that.$answer = $('#PK'+g_index+' .answer');
    that.$singerImg.each(function(a_i, a_e){
      mwcommunicate.getSingerInfo(parseInt(that.data.answer[a_i].name),function(a_oSingerInfo){
        a_e.src = a_oSingerInfo.url;
        that.$answer.get(a_i).innerHTML = a_oSingerInfo.name;
      });
    });

    that.$answer.each(function(a_i, a_e){
      $(a_e).click(function(){
        that.userSelectedData = {
          aid:that.data.answer[a_i].aid,
          qid:that.data.answer[a_i].qid,
          correct:a_i
        }
        mwcommunicate.setTasksData(that.userSelectedData);
        // console.log('mwcommunicate:',mwcommunicate)
        console.log('pk select:',a_i)
      })
    });
  }
  MWPK.prototype = {

    startCallback:function(){
      var that = this;
      that.$question.html(that.data.title);
      // that.$answer.each(function(i,e){
        // console.log('startCallback,',e)
        // $(e).html(that.data.answer[i].name);
      // })
      that.$choiceQuestion.show();
      mwfooter.hide();
      // $('#view').html('MWChoiceQuestion startCallback')
    },
    endCallback:function(){
      var that = this;
      // mwcommunicate(that.userSelectedData);
      // 显示答案
      that.$choiceQuestion.hide();
      mwfooter.show();
      // alert('endCallback')
      // $('#view').html('MWChoiceQuestion endCallback')
    }
  }
  return {init:init};
})
