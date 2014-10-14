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
    // that.data = a_o.data;
    

    that.$description = $('<div id="description" class="description full center" ></div>');

    that.$descriptionWrapper = $('<div id="wrapper" class="full">'+
    '<div id="scroller">'+
      '<div class="slide fullScreen center">'+
        '<div class="">'+
          '<img class="singerImg" src="img/logo.png">'+
          '<div class=" " style="text-align:center;">看直播，玩竞猜赢大奖，敬请期待：</div>'+
          
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
    var descriptionScroll = new IScroll('#wrapper', {
      scrollX: false,
      scrollY: true,
      momentum: false,
      snap: true,
      snapSpeed: 400,
      // keyBindings: true,
      // indicators: {
      //   el: document.getElementById('indicator'),
      //   resize: false
      // }
    });
    that.$description = $('#description');
    that.$wrapper = $('#wrapper');
    descriptionScroll.on('scrollEnd',function(e){
      var pageIndex = Math.abs(this.y)/window.innerHeight;
      $('#scrollFocus>li:nth-of-type('+(pageIndex+1)+')').addClass('show').siblings().removeClass('show')
      // console.log(Math.abs(this.y)/window.innerHeight)
    })
    //把秒算成秒分时日
    function setDurationArry(seconds){

      // if(seconds<0) erreHandle();
      seconds++;
      return [Math.floor(seconds/(24*60*60)),  Math.floor(seconds/3600)%24, Math.floor(seconds/60)%60  ,seconds%(60)]
    }
    // 2014-10-13 20:22:59
    function countDownForPageDescription(){
      // console.log('a_o.data.timeStart is:',a_o.data.timeStart)
      // console.log('a_o.taskController.activityStart is:',a_o.taskController.activityStart)
      var partTimeStart = 0;

      // a_o.data.timeStart.split(':').forEach(function(a_num, a_index){
      //   // console.log('tipartTimeStartme is:',partTimeStart)
      //   partTimeStart += parseInt(a_num)*1000*Math.pow(60,(2-a_index) );
      // })     
      // partTimeStart += new Date(a_o.taskController.activityStart).getTime(); 

      function formatToTwoString(num){
        if(num<10) num="0"+num;
        return num
      }

      // console.log('a_o.taskController.activityStart is:',a_o.taskController.activityStart)

      // var r = partTimeStart - mwtimeline.getTime();
      var r = a_o.taskController.activityStart - mwtimeline.getTime();
      if(r<0){
        that.$description.hide();
        mwtimeline.clearInterval(countDownForPageDescription);
        return;
      }

      console.log('r is:',r)
      var seconds = r/1000;
      var timeArr = [Math.floor(seconds/(24*60*60)),  Math.floor(seconds/3600)%24, Math.floor(seconds/60)%60  ,Math.floor(seconds%(60))];
      
      $('#countDown span').each(function(a_i, a_e){
        a_e.innerHTML = formatToTwoString(timeArr[a_i]);
      })
    }
    // countDownForPageDescription()
    mwtimeline.setInterval(countDownForPageDescription)
    // alert(a_o.taskController.activityEnd)
    mwtimeline.setTimer({
      timestamp:a_o.taskController.activityEnd,
      callback:function(){
        // 本期活动结束
        // alert(0)
        that.$description.show();
        // 考虑刷新页码，计算下一期的时间
      }
    })

  }
  MWDescription.prototype = {

    startCallback:function(){
      var that = this;
      // that.$question.html(that.data.title);
      // that.$answer.each(function(i,e){
      //   $(e).html(that.data.answer[i].name);
      // })
      that.$description.show();
      // $('#view').html('MWChoiceQuestion startCallback')

    },
    endCallback:function(){
      var that = this;
      that.$description.hide();
      // that.$choiceQuestion.hide();
      // alert('endCallback')
      // $('#view').html('MWChoiceQuestion endCallback')
    }
  }
  return {init:init};
})
