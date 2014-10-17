/*
mwfooter.js
 */
define(['modules/mwcommunicate/mwcommunicate.js','modules/mwwindow/mwwindow.js'],function(mwcommunicate,mwwindow){
  
  // console.log('mwcommunicate is:',mwcommunicate)
  // mwcommunicate = mwcommunicate.mwcommunicate;
  var cssURL = 'modules/mwfooter/mwfooter.css';
  var mwfooter = null;
  function MWFooter(){
    var that = this;
    that.__css__ = $('<link rel="stylesheet" href="'+cssURL+'">').appendTo('head');
    that.__container__string = '<div id="mwfooter_container" class="mwfooter_container">'+
                                  '<ul id="mwfooter_container_UL" class="mwfooter_container_UL mwcenter">'+
                                    '<li id="mwfooter_btn1" class="mwfooter_btn mwcenter">'+
                                    '<span>去刮奖</span>'+
                                    '<span class="pop"></span>'+
                                    '</li>'+
                                    '<li id="" class="mwfooter_btnGap">'+
                                    '</li>'+
                                    '<li id="mwfooter_btn2" class="mwfooter_btn mwcenter">'+
                                    '<span>竞猜记录</span>'+
                                    '</li>'+
                                    '<li id="" class="mwfooter_btnGap">'+
                                    '</li>'+
                                    '<li id="mwfooter_btn3" class="mwfooter_btn mwcenter">'+
                                    '<span>活动规则</span>'+
                                    '</li>'+
                                    '<li id="" class="mwfooter_btnGap">'+
                                    '</li>'+
                                    '<li id="mwfooter_btn3" class="mwfooter_btn mwcenter">'+
                                    '<span>获奖名单</span>'+
                                    '</li>'+
                                  '</ul>'+
                                '</div>'
    that.__container__ = $(that.__container__string).appendTo('body');
    that.$mwfooter_btn1 = $('#mwfooter_btn1');
    that.$mwfooter_btn2 = $('#mwfooter_btn2');
    that.$mwfooter_btn3 = $('#mwfooter_btn3');
    that.$mwfooter_btn4 = $('#mwfooter_btn4');
    that.$mwfooter_btn1Pop = $('#mwfooter_btn1 .pop');

    

    that.$mwfooter_btn1.click(function(){
      // console.log('mwwindow is:',mwwindow)
      mwcommunicate.getLuckyInfo(function(a_o) {
        mwwindow.showMsg({
          msg:'你还有 '+(a_o.luckyTotal-a_o.luckyUse)+'个红包',
          callback:function(){

          }
        });
      });

      // console.log("that.$mwfooter_btn1 is:",that.$mwfooter_btn1)
      // that.hide();
    });
    that.$mwfooter_btn2.click(function(){
      console.log("that.$mwfooter_btn2 is:",that.$mwfooter_btn2)
      // console.log("that.$mwfooter_btn1 is:",that.$mwfooter_btn1)
      // mwevent.trigger('mwalert_show',{msg:'没有抽奖机会了'})
      // mwevent.addEvent('mwalert_hide',that.show);
      // that.hide();
    });
    that.updateLucky();
  }
  MWFooter.prototype = {
    updateLucky:function(){
      var that = this;
      mwcommunicate.getServerData(function(a_serverData){
        var luckyValid = a_serverData.luckyTotal - a_serverData.luckyUse;
        if(0 == luckyValid){
          that.$mwfooter_btn1Pop.hide();
        }else{

          that.$mwfooter_btn1Pop.html(luckyValid);
          that.$mwfooter_btn1Pop.show();
        }
      });
    },
    show:function(){
      var that = this;
      // mwfooter = mwfooter || new MWFooter();
      // mwevent.removeEvent('mwalert_hide',mwfooter.show);
      // console.log('mwfooter that is:',that)
      // console.log('mwfooter that.__container__ is:',that.__container__)
      this.__container__.addClass('show')
    },
    hide:function(){
      var that = this;
      // mwfooter = mwfooter || new MWFooter();
      that.__container__.removeClass('show')
    }
  }
  // mwevent.addEvent('mwfooter_show',function(a_options) {
  //     // mwfooter = mwfooter || new MWFooter();
  //     // console.log('mwalert_show:',a_options.msg)
  //     mwfooter.show();
  //     return;
  // });
  // mwevent.addEvent('mwfooter_hide',function() {
  //     mwfooter = mwfooter || new MWFooter();
  //     mwfooter.hide();
  //     return;
  // });
  return new MWFooter();
  // exports.mwevent = new MWEvent();
})