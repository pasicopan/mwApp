/*
MWPK.js
 */
define(['modules/mwcommunicate/mwcommunicate.js','modules/mwheader/mwheader.js','modules/mwfooter/mwfooter.js','modules/mwwindow/mwwindow.js'],function(mwcommunicate,mwheader,mwfooter,mwwindow){
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
            '<div class="answer"></div>'+
          '</div>'+
          '<div class="answerContainer center">'+
            '<p class="pktext">PK</p>'+
          '</div>'+
          '<div class="answerContainer">'+
            '<div class="answer"></div>'+
          '</div>'+
        '</section>'+
        '<div id="PKQuestion'+g_index+'" class="PKQuestion"></div>'+
    '</div>');
    // that.$choiceQuestion = $('#choiceQuestion');
    that.$view.append(that.$choiceQuestion);
    // that.$choiceQuestion.hide();
    that.$question = $('#PKQuestion'+g_index);

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
        mwwindow.showConfirm({
          msg:'你确定？',
          callback:function(a_b){

            console.log('you select is:',a_b)
          }
        });
        that.userSelectedData = {
          aid:that.data.answer[a_i].aid,
          qid:that.data.answer[a_i].qid,
          correct:a_i
        }
        // mwcommunicate.setTasksData(that.userSelectedData);
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
        console.log('pk startCallback')
        // $(e).html(that.data.answer[i].name);
      // })
      that.$choiceQuestion.show();
      mwfooter.hide();
      // mwheader.setCountDown({
      //   time:that.data
      // });
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
    },
    waitingCallback:function(){
      var that = this;
      console.log('-----pk waitingCallback')
    }
  }
  return {init:init};
})
