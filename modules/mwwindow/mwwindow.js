/*
mwwindow.js
 */
define(['require','exports','modules/mwevent/mwevent.js'],function(require,exports,mwevent) {
  console.log('mwwindow');
  // var mwevent = require('modules/mwevent/mwevent.js');
  var cssURL = 'modules/mwwindow/mwwindow.css';
  // console.log('require.toUrl() is:',require.toUrl('../mwwindow.css'));
  var mwalert = null;
  function MWAlert(){
    var that = this;
    // that.name = '';

    that.__css__ = $('<link rel="stylesheet" href="'+cssURL+'">').appendTo('head');
    that.__container__string = '<div id="mwwindow_container" class="mwwindow_container mwcenter">'+
                                  '<div id="mwwindow_msgBox" class="mwwindow_msgBox">'+
                                    '<div id="mwwindow_msgBox_msg" class="mwwindow_msgBox_msg">'+
                                    '</div>'+
                                    '<div id="mwwindow_msgBox_submitBtn" class="mwwindow_msgBox_submitBtn">'+
                                    // ''+
                                    '</div>'+
                                    '<div id="mwwindow_msgBox_closeBtn" class="mwwindow_msgBox_closeBtn">'+
                                    '</div>'+
                                  '</div>'+
                                '</div>'
    that.__container__ = $(that.__container__string).appendTo('body');
    that.__container__msg = $('#mwwindow_msgBox_msg');
    that.$msgBox= $('#mwwindow_msgBox');
    that.$submitBtn= $('#mwwindow_msgBox_submitBtn');
    that.$closeBtn= $('#mwwindow_msgBox_closeBtn');
    // console.log('that.__container__ is:',that.__container__)
    // that.$submitBtn;
    that.$submitBtn.click(function(){
      mwevent.trigger('mwalert_hide');
    });
    that.$closeBtn.click(function(){
      mwevent.trigger('mwalert_hide');
    });
  }
  MWAlert.prototype = {
    show:function(a_options){
      var that = this;
      mwalert.$msgBox.addClass('show');
      mwalert.$submitBtn.html(a_options.submit||'确定');
      that.__container__msg.html(a_options.msg);
      that.__container__.addClass('show');
      if(a_options.callback){
        a_options.callback();
      }
      // alert(a_options.msg);
    },
    hide:function(){
      // alert(a_options.msg);
      var that = this;
      mwalert.$msgBox.removeClass('show');
      that.__container__.removeClass('show');
    }
  }
  // return {a:new MWAlert()}
  mwevent.addEvent('mwalert_show',function(a_options) {
      mwalert = mwalert || new MWAlert();
      // console.log('mwalert_show:',a_options.msg)
      mwalert.show(a_options);
      return;
  });
  mwevent.addEvent('mwalert_hide',function() {
      mwalert = mwalert || new MWAlert();
      mwalert.hide();
      return;
  });
  return new MWAlert();
})