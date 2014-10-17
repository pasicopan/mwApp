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
                                  '<div id="mwwindow_confirmBox" class="mwwindow_confirmBox">'+
                                    '<div id="mwwindow_confirmBox_msg" class="mwwindow_confirmBox_msg">'+
                                    '</div>'+

                                    '<div id="mwwindow_confirmBox_btn" class="mwwindow_confirmBox_btn">'+
                                      '<div id="mwwindow_confirmBox_submitBtn" class="mwwindow_confirmBox_submitBtn">'+
                                        '<span>确定</span>'+
                                      '</div>'+
                                      '<div id="mwwindow_confirmBox_cancelBtn" class="mwwindow_confirmBox_cancelBtn">'+
                                        '<span>取消</span>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
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
    that.$mwwindow_confirmBox = $('#mwwindow_confirmBox');
    that.$mwwindow_confirmBox_msg = $('#mwwindow_confirmBox_msg');
    that.$mwwindow_confirmBox_btn = $('#mwwindow_confirmBox_btn');
    that.$mwwindow_confirmBox_submitBtn = $('#mwwindow_confirmBox_submitBtn');
    that.$mwwindow_confirmBox_cancelBtn = $('#mwwindow_confirmBox_cancelBtn');

    that.$mwwindow_confirmBox_submitBtn.click(function(){
      that.hideConfirm();
      if(that.confirmCallback){
        console.log('mwwindow_confirmBox_submitBtn')
        that.confirmCallback(true);
        that.confirmCallback = null;
      }
    });
    that.$mwwindow_confirmBox_cancelBtn.click(function(){
      that.hideConfirm();
        console.log('mwwindow_confirmBox_cancelBtn')
      if(that.confirmCallback){
        that.confirmCallback(false);
        that.confirmCallback = null;
      }
    });


    that.__container__msg = $('#mwwindow_msgBox_msg');

    that.mwwindow_msgBox_scroll = new IScroll('#mwwindow_msgBox_scroll', {
      scrollX: false,
      scrollY: true,
      momentum: false,
      snap: true,
      snapSpeed: 400
    });

    that.$mwwindow_msgBox= $('#mwwindow_msgBox');
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
    showConfirm:function(a_options){
      var that = this;
      // that.$msgBox.addClass('show');
      that.$mwwindow_confirmBox_msg.html(a_options.msg);
      // that.$mwwindow_confirmBox_submitBtn.html('确定');
      that.$mwwindow_confirmBox.show();
      that.$mwwindow_confirmBox_btn.show();

      that.__container__.show();
      that.__container__.addClass('show');
      if(a_options.callback){
        // a_options.callback();
        that.confirmCallback = a_options.callback;
      }
    },
    hideConfirm:function(){
      var that = this;
      that.__container__.removeClass('show');
      that.__container__.hide();

      that.$mwwindow_confirmBox.hide();
      that.$mwwindow_confirmBox_btn.hide();
    },
    showMsg:function(a_options){
      var that = this;
      that.$mwwindow_msgBox.addClass('show');
      console.log('mwwindow_msgBox is:',that.$mwwindow_msgBox)
      that.$mwwindow_msgBox.show();
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
      that.$mwwindow_msgBox.removeClass('show');
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