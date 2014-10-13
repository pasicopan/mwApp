/*
mwtimeline.js
 */
define(['require','exports'],function(require,exports){
  

  function init(a_o){

    return new MWDescription(a_o);
  }

  function MWDescription(a_o){
    // load css file
    // append element
    var that = this;
    // that.data = a_o.data;
    

    that.$description = $('<div id="description" class="description full center"></div>');

    that.$descriptionWrapper = $('<div id="wrapper" class="full">'+
    '<div id="scroller">'+
      '<div class="slide fullScreen">'+
        '<img class="singerImg" src="img/logo.png">'+
        '<div class=" ">看直播，玩竞猜赢大奖，敬请期待：</div>'+
        
        '<div class="countDown ">'+
                  '<div><span>00</span>天<span>00</span>时<span>00</span>分<span>00</span>秒</div>'+
                '</div>'+
      '</div>'+
      '<div class="slide fullScreen">'+
        '<img class="singerImg" src="img/8.png">'+
        '<div class="detail "></div>'+
      '</div>'+
      '<div class="slide fullScreen">'+
        '<img class="singerImg" src="img/8.png">'+
        '<div class="detail "></div>'+
      '</div>'+
      '<div class="slide fullScreen">'+
        '<img class="singerImg" src="img/8.png">'+
        '<div class="detail"></div>'+
      '</div>'+
      '<div class="slide fullScreen">'+
        '<img class="singerImg" src="img/8.png">'+
        '<div class="detail"></div>'+
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
    var $wrapper = $('#wrapper');
    descriptionScroll.on('scrollEnd',function(e){
      var pageIndex = Math.abs(this.y)/window.innerHeight;
      $('#scrollFocus>li:nth-of-type('+(pageIndex+1)+')').addClass('show').siblings().removeClass('show')
      // console.log(Math.abs(this.y)/window.innerHeight)
    })

    // that.$description.hide();
    // that.$question = $('#question');
    // that.$answer = $('#choiceQuestion>.answer');
  }
  MWDescription.prototype = {

    startCallback:function(){
      var that = this;
      // that.$question.html(that.data.title);
      // that.$answer.each(function(i,e){
      //   $(e).html(that.data.answer[i].name);
      // })
      // that.$choiceQuestion.show();
      // $('#view').html('MWChoiceQuestion startCallback')

    },
    endCallback:function(){
      var that = this;
      // that.$choiceQuestion.hide();
      // alert('endCallback')
      // $('#view').html('MWChoiceQuestion endCallback')
    }
  }
  return {init:init};
})
