/*
mwfooter.js
 */
define(['require','exports','modules/mwevent/mwevent.js'],function(require,exports,mwevent){
  var cssURL = 'modules/mwfooter/mwfooter.css';
  var mwfooter = null;
  function MWFooter(){
    var that = this;
    that.__css__ = $('<link rel="stylesheet" href="'+cssURL+'">').appendTo('head');
    that.__container__string = '<div id="mwfooter_container" class="mwfooter_container ">'+
                                  '<ul id="mwfooter_container_UL" class="mwfooter_container_UL mwcenter">'+
                                    '<li id="mwfooter_btn1" class="mwfooter_btn mwcenter">'+
                                    '<span>去刮奖</span>'+
                                    '</li>'+
                                    '<li id="" class="mwfooter_btnGap">'+
                                    '</li>'+
                                    '<li id="mwfooter_btn2" class="mwfooter_btn mwcenter">'+
                                    '<span>去刮奖</span>'+
                                    '</li>'+
                                    '<li id="" class="mwfooter_btnGap">'+
                                    '</li>'+
                                    '<li id="mwfooter_btn3" class="mwfooter_btn mwcenter">'+
                                    '<span>去刮奖</span>'+
                                    '</li>'+
                                  '</ul>'+
                                '</div>'
    that.__container__ = $(that.__container__string).appendTo('body');
    that.$mwfooter_btn1 = $('#mwfooter_btn1');
    that.$mwfooter_btn2 = $('#mwfooter_btn2');
    that.$mwfooter_btn3 = $('#mwfooter_btn3');
    that.$mwfooter_btn1.click(function(){
      console.log("that.$mwfooter_btn1 is:",that.$mwfooter_btn1)
      that.hide();
    });
    that.$mwfooter_btn2.click(function(){
      // console.log("that.$mwfooter_btn1 is:",that.$mwfooter_btn1)
      mwevent.trigger('mwalert_show',{msg:'没有抽奖机会了'})
      mwevent.addEvent('mwalert_hide',that.show);
      that.hide();
    });
  }
  MWFooter.prototype = {
    show:function(){
      mwfooter = mwfooter || new MWFooter();
      mwevent.removeEvent('mwalert_hide',mwfooter.show);
      // console.log('mwfooter that is:',that)
      // console.log('mwfooter that.__container__ is:',that.__container__)
      mwfooter.__container__.addClass('show')
    },
    hide:function(){
      mwfooter = mwfooter || new MWFooter();
      mwfooter.__container__.removeClass('show')
    }
  }
  mwevent.addEvent('mwfooter_show',function(a_options) {
      mwfooter = mwfooter || new MWFooter();
      // console.log('mwalert_show:',a_options.msg)
      mwfooter.show();
      return;
  });
  mwevent.addEvent('mwfooter_hide',function() {
      mwfooter = mwfooter || new MWFooter();
      mwfooter.hide();
      return;
  });
  // return ;
  // exports.mwevent = new MWEvent();
})