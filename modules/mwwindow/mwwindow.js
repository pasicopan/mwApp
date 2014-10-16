/*
mwwindow.js
 */
define(['require','exports'],function(require,exports) {
  console.log('mwwindow');
  // var mwevent = require('modules/mwevent/mwevent.js');
  var cssURL = 'modules/mwwindow/mwwindow.css';
  // console.log('require.toUrl() is:',require.toUrl('../mwwindow.css'));
  var mwalert = null;
  function MWWindow(){
    var that = this;
    // that.name = '';

    that.__css__ = $('<link rel="stylesheet" href="'+cssURL+'">').appendTo('head');
    that.__container__string = '<div id="mwwindow_container" class="mwwindow_container mwcenter ab" >'+
                                  '<div id="mwwindow_msgBox" class="mwwindow_msgBox">'+
                                    '<div id="mwwindow_msgBox_msg" class="mwwindow_msgBox_msg">'+
                                      '<div id="mwwindow_msgBox_scroll" class="mwwindow_msgBox_scroll ab">'+
                                        '<div id="mwwindow_msgBox_scroller" class="mwwindow_msgBox_scroller ab">'+
                                        '</div>'+
                                      '</div>'+
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

    that.mwwindow_msgBox_scroll = new IScroll('#mwwindow_msgBox_scroll', {
      scrollX: false,
      scrollY: true,
      momentum: false,
      snap: true,
      snapSpeed: 400
    });

    that.$msgBox= $('#mwwindow_msgBox');
    that.$mwwindow_msgBox_scroller= $('#mwwindow_msgBox_scroller');
    that.$submitBtn= $('#mwwindow_msgBox_submitBtn');
    that.$closeBtn= $('#mwwindow_msgBox_closeBtn');
    // console.log('that.__container__ is:',that.__container__)
    // that.$submitBtn;
    that.$submitBtn.click(function(){
      that.hideAlert();
      // mwevent.trigger('mwalert_hide');
    });
    that.$closeBtn.click(function(){
      that.hideAlert();
      // mwevent.trigger('mwalert_hide');
    });
  }
  MWWindow.prototype = {
    showAlert:function(a_options){
      var that = this;
      that.$msgBox.addClass('show');
      that.$submitBtn.html(a_options.submit||'确定');
      that.$mwwindow_msgBox_scroller.html(a_options.msg);
      that.mwwindow_msgBox_scroll.refresh();

      that.__container__.show();
      that.__container__.addClass('show');
      if(a_options.callback){
        a_options.callback();
      }
      // alert(a_options.msg);
    },
    hideAlert:function(){
      // alert(a_options.msg);
      var that = this;
      that.$msgBox.removeClass('show');
      that.__container__.removeClass('show');
    }
  }
  // return {a:new MWAlert()}
  // mwevent.addEvent('mwalert_show',function(a_options) {
  //     mwalert = mwalert || new MWAlert();
  //     // console.log('mwalert_show:',a_options.msg)
  //     mwalert.show(a_options);
  //     return;
  // });
  // mwevent.addEvent('mwalert_hide',function() {
  //     mwalert = mwalert || new MWAlert();
  //     mwalert.hide();
  //     return;
  // });
  return new MWWindow();
})