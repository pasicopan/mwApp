/*
description.js
 */
define(['require','exports','modules/mwtimeline/mwtimeline.js'],function(require,exports,mwtimeline){
  mwtimeline = mwtimeline.mwtimeline;

  function init(a_o){

    return new MWDescription(a_o);
  }

  function MWDescription(a_o){
    // load css file
    // append element
    var that = this;
    that.taskController = a_o.taskController;
    // console.log('a_o is:',a_o)
    

    that.$description = $('<div id="description" class="description full center" ></div>');

    that.$descriptionWrapper = $('<div id="wrapper" class="full">'+
    '<div id="scroller">'+
      '<div class="slide fullScreen center">'+
        '<div class="">'+
          '<img class="singerImg" src="img/logo.png">'+
          '<p id="waitingCountDown" class="waitingCountDown" ></p>'+
          '<div id="descriptionText" class="" style="text-align:center;">看直播，玩竞猜赢大奖，敬请期待：</div>'+
          
          '<div id="countDown" class="countDown ">'+
              '<div><span>00</span>天<span>00</span>时<span>00</span>分<span>00</span>秒</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="slide fullScreen center">'+
        '<div class="">'+
          '<img class="singerImg" src="img/8.png">'+
          '<div class="detail "></div>'+
        '</div>'+
      '</div>'+
      '<div class="slide fullScreen center">'+
        '<div class="">'+
          '<img class="singerImg" src="img/8.png">'+
          '<div class="detail "></div>'+
        '</div>'+
      '</div>'+
      '<div class="slide fullScreen center">'+
        '<div class="">'+
          '<img class="singerImg" src="img/8.png">'+
          '<div class="detail "></div>'+
        '</div>'+
      '</div>'+
      '<div class="slide fullScreen center">'+
        '<div class="">'+
          '<img class="singerImg" src="img/8.png">'+
          '<div class="detail "></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '</div>');
    that.$scrollFocus = $('<ul id="scrollFocus">'+
        '<li class="show"></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>'+
    '</ul>');
    
    that.$description.append(that.$descriptionWrapper);
    that.$description.append(that.$scrollFocus);


    that.$view = $('#view');
    
    that.$view.append(that.$description);
    $('.slide.fullScreen').css({width:window.innerWidth+'px',height:window.innerHeight+'px'})
    $('.slide .detail').each(function(a_i, a_e){
      $(a_e).html('2014年5月推出第一首个人粤语单曲《密室逃脱》，说唱部分请来广东著名演员康天庥扮演者李俊毅担任；个人音乐作品《123》打入原创酷狗音乐榜。')
    })

    // console.log('that.$wrapper is:',$('#wrapper').get(0))
    that.descriptionScroll = new IScroll('#wrapper', {
      scrollX: false,
      scrollY: true,
      momentum: false,
      snap: true,
      snapSpeed: 400
    });
    that.$waitingCountDown = $('#waitingCountDown');
    that.$countDown = $('#countDown');
    that.$countDownSpan = $('#countDown span');
    that.$description = $('#description');
    that.$descriptionText = $('#descriptionText');
    that.$wrapper = $('#wrapper');
    that.descriptionScroll.on('scrollEnd',function(e){
      var pageIndex = Math.abs(this.y)/window.innerHeight;
      $('#scrollFocus>li:nth-of-type('+(pageIndex+1)+')').addClass('show').siblings().removeClass('show')
      // console.log(Math.abs(this.y)/window.innerHeight)
    })


  }
  MWDescription.prototype = {
    countDownForPageDescription:function(){
      var that = this;
      var partTimeStart = 0;
      // console.log('countDownForPageDescription')
      // console.log('MWDescription,that.taskController is:',that.taskController)
      var r = that.taskController.activityStart - mwtimeline.getTime();
      if(r<0){
        
        return;
      }
      // console.log('r is:',r)
      timeArr = mwtimeline.formatTime(r);    
      that.$countDownSpan.each(function(a_i, a_e){
        a_e.innerHTML = timeArr[a_i];
      })
    },
    startCallback:function(){
      var that = this;
      console.warn('活动开始')
      // that.$question.html(that.data.title);
      // that.$answer.each(function(i,e){
      //   $(e).html(that.data.answer[i].name);
      // })
      console.log('MWDescription startCallback')
      // that.$description.show();
      // that.$description.hide();
      mwtimeline.clearInterval(that._c);
      that.$countDown.hide();
      // $('#view').html('MWChoiceQuestion startCallback')

    },
    waitingCallback:function(a_o){

      var that = this;
      console.log('MWDescription waitingCallback')
      that.$descriptionText.html('<p>节目开始，马上打开电视！</p><p>观看珠江频道，准备答题拿大奖。</p>');
      // that._d = function(){
        mwtimeline.countDown({
          timestamp:a_o.timestampStart,
          callback:function(a_t){
            // console.log('a_t is:',a_t)
            var arr = mwtimeline.formatTime(a_t);
            console.log('a_t is:',a_t)
            if(0>parseInt(a_t)){
              that.$description.hide();
            }
            that.$waitingCountDown.html(arr[2]+':'+arr[3]);
          }
        });
        that.descriptionScroll.refresh();
      // }
    },
    endCallback:function(){
      var that = this;
      console.log('MWDescription endCallback')
      that._c = function(){that.countDownForPageDescription();}
      mwtimeline.setInterval(that._c)
      that.$description.show();
      that.$countDown.show();
      // that.$choiceQuestion.hide();
      // alert('endCallback')
      // $('#view').html('MWChoiceQuestion endCallback')
    }
  }
  return {init:init};
})
