/*
mwheader.js
 */
define(['require','exports','modules/mwevent/mwevent.js'],function(require,exports,mwevent){
  var cssURL = 'modules/mwheader/mwheader.css';
  var mwheader = null;
  function MWHeader(){
    var that = this;
    that.__css__ = $('<link rel="stylesheet" href="'+cssURL+'">').appendTo('head');
    that.__container__string = '<div id="mwheader_container" class="mwheader_container ">'+
                                  '<ul id="mwheader_container_UL" class="mwheader_container_UL mwcenter">'+
                                    '<li id="mwheader_btn1" class="mwheader_btn mwcenter">'+
                                    '<span>去刮奖</span>'+
                                    '</li>'+
                                    '<li id="" class="mwheader_btnGap">'+
                                    '</li>'+
                                    '<li id="mwheader_btn2" class="mwheader_btn mwcenter">'+
                                    '<span>去刮奖</span>'+
                                    '</li>'+
                                    '<li id="" class="mwheader_btnGap">'+
                                    '</li>'+
                                    '<li id="mwheader_btn3" class="mwheader_btn mwcenter">'+
                                    '<span>去刮奖</span>'+
                                    '</li>'+
                                  '</ul>'+
                                '</div>'
    that.__container__ = $(that.__container__string).appendTo('body');
    that.$mwheader_btn1 = $('#mwheader_btn1');
    that.$mwheader_btn2 = $('#mwheader_btn2');
    that.$mwheader_btn3 = $('#mwheader_btn3');
    that.$mwheader_btn1.click(function(){
      console.log("that.$mwheader_btn1 is:",that.$mwheader_btn1)
      that.hide();
    });
    that.$mwheader_btn2.click(function(){
      mwevent.trigger('mwalert_show',{msg:'没有抽奖机会了'})
      mwevent.addEvent('mwalert_hide',that.show);
      that.hide();
    });
  }
  MWHeader.prototype = {
    show:function(){
      mwheader = mwheader || new MWHeader();
      mwevent.removeEvent('mwalert_hide',mwheader.show);
      mwheader.__container__.addClass('show')
    },
    hide:function(){
      mwheader = mwheader || new MWHeader();
      mwheader.__container__.removeClass('show')
    }
  }
  mwevent.addEvent('mwheader_show',function(a_options) {
      mwheader = mwheader || new MWHeader();
      // console.log('mwalert_show:',a_options.msg)
      mwheader.show();
      return;
  });
  mwevent.addEvent('mwheader_hide',function() {
      mwheader = mwheader || new MWHeader();
      mwheader.hide();
      return;
  });
  // return ;
  // exports.mwevent = new MWEvent();
})