/*
mwwindow.js
 */
define(['require','exports','modules/mwcommunicate/mwcommunicate.js'],function(require,exports,mwcommunicate) {
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
                                      '<div id="mwwindow_msgBox_scroll" class="mwwindow_msgBox_scroll rl">'+
                                        '<div id="mwwindow_msgBox_scroller" class="mwwindow_msgBox_scroller ab">'+
                                        '</div>'+
                                      '</div>'+
                                      '<div id="mwwindow_msgBox_closeBtn" class="mwwindow_msgBox_closeBtn">'+
                                      '</div>'+
                                    '</div>'+
                                    // '<div id="mwwindow_msgBox_submitBtn" class="mwwindow_msgBox_submitBtn">'+
                                    // ''+
                                    // '</div>'+
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
    // that.$submitBtn= $('#mwwindow_msgBox_submitBtn');
    that.$closeBtn= $('#mwwindow_msgBox_closeBtn');
    // console.log('that.__container__ is:',that.__container__)
    // that.$submitBtn;
    // that.$submitBtn.click(function(){
    //   that.hideMsg();
      // mwevent.trigger('mwalert_hide');
    // });
    that.$closeBtn.click(function(){
      that.hideMsg();
      // mwevent.trigger('mwalert_hide');
    });
  }
  MWWindow.prototype = {
    hideAwardList:function(a_options){
      var that = this;
      that.hideMsg();
    },
    showAwardList:function(a_options){
      var that = this;
      
      var htmlString = '<div id="attention" class="box button">'+
                '<div class="closeBtn"></div>'+
                '<div class="text">'+
                    '<h3>获奖名单</h3>'+
                    '<p>1、在微信首页聊天列表中，点击右上角的“+”号，进入“添加朋友”；</p>'+
                    '<p>2、在搜索框内，输入“珠江频道”或“GDTVZJPD2013”，进行搜索；</p>'+
                    '<p>3、在搜索结果中，进入订阅号页面，点击“关注”按钮；</p>'+
                    '<p>4、活动结束后，将通过订阅号公布名单。</p>'+
                '</div>'+
            '</div>';
        that.showMsg({
          msg:htmlString,h:350});
    },
    hideRule:function(a_options){
      var that = this;
      that.hideMsg();
    },
    showRule:function(a_options){
      var that = this;
      var htmlString = '<div id="rule" class="box button">'+
                '<div class="closeBtn"></div>'+
                '<div class="text">'+
                   ' <h3>活动规则</h3>'+
                    '<p>1、参加麦王争霸歌词竞猜，每猜对一次歌词，即可获得一次抽奖机会；</p>'+
                    '<p>2、参加麦王争霸选手竞猜，每猜对一次选手，即可获得一次抽奖机会；</p>'+
                    '<p>3、邀请好友一起来参与活动吧；</p>'+
                    '<p>4、获奖后，请在下期节目开始前填写手机号码，以便领奖。</p>'+
                    
                    '<h3>活动时间</h3>'+
                   ' <p>8月30日-11月底</p>'+
                '</div>'+
            '</div>';
      that.showMsg({
          msg:htmlString,h:350});
    },
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
    showLottery:function(a_options){
      
      var that = this;
      mwcommunicate.getLuckyInfo(function(a_o) {
        var htmlString = '<p class="tc">你已获得'+a_o.luckyTotal+'次抽奖机会</p>'+
                        '<p class="tc">已使用'+a_o.luckyUse+'次，还有'+(a_o.luckyTotal-a_o.luckyUse)+'次机会</p>'+
                        '<div class="center rl" >'+
                          '<div class="redPacket">'+
                            '<div class="redPacketText"></div>'+
                          '</div>'+
                          '<div class="shade"></div>'+
                        '</div>';
        that.showMsg({
          msg:htmlString,
          callback:function(){
            var $redPacket = $('.redPacket');
            var $redPacketText = $('.redPacketText');
              console.log('showMsg callback,$redPacket is:',$redPacket);
              $redPacket.bind('touchend',function(){

                mwcommunicate.getLotteryResult(function(a_data){

                  // console.log('getLotteryResult ,a_data is:',a_data);
                  // console.log('click redPacket');
                  $redPacket.addClass('shake');
                  setTimeout(function(){
                    $redPacket.removeClass('shake').addClass('open');
                  }, 2000)
                  if( a_data.lotteryResult==1){
                    for(i in a_data.awards){
                      serverData.awards=a_data.awards;
                      if(serverData.lotteryId==a_data.awards[i].lotteryId){
                        console.warn('【中奖了：'+a_data.awards[i].name+'】')
                        $redPacketText.html(a_data.awards[i].name)
                      } ;
                    }
                  }else{
                      console.warn('没有中奖');
                      $redPacketText.html('谢谢参与');
                  }
                });
            });
          }
        });
      });
    },
    showMsg:function(a_options){
      var that = this;
      that.$mwwindow_msgBox.addClass('show');
      // console.log('mwwindow_msgBox is:',that.$mwwindow_msgBox)
      that.$mwwindow_msgBox.show();
      // that.$submitBtn.html(a_options.submit||'确定');
      that.$mwwindow_msgBox_scroller.html(a_options.msg);

      that.__container__.show();
      that.__container__.addClass('show');
      if(a_options.h){
        that.__container__msg.css('height',a_options.h+'px');
      }else{
        that.__container__msg.css('height','200px');
      }
      if(a_options.lottery){
        that.__container__msg.addClass('lottery'); 
      }else{
        that.__container__msg.removeClass('lottery'); 
      }
      that.mwwindow_msgBox_scroll.refresh();
      if(a_options.callback){
        a_options.callback();
      }
      // alert(a_options.msg);
    },
    hideMsg:function(){
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