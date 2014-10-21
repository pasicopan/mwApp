/*
mwheader.js
 */
define(['modules/mwcommunicate/mwcommunicate.js','modules/mwtimeline/mwtimeline.js','modules/mwwindow/mwwindow.js'],function(mwcommunicate,mwtimeline,mwwindow){
  
  console.log('mwheader mwtimeline is:',mwtimeline)

  var cssURL = 'modules/mwheader/mwheader.css';
  var mwheader = null;
  function MWHeader(){
    var that = this;
    that.__css__ = $('<link rel="stylesheet" href="'+cssURL+'">').appendTo('head');
    that.__container__string = '<div id="mwheader_container" class="mwheader_container ">'+
                                  '<ul id="mwheader_container_UL" class="mwheader_container_UL mwcenter">'+
                                    '<li id="mwheader_btn1" class="mwheader_btn">'+
                                    '<div id="sumPeople" class="sumPeople"></div>'+
                                    '<div id="" class="tipsText">人在参与</div>'+
                                    '</li>'+
                                    // '<li id="" class="mwheader_btnGap">'+
                                    // '</li>'+
                                    // '<li id="mwheader_btn2" class="mwheader_btn mwcenter">'+
                                    // '<span></span>'+
                                    // '</li>'+
                                    // '<li id="" class="mwheader_btnGap">'+
                                    // '</li>'+
                                    '<li id="mwheader_btn3" class="mwheader_btn mwheader_limitTime mwcenter">'+
                                      '<span class="headText">答题时间还剩</span><span id="headTime" class="headTime"></span>'+
                                    '</li>'+
                                  '</ul>'+
                                '</div>'
    that.__container__ = $(that.__container__string).appendTo('body');
    that.$headTime = $('#headTime');
    that.$mwheader_limitTime = $('.mwheader_limitTime');
    



    that.$mwheader_btn1 = $('#mwheader_btn1');
    // that.$mwheader_btn2 = $('#mwheader_btn2');
    // that.$mwheader_btn3 = $('#mwheader_btn3');
    // that.$mwheader_btn1.click(function(){
    //   console.log("that.$mwheader_btn1 is:",that.$mwheader_btn1)
    //   that.hide();
    // });
    // that.$mwheader_btn2.click(function(){
    //   mwevent.trigger('mwalert_show',{msg:'没有抽奖机会了'})
    //   mwevent.addEvent('mwalert_hide',that.show);
    //   that.hide();
    // });
    // setInterval(function() {
      that.peopleCreate();
    // },5000)
  }
  MWHeader.prototype = {
    setCountDown:function(a_o){
      var that = this;
      // console.log('mwtimeline is:',mwtimeline)
      // console.log('mwtimeline.countDown is:',mwtimeline.countDown)
      if(mwtimeline.mwtimeline){
        mwtimeline = mwtimeline.mwtimeline;
      }
      that.$mwheader_limitTime.addClass('show');
      mwtimeline.countDown({
        timestamp:a_o.time,
        callback:function(a_t){
          var arr = mwtimeline.formatTime(a_t);
          // console.log('MWHeader setCountDown:',arr)
          if(0>a_t){
            return;
          }
          that.$headTime.html(arr[2]+':'+arr[3]);
        }
      });
    },
    hideCountDown:function(){
      var that = this;
      that.$mwheader_limitTime.removeClass('show');
    },
    show:function(){
      var that = this;
      // mwheader = mwheader || new MWHeader();
      // mwevent.removeEvent('mwalert_hide',mwheader.show);
      that.__container__.addClass('show')
    },
    hide:function(){
      var that = this;
      // mwheader = mwheader || new MWHeader();
      that.__container__.removeClass('show')
    },
        //创建总人数
    peopleCreate:function (){
      mwcommunicate.getServerData(function(a_serverData){

        var  peopleTotal=a_serverData.total.toString();
        // var _this=this;
        var numArry=peopleTotal.split("");
        $sumNum=$("#sumPeople");
        $sumNum.html("");
        $sumNum.width(numArry.length*15);
        for (i in numArry) {
           $sumNum.prepend('<div><div class="out">&nbsp;</div><div class="show">'+ numArry[i] +'</div></div>')
        };
      });
    }
  }
  // mwevent.addEvent('mwheader_show',function(a_options) {
  //     mwheader = mwheader || new MWHeader();
  //     // console.log('mwalert_show:',a_options.msg)
  //     mwheader.show();
  //     return;
  // });
  // mwevent.addEvent('mwheader_hide',function() {
  //     mwheader = mwheader || new MWHeader();
  //     mwheader.hide();
  //     return;
  // });
  return new MWHeader();
  // exports.mwevent = new MWEvent();
})