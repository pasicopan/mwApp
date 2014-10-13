
//2014/9/1 23:45

var curlotteryId=28;
var serverData={
  openId:"",
  total:0,
  luckyTotal:0,
  luckyUse:0,
  isShare:0,
  lottery:0,
  answer:{},
  saveTime:0,
  ids:curlotteryId,
  awards:[],
  lotteryId:0,
  nickname:"",
  mobile:"",  
  isShowEnd:false,
  serverDate:0,
  correctTime:0,
};
var myggl;
var currentPage=false;//页面状态 0为预热 1猜歌词 2为PK
var pageStage=0; //页面状态 0为预热 1猜歌词 2为PK
var myscroll,singerScroll;
var isMove=false;
var durationArry;
var cutOff=10*1000; //截止与结束之间时长
var titleStage=0; //0答题时间 1截止时间 2结束时间
var titleIndex=0;//题目ID
var episode=false;//第几期
var isStart=false;
//总人数
var isok=false;  //是否到了这起节目
var cd;
var currentIsRight=false;
var arryAnwerrList=[];
var isEnd;
var imgOK=false;
var dataOK=false;
var isServer=false;
var isready=false;
var issetanswer=false;
var imageUrl='http://tuan.pcauto.com.cn/autotest/'
var imgArry=[imageUrl+"images/logo.png",imageUrl+"images/bg.jpg"];
var WechatShareUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect";
var WechatShareImgUrl = "http://wx.gz.1251113199.clb.myqcloud.com/html/images/shareIcon.jpg";
var WechatShareTitle = "我正在玩麦王争霸直播竞猜，快来加入，赢大奖。";
var WechatShareContent = "分享来自微信摇一摇——麦王争霸直播竞猜赢大奖活动";

//从数据库获取数据
readData(setData);
//为安卓加上安卓的CSS
if(browserRedirect()=="Android"){
       loadCss('stylesheets/style_Android.css')
 }
//判断设  
function browserRedirect(){
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = false;
    var v=0
    for ( v = 0; v < Agents.length; v++) 
    {  
         if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }  
    }  
   if(flag){
       return Agents[v];// 设备类型
    }
    else
    {
      return "other";
    }
}

//加载CSS
function loadCss(path){
        if(!path){return;}
        var l;
        if(!window["_loadCss"] || window["_loadCss"].indexOf(path)<0){
            l = document.createElement('link');
            l.setAttribute('type', 'text/css');
            l.setAttribute('rel', 'stylesheet');
            l.setAttribute('href', path);
            l.setAttribute("id","loadCss"+Math.random());
            document.getElementsByTagName("head")[0].appendChild(l);
            window["_loadCss"]?(window["_loadCss"]+="|"+path):(window["_loadCss"]="|"+path);
        }
        return true;
}




//从数据库拿到数据后处理
function setData(data){
    serverData.openId=data.openId;
    if(store.get("maiwang"+serverData.openId)){
       var newserverData=store.get("maiwang"+serverData.openId);
      for(i in newserverData){
           serverData[i]=newserverData[i];
      } 
    }
  for(i in data){
       serverData[i]=data[i];
  }
    dataOK=true;  
    var serverDate=serverData.serverDate;
    var arr=serverDate.split(" ");
    var serverTime;
    serverTime=countTime(arr[0],arr[1]);
    var nowd=new Date();
    var now=nowd.getTime()
    serverData.correctTime=serverTime - now;

    init();   
}


//显示错误页面
function showErrorPage(){
  currentPage=0;
  showPage(0);
  $('.fullpage').css({width:window.innerWidth+'px',height:window.innerHeight+'px'})
  $('#page1').addClass('error');
  $('.refresh').html('活动太火爆，抢麦的人太多<br/>请点击刷新页面').bind('touchend',function(){
    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect '
  })   
}




//获取参数
function getUrlMsg(a_sParamName){
    var reg = new RegExp("(^|\\?|&)"+ a_sParamName +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
    return "";
}

// 设置状态
function setStae(){
    var currentTime= new Date().getTime() + serverData.correctTime;
    var lastTime;
    console.log(question[1].eptimeEnd )
    if(!isStart){
      for(i=0;i<question.length;i++){

           var arr=question[i].eptimeEnd.split(" ");
           var data1Time=countTime(arr[0],arr[1]);
           console.log(data1Time);
        if(currentTime<data1Time){
           episode=i;
           break;
        }
      }
      if(episode===false){
          //活动结束
          titleIndex=0;
          pageStage=0;
          episode=0;
          isEnd=true;
          return 
      }
      var data3Time=relativeTime(question[episode].date,question[episode].eptimeStart.split(" ")[1],question[episode].questionList[0].timeStart)
      //计算是否已经开始活动
     
      if(currentTime>=data3Time){
        isStart=true;
      }else{
        pageStage=0;
        var eptime=countTime(question[episode].date,question[episode].eptimeStart.split(" ")[1])
        if(currentTime>=eptime){
          lastTime=Math.floor((data3Time-currentTime)/1000);
          isready=true;
          $('#page1_top .bottom').addClass("show");
          $(".countDown").addClass("hide");
        }else{
          lastTime=Math.floor((eptime-currentTime)/1000);
        }

      }
    }

  if(isStart){
    for(i=0;i<question[episode].questionList.length;i++){
      if(i==question[episode].questionList.length-1){
          titleIndex=i;
          break;
      }else{
           data1Time=relativeTime(question[episode].date , question[episode].eptimeStart.split(" ")[1] , question[episode].questionList[i+1].timeStart);
          if(currentTime<data1Time){
             titleIndex=i;
             break; 
          }   
      }
    }
   pageStage=question[episode].questionList[titleIndex].type; 

    data2Time=relativeTime(question[episode].date ,question[episode].eptimeStart.split(" ")[1], question[episode].questionList[titleIndex].timeEnd);
    var nTid="title_"+episode+"_"+titleIndex;

    //判断是否在答题以内
    if(currentTime<data2Time){
         if(currentTime<(data2Time-cutOff) && serverData.answer[nTid]==undefined ){//答题状态
             titleStage=0;
             lastTime=Math.floor((data2Time-cutOff-currentTime)/1000);
         }else{//截止状态

              titleStage=1;
              lastTime=Math.floor((data2Time-currentTime)/1000);

        }
      }else{
     
         if(titleIndex>=question[episode].questionList.length-1){//最后一题结束答题状态
                 isStart=false;
                 titleIndex=0;
                 pageStage=0;
                 titleStage=0;
                if(serverData.isShowEnd)  {
                   gameEnd();
                  serverData.isShowEnd=false;
                }
               if(episode==question.length-1){
                  $("#page1 .countDown>div").html("活动已经结束！请下期继续收看节目")
                }
                lastTime=Math.floor((relativeTime(question[episode+1].date , question[episode+1].eptimeStart.split(" ")[1], question[episode+1].questionList[0].timeStart)-currentTime)/1000);
         }else{//结束答题状态
          
             var data3Time=relativeTime(question[episode].date ,question[episode].eptimeStart.split(" ")[1] ,question[episode].questionList[(i+1)].timeStart);
             if(currentTime>=data2Time && currentTime<data3Time){
                 lastTime=Math.floor((data3Time-currentTime)/1000);
                 titleStage=2; 
                 countLvtest()
               
             }          
         }
      }
  }

     setDurationArry(lastTime); 
}

window.alert=function(str,c){
    if(c) $(".alert").addClass(c);
   $(".alert").html(str).addClass("show").addClass(c);
   setTimeout(function( ){ 
     if(c) $(".alert").removeClass(c);
    $(".alert").removeClass("show");
 },3000)
}


function countLvtest(){
  var rightTotle=0;
  var questionTotle=question[episode].questionList.length;
  var lvText=["歌霸","歌王","歌神"]
  for(i in serverData.answer){
    var arr=i.split("_");
    if(arr[1]==episode && serverData.answer[i]==1) rightTotle++;
  }
     var lv=rightTotle/questionTotle;
      var newLv;
      if(lv>=(1/3)&& lv<(1/2)){
         newLv=1;
      } else if(lv>=(1/2)&& lv<(2/3) ){
         newLv=2;
      }else if(lv>=(2/3) ){
         newLv=3; 
      }else{
        newLv=0
      }
      if(newLv>0){
        WechatShareTitle = "我答对"+rightTotle +"道题,我是"+lvText[newLv-1] +",我正在玩麦王争霸直播竞猜，快来加入，赢大奖。";

       }else{
         WechatShareTitle="我答对"+rightTotle +"道题,我正在玩麦王争霸直播竞猜，快来加入，赢大奖。" ;
      }  


}

//构造确定组件
var Confirm=function(){
    this.wrap=$('.confirmWrap');
    this.p=this.wrap.find('p')
    this.ok=$('.confirmWrap button').eq(1);
    this.cancel=$('.confirmWrap button').eq(0);
    this.addbind();
}
Confirm.prototype.show=function(confirmText,_callback){
   this.wrap.addClass("show");
   this.p.html(confirmText);
   this._callback=_callback;
   console.log(this._callback);
}
Confirm.prototype.close=function(confirmText,_callback){
   var that=this;
   that.wrap.removeClass("show");  
}
Confirm.prototype.addbind=function(){
     var that=this
     that.ok.bind('touchend',function(e){
        that._callback();
        that.close();
        e.stopPropagation(); 
     });
     that.cancel.bind('touchend',function(e){
        that.close(); 
     });
}




//相对时间
function relativeTime(date,startTime,rTime){
   var startTimeArry=startTime.split(":");
   var rTimeArry=rTime.split(":");
   var _len=startTimeArry.length-1;
   var timeStr="";

   for(j in startTimeArry){
    startTimeArry[_len-j]=parseInt(startTimeArry[_len-j]);
     startTimeArry[_len-j]+=parseInt(rTimeArry[_len-j]);
     //大于60进一位
     if(startTimeArry[_len-j]>=60){
       startTimeArry[_len-j]-=60;
       startTimeArry[_len-(j+1)]++ ; 
     } 
     //处理时间字符
     if(j==0){
        timeStr=startTimeArry[_len-j]+timeStr;
       }else{
        timeStr=startTimeArry[_len-j]+":"+timeStr;
     }
   }
    var newTime=countTime(date,timeStr);
   return newTime
}



//计算绝对时间 日期和时间 countTime("2014-8-20","8:9:20")
function countTime(date,time){
    var dateArry=date.split("-")
    var timeArry=time.split(":")
    dateArry[1]--;
    if(timeArry[0]>=24){
       timeArry[0]-=24;
       dateArry[2]++;
    }
    var newDate=new Date();
    newDate.setFullYear(dateArry[0],dateArry[1],dateArry[2]);
    newDate.setHours(timeArry[0],timeArry[1],timeArry[2]);
    return newDate.getTime();
}


// 改变状态
function changeStae(){
    setStae();
    changeTitleStea(titleStage); 
    if(titleStage==0 ||currentPage==false) showPage(pageStage);
}

// 改变答题状态

function changeTitleStea(){
      // if(titleStage==0){$("#page"+(pageStage+1) +" .answer>li").removeClass("current")};

    currentIsRight=false;
    var title=question[episode].questionList[titleIndex].title;
    var answer=question[episode].questionList[titleIndex].answer;
    var type=question[episode].questionList[titleIndex].type;
    var singerId=question[episode].questionList[titleIndex].singerId;
    var nTid="title_"+episode+"_"+titleIndex;
  


    if(serverData.answer[nTid]!=undefined){
        currentIsRight=serverData.answer[nTid];
        var answerIndex=question[episode].questionList[titleIndex].right;

    }

     switch (titleStage){
      case 0:
          $("#page"+(pageStage+1) +" .answer>li").removeClass("current").removeClass("out");
          $("#page"+(pageStage+1) +" .bottom").removeClass("stage1").addClass("stage0");
          $("#page"+(pageStage+1) +" .bottom .button").removeClass("show");
           $("#page"+(pageStage+1) +">.time").removeClass("hide");
          $("#nav").removeClass('show');
           issetanswer=false;
          break
      case 1:
           $("#page"+(pageStage+1) +" .text").html("答题截止，马上揭晓答案!<br />快邀请您的小伙伴一起参与吧！");
           $("#page"+(pageStage+1) +" .bottom").removeClass("stage0").addClass("stage1");
           myConfirm.close();
            $("#page"+(pageStage+1) +">.time").addClass("hide");
          break
      case 2:
           $("#nav").addClass('show');
          var $bottom=$("#page"+(pageStage+1) +" .bottom")
           if($bottom.hasClass("stage1")){
                $bottom.removeClass("stage1");
                 setTimeout(function(){$bottom.addClass("stage1");},300)
           }else{
            $bottom.removeClass("stage0").addClass("stage1");
           }
           $("#page"+(pageStage+1) +">.time").addClass("hide");
           if( currentIsRight){

              $("#page"+(pageStage+1) +" .text").html("恭喜你答对了，准备进入下一题!");
              $("#page"+(pageStage+1) +" .bottom .button").addClass("show");
           }else if(currentIsRight===0){
              $("#page"+(pageStage+1) +" .text").html("很遗憾答错了，准备进入下一题!");
           }else{
              $("#page"+(pageStage+1) +" .text").html("很遗憾你错过答题时间了，<br />准备进入下一题!");
           } 
          break
     }


  if(!issetanswer){
    if(type==1){//当时type为1 猜词
         $("#page2 .question").html(title);
         $("#page2 .singerImg").attr("src",singerUrl( singerId));
         $("#page2 .singerName").html(singerInfo[singerId].name).attr("data-id",singerId);

         $("#page2 .answer>li").each(function(index){
             $(this).html(answer[index]);
            if(answerIndex==index){
              if(currentIsRight==1){
                   $(this).addClass("current").siblings().addClass("out");
              }else if(currentIsRight==0){
                   $(this).addClass("out").siblings().addClass("current");
              }
            }
          })
    
        

    }else if(type==2){//当时type为2 猜PK
       
        var answer=question[episode].questionList[titleIndex].answer;
         $("#page3 .singerName").each(function(index){
             $(this).html( singerInfo[answer[index]].name)
         })
          $("#page3 .question").html("当前PK，谁能胜出");

         $("#page3 .singerImg").each(function(index){
             $(this).attr("src",singerUrl(answer[index]))
         })
         $("#page3 .answer>li").each(function(index){
             $(this).css("background-image","url("+singerUrl(answer[index])+")" )
         })
        console.log( currentIsRight)
         $("#page3 .answer>li").each(function(index){
            if(answerIndex==index){ 
              if(currentIsRight==1){
                   $(this).addClass("current").siblings().addClass("out");
              }else if(currentIsRight==0){
                   $(this).addClass("out").siblings().addClass("current");
              }
            }
         })
    }
    issetanswer=true;
  }



     if(pageStage==2 && currentIsRight!== false ){  
       $("#page3 .question").html("你已做出选择，猜中后可获得一次抽奖机会")
     }

}


//获取歌手图片地址
function singerUrl(id){
  return imageUrl+"images/singer/"+id+".png"
}



// 处理刮奖次数
function handleLuckyTimes(action){
    switch(action)
    {
    case 1://增加总数
      serverData.luckyTotal++
      break;
    case 2://增加已用次数
       if(serverData.luckyUse<serverData.luckyTotal) serverData.luckyUse++;
      break;
    default://0只是进入页面 设置数
    }
    $(".gglCount").html(serverData.luckyTotal);
    $(".gglUse").html(serverData.luckyTotal-serverData.luckyUse );
    $(".gglFinish").html(serverData.luckyUse )
}

//计算抽奖
function countlottery(){
        serverData.lottery=2;
        serverData.lotteryId=curlotteryId;
        serverData.ids=curlotteryId;
        serverData.luckyUse++;
        saveData(["lottery","luckyUse","lotteryId","ids"],function(data){ 
            if( data.lotteryResult==1){
                for(i in data.awards){
                  if(serverData.lotteryId==data.awards[i].lotteryId) $('#redPacketText').html(data.awards[i].name);
                }
                setTimeout(function(){
                    handleLuckyTimes(0);
                    $('#redPacket').removeClass('shake').addClass('open');
                    $('#lucky .recordUserInfo').removeClass('disabled'); 
                },500);
            }else{
               $('#redPacketText').html("谢谢参与")
                setTimeout(function(){
                    handleLuckyTimes(0);
                    $('#redPacket').removeClass('shake').addClass('open');
                    $('#lucky .continueBtn').removeClass('disabled'); 
                },500);
            }



        })
}



//点击答案后 计算答案 设置答案
function setAnswer(i){

   var answerIndex=question[episode].questionList[titleIndex].right;
   if(answerIndex==i){
     currentIsRight=1;
   }else{
      currentIsRight=0;
   }
   if(currentPage==2){
          var name=singerInfo[question[episode].questionList[titleIndex].answer[i]].name
         // $("#page3 .question").html("你已猜“"+ name +"”胜出，猜中将获一次刮奖机会。")
         $("#page3 .question").html("你已做出选择，猜中后可获得一次抽奖机会");         
   }
  
   var titleID="title_"+episode+"_"+titleIndex;
   serverData.answer[titleID]=currentIsRight;
   if(currentIsRight===1){handleLuckyTimes(1)}
   issetanswer=true;
   serverData.isShowEnd=true;
   saveData(["answer","luckyTotal","luckyUse"]);
    changeStae();
}



//把秒算成秒分时日
function setDurationArry(seconds){

  if(seconds<0) erreHandle();
    seconds++;
   durationArry=[Math.floor(seconds/(24*60*60)),  Math.floor(seconds/3600)%24, Math.floor(seconds/60)%60  ,seconds%(60)]

}

//倒计时处理
function counDownHandle(){

      durationArry[3]--;
      if(durationArry[3]<=0&&durationArry[2]<=0&& durationArry[1]<=0 && durationArry[0]<=0){changeStae();} 
      if(durationArry[3]<0){
         durationArry[3]=59;
         durationArry[2]--;
         if(durationArry[2]<0){
            durationArry[2]=59;
            durationArry[1]--
            if(durationArry[1]<0){
                durationArry[1]=23
                durationArry[0]--
            }
         }

      }
      if(currentPage==0){

        if(isready){
             $("#page1 .time").html(twoNum(durationArry[2])+":"+twoNum(durationArry[3]) );
        }else{

           $("#page1 .countDown span").each(function(i){
                $(this).html(twoNum(durationArry[i]) );
           }) 
         }
      }

      if(currentPage==1||currentPage==2){
           $(".time").html(twoNum(durationArry[2])+":"+twoNum(durationArry[3]) );
      }
      
      if(durationArry[3]%10==5 && currentPage!=0) {
          readData(
            function(data){
                serverData.total=data.total;
                peopleCreate();
            }
          );
      }


}



//判断是否小于10并返回两位数

function twoNum(num){
   if(num<10)   num="0"+num;
    return num
}


// // 倒计时

function counDown(callback){
var startTime = new Date().getTime(); 
var count = 0;
    fixed=function() { 
        count++; 
         // if(count%2==0){
         //
         //     peopleAdd()
         //  }
        var offset = new Date().getTime() - (startTime + count * 1000); 
        var nextTime = 1000 - offset; 
        if (nextTime < 0) nextTime = 0; 
            callback()
            var t=setTimeout(fixed, nextTime); 
        } 
        if(isEnd) return;
     counDownTimeout=setTimeout(fixed, 1000);
}





// 加载图片
  function loadImage(src,callback){
    var img = new Image();
            console.log(111);
    img.src = src;
        console.log(222);
    if(img.complete){
      console.log(333);
      callback();
      
    }else {
      img.onload = function(){
        console.log(333);
        callback();
      }
      img.onerror = function(){
        arguments.callee(src,callback);
      }
    }
  }

function erreHandle(){
  window.history.go(0) ;
}



//加载图片组
function loadImageList(imagesList,callback){
      var i=0;
      eachList()
      function eachList(){

          if(i===imagesList.length){
            if(callback) callback()
          }else {
            console.log( imagesList[i])
             loadImage(imagesList[i++],eachList);
          }        
      }
}

// 显示主页面 0：预热 1：歌词竞猜 2：PK竞猜
function showPage(i){
    var $page=$('.page');
    var $curPage=$('.page.show');
    var $nav=$('#nav');
     var $sum=$(".sum");

     if(i==0 && !singerScroll ){   
     setTimeout(function(){
         var singerList=['2','3','1','0','4','5','6','7']
         var singerhtml=""
         for(i in singerList){
          j=singerList[i]
          singerhtml+='<li class="fullpage" style="width:'+window.innerWidth +'px;height:'+window.innerHeight +
                              'px"><div class="top"><img class="singerImg centerHor" style="z-index:0;" src=" '+ imageUrl +'images/singer/'+j+'.png"  /><div class="singerName" data-id="'+j +'">'+singerInfo[j].name+'</div></div>'+   
                     '<div class="bottom"><div class="singerIntro">'+ singerInfo[j].intro+'</div></div></li>'   
         }

         $("#singersInfo").html(singerhtml); 
           singerScroll = new iScroll("page1", {
               snap: true,
               momentum: false, 
               hScrollbar: false,
               vScrollbar: false,
               onScrollEnd:singerScrollEnd
           });      
         },1000)
       }
       if(i==0 && singerScroll ){
         console.log('refresh')
         singerScroll.scrollTo(0,0,0);
       }

       if(i==0){
           $nav.addClass('show');
           $sum.removeClass('show');
           setTimeout(function(){handleLuckyTimes(0)},500)
       }else{
         $nav.removeClass('show');
         $sum.addClass('show');
       }


    if(currentPage===false){
      $page.eq(i).addClass('show').removeClass('out');
    }else{
        $curPage.removeClass('show').addClass('out');
          setTimeout(function(){       
            $page.eq(i).addClass('show').removeClass('out');     
            $curPage.removeClass('out');  
          },500)
    }   

    currentPage=i;
}

//歌手简介滚动效果
function singerScrollEnd(){
    $("#singersInfo>li").eq(singerScroll.currPageY-1).addClass("show").siblings().removeClass("show");
    $("#scrollFocus>li").eq(singerScroll.currPageY).addClass("show").siblings().removeClass("show");
}

//创建总人数
function peopleCreate(){
    var  peopleTotal=serverData.total.toString();
    var _this=this;
    var numArry=peopleTotal.split("");
    $sumNum=$(".sumpPeople");
    $sumNum.html("");
    $sumNum.width(numArry.length*15);
    for (i in numArry) {
       $sumNum.prepend('<div><div class="out">&nbsp;</div><div class="show">'+ numArry[i] +'</div></div>')
    };
}

//竞猜记录查看
function selectResult(){
var c=["一","二","三","四","五","六"];
var row=["wrong","right"]
var curE;
var right=[];
var phase=[];
var dl=[];
var lvdiv=[];
var lvText=["歌霸","歌王","歌神"]
var $recordScroller=$("#recordScroller")
var has=false;
var listbigList=""
$recordScroller.html("");

var awardsL=serverData.awards.length;
if(serverData.lottery==2) awardsL--;
 for(i=0; i<awardsL; i++){
    $('<div class="prize button">'+serverData.awards[i].name +'</div>').appendTo($recordScroller);
 }


  for(i in serverData.answer)
  {   has=true;
      var titleArry=i.split("_");
      if(titleArry[1]!=curE && titleArry[1]!=undefined){
        curE=titleArry[1];
        // console.log(curE);
        phase[curE]=$('<div class="phase"><div class="title">第'+ c[titleArry[1]] +'期</div></div>')

         dl[curE]=$('<dl></dl>')
         lvdiv[curE]=$('<div class="lv"></div>')
         phase[curE].prependTo($recordScroller);
         lvdiv[curE].appendTo(phase[curE]);
         $('<div class="prize button">50元话费</div>').appendTo(phase[curE]);
        dl[curE].appendTo(phase[curE]);
      } 
  }
  if(!has){
   $('<div class="phase"><div class="title">第'+ c[episode] +'期</div><p style=" text-align: center;">还没有记录请留意活动时间</p></div></div>').prependTo($recordScroller);

}

    for(i in serverData.answer)
    {  
      var titleArry=i.split("_");

      var titleName;
      if(titleArry[2]==undefined ||titleArry[1]==undefined ) continue;

      if(question[titleArry[1]].questionList[ titleArry[2]].type==1){
        titleName=question[ titleArry[1]].questionList[ titleArry[2]].answer[question[ titleArry[1]].questionList[ titleArry[2]].right]
        if(titleName.length>=12)  titleName=titleName.slice(0,14)+"...";
       
      }else{
         titleName=question[ titleArry[1]].questionList[ titleArry[2]].title
      }
      if( titleArry[2]>=10){
        listbigList+='<dd class="' + row[serverData.answer[i]] + '"> '+  titleName+'</dd>'
      }else{
          $('<dd class="' + row[serverData.answer[i]] + '"> '+  titleName+'</dd>').appendTo(dl[titleArry[1]]);
      }
      if( serverData.answer[i]){

        if(!right[titleArry[1]]){
          right[titleArry[1]]=1
        }else{
          right[titleArry[1]]++
        }
        
      } 
    }
   $(listbigList).appendTo(dl[titleArry[1]]);
    for(i in right){
      var lv=right[i]/question[i].questionList.length;
      var newLv;
      if(lv>=(1/3)&& lv<(1/2)){
         newLv=1;
      } else if(lv>=(1/2)&& lv<(2/3) ){
         newLv=2;
      }else if(lv>=(2/3) ){
         newLv=3; 
      }else{
        newLv=0
      }

      if(newLv>0){

       $('<div class="lvImg lv'+ newLv +'"></div><p>恭喜你猜中'+right[i]+"题，获得" +lvText[newLv-1]+'称号</p> ').appendTo(lvdiv[curE]);
      }

    }
    //查看信息
$('.prize').bind('touchmove',function(){
 isMove=true;
}).bind('touchend',function(){
  if(!isMove) showBox(1); 
  isMove=false;
})
}



function gameEnd(){//活动结束
 var lvText=["麦霸","麦王","麦神"];
 var right=0;
    for(i in serverData.answer){
      var titleArry=i.split("_");
      console.log(titleArry);
      if(titleArry[1]==(episode)&&serverData.answer[i]==1) right++;
    }

    var lv=right/question[episode].questionList.length;

    if(lv>=(1/3)&& lv<(1/2)){
         newLv=1;
      } else if(lv>=(1/2)&& lv<(2/3) ){
         newLv=2;
      }else if(lv>=(2/3) ){
         newLv=3; 
      }else{
       newLv=0
      }

      $('<div class="endText">猜对<strong>'+ right +'</strong>题,获得<strong>'+ right +'</strong>个刮刮乐，<br/>'+
'击败全国<strong>'+ Math.floor(right/question[episode].questionList.length*100) +'%</strong>的观众，<br />分享出去让小伙伴们眼红吧！</div>').prependTo($("#gameEnd"));

      if(newLv>0){
       $('<div class="lvImg lv'+ newLv +'"></div><p style="font-size:18px; color:#ffdb60;">恭喜' +lvText[newLv-1]+'</p> ').prependTo($("#gameEnd"));
      }else{
        $('<div style="height:50px;"> </div> ').prependTo($("#gameEnd"));
      }
      showBox(5)

$('.gjBtn').bind("touchend",function(){showBox(0)})
$('.shareBtn').bind("touchend",function(){
     alert("点击右上角分享朋友圈！")
})


}




// 显示弹框 0:刮刮乐 1：竞猜记录 2：游戏规则 3：结束提示
function showBox(i){
    var $cover=$('#cover');
    var $box=$('.box');
    var $curBox=$('.box.show');
    $cover.addClass('show');
    $box.eq(i).addClass('show');
    $curBox.removeClass('show');
     //进入抽奖页面
    if(i==0){
          handleLuckyTimes(0);
    }
    //查看信息页面
    if(i==1 || $('#userInfo .name').val()==""){
        $('#userInfo .name').val(serverData.nickname);
        $('#userInfo .phone').val(serverData.mobile); 
        $('.submit').addClass("disabled");
    }
    
     
    if(i==2){
      selectResult()
      if(!myscroll ){
      setTimeout(function(){
        myscroll = new iScroll("recordScroll", {
            snap: false,
            momentum: true,
            hideScrollbar:false
        });
      },500)
      }else{
         myscroll.refresh();
    }
    }

}

//关闭窗口
function closeBox(){
    var $cover=$('#cover');
    var $curBox=$('.box.show');
    $cover.removeClass('show');
    $curBox.removeClass('show');    
}

//更新抽奖
function reStartLucky(){ 
    $("#redPacket").removeClass('open');
    $('#lucky .continueBtn').addClass('disabled');
    $('#lucky .recordUserInfo').addClass('disabled'); 
}

//检查填写信息
function checkInfo(userName,mobile,show){
    var err="";
    if(!userName){
      err+="请输入名字!";
    }
    var myreg = /^(((13[0-9]{1})|159|153)+\d{8})$/;
    if(mobile.length!=11 || !myreg.test(mobile))
    {
        err+="请输入有效号码!";
    }
    if(err){
      return false
    }else{
      return true
    }
}




// 阻止滑动
$('body').bind('touchmove',function(e){
    e.preventDefault();
    e.stopPropagation(); 
})

//页面切换
$("#pageBtn").bind('touchend',function(){
       currentPage++
       if(currentPage == 3) currentPage=0 ; 
       showPage(currentPage);
   
})

//红包抽奖
$('#redPacket').bind('touchend',function(){

  if(!$(this).hasClass('open') && serverData.luckyTotal>serverData.luckyUse ){
      $(this).addClass("shake");
      countlottery();
  }
})


$(".titleStage .button").bind('touchend',function(){
  showBox(0)
})

//首页按钮
// $('.backBtn').bind('touchend',function(){
//    showPage(0);
// })

//导航
$('#nav li').bind('touchend',function(){
  if($(this).attr('data-b')){
     showBox($(this).attr('data-b'));
  }
 
})

//答题
$('.answer>li').bind('touchend',function(){
   var el=$(this);
   var index=$(this).index()
  if(currentIsRight===false){
      myConfirm.show("确定你的选择吗？",function(){
          el.addClass('current').siblings().addClass('out');
          setAnswer(index)
      })
      
  }
})

// 关闭窗口
$('#cover,.closeBtn,.laterBtn').bind('touchend',function(){
    closeBox();
})

// 继续刮奖 
$(".continueBtn").bind('touchend',function(){
   if($(this).hasClass('disabled')) return;
     if(serverData.luckyTotal-serverData.luckyUse>0){ 
        reStartLucky();        
     };
})



//检查信息
$('.submit').bind('touchend',function(){
      var userName=$('#userInfo .name').val();
      var mobile=$('#userInfo .phone').val();
      console.log(userName,mobile )
      if(checkInfo(userName,mobile,true)){
        // 赋值
        serverData.nickname=userName;
        serverData.mobile=mobile;
        saveData(["nickname","mobile"],function(){
          alert("提交成功");
          closeBox();
        });
      }
})

$('#userInfo input').bind('keyup',function(){
    var userName=$('#userInfo .name').val();
    var mobile=$('#userInfo .phone').val();
    if(checkInfo(userName,mobile,false)){
       $('.submit').removeClass("disabled");
    }else{
      $('.submit').addClass("disabled");
    }
})


$("#userInfo").bind("touchend",function(e){
  if(e.target.tagName==="INPUT"){
    $(e.target).focus();  
    e.preventDefault();
   e.stopPropagation();
   }
});

$('.button').bind('touchstart',function(){
        $(this).addClass('hover');
    }).bind('touchend',function(e){
      $(this).removeClass('hover');
        e.preventDefault();
        e.stopPropagation();
})


//跳去清楚数据页面
$("#clearStore").bind("touchend",function(){
  window.location.href="store.html?id="+serverData.openId;
})


 window.onresize=function(){
     $('.fullpage').css({width:window.innerWidth+'px',height:window.innerHeight+'px'})
 }  

//初始化页面
var myConfirm=new Confirm();
function init(){
    $('.fullpage').css({width:window.innerWidth+'px',height:window.innerHeight+'px'})
        changeStae();
        cd=new counDown(counDownHandle);
        peopleCreate();
}    





//ajax处理数据------------------------------------------------


function readData(callback){
var get_data={};
    var userId=getUrlMsg("id");
    if(store.get("maiwang_openid")){
       userId=store.get("maiwang_openid");
    };
    serverData.openId=userId;
    get_data.id = userId;
    var ticket=shaketv.getUserTicket();
    get_data.ticket=ticket;
  




if(userId || ticket ){
     // $("#loading").addClass("show");
    $.ajax({
            type:'GET',
            url:'http://wx.gz.1251113199.clb.myqcloud.com/api/lottery.jsp',
            data: get_data,
            dataType:'jsonp',
            timeout: 10000,
            context:$('#debug'),
            success: function(data){
              if(data.errmsg){
                if(data.errmsg.match("blank")){
                  store.set("maiwang_openid","");
                  window.location="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect"
                }
                else{
                  window.location="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect"
                }


              } else{  
                console.log("get数据");
                console.log(data);
                setStoreId(data.openId);
                if(callback) callback(data);
                  // $("#loading").removeClass("show");
              }

            },
            error: function(xhr, type){
              readData(callback);
              
              // showErrorPage();
              alert("ajax_get失败"+xhr)
              
            }
    })
}else{
   showErrorPage();
  
}


}


function setStoreId(id){
   if(  !store.get("maiwang_openid") ){
        store.set("maiwang_openid",id);
  }
}


function saveData(arry,callback){
var data={};
data.openId=serverData.openId;
for(i in arry){
   if (arry[i]=="answer") {
     data[arry[i]]=JSON.stringify(serverData[arry[i]])
   }else{
      data[arry[i]]=serverData[arry[i]]
   };
}
console.log("post数据")
console.log(data);
    // $("#loading").addClass("show");
   $.ajax({
        type:'POST',
        url:'http://wx.gz.1251113199.clb.myqcloud.com/api/lottery.jsp',
        dataType:'json',
        data:data,
        success: function(data){
            console.log("post成功")
            console.log(data);
            // $("#loading").removeClass("show");
            if(callback) callback(data);
        },
       error: function(xhr, type){
            $("#loading").removeClass("show");
             alert("post_get失败"+xhr);
            showErrorPage();
         }
        })
   serverData.saveTime=new Date().getTime();
   store.set("maiwang"+serverData.openId,serverData);
     
}



  
//-------------------     微信的东西   -----------------------------------------





var WechatShareSuccessCallBack = function(type){
      if(type=="appmessage"){
        _czc.push(﻿["_trackEvent","微信","分享朋友"]);
      }else if(type=="timeline"){
        _czc.push(﻿["_trackEvent","微信","分享朋友圈"]);
      }         
  };


    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }

    function onBridgeReady() {
        WeixinJSBridge.call('showOptionMenu');
        // 发送给好友; 
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": WechatShareImgUrl,
                "img_width": "100",
                "img_height": "100",
                "link": WechatShareUrl,
                "desc": WechatShareContent,
                "title": WechatShareTitle
            }, function (res) {
                if (res.err_msg.indexOf(":ok") > 0) {
                    if (WechatShareSuccessCallBack != undefined) { WechatShareSuccessCallBack(WechatShareType.appmessage); }
                }
            });
        });

        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": WechatShareImgUrl,
                "img_width": "100",
                "img_height": "100",
                "link": WechatShareUrl,
                "desc": WechatShareContent,
                "title": WechatShareTitle
            }, function (res) {
                if (res.err_msg.indexOf(":ok") > 0) {
                    if (WechatShareSuccessCallBack != undefined) { WechatShareSuccessCallBack(WechatShareType.timeline); }
                }
            });
        });
    }


