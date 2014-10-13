//2014/9/12 15:10
// var currentLotteryId = 123;
// var currentLotteryId=28;
var serverData = {
    openId: "",
    total: 0,
    luckyTotal: 0,
    luckyUse: 0,
    isShare: 0,
    lottery: 0,
    answer: {},
    saveTime: 0,
    ids: currentLotteryId,
    awards: [],
    lotteryId: 0,
    nickname: "",
    mobile: "",
    isShowEnd: false,
    serverDate: 0,
    correctTime: 0,
};
var myggl;
var currentPage = false; //页面状态 0为预热 1猜歌词 2为PK
var pageStage = 0; //页面状态 0为预热 1猜歌词 2为PK
var myscroll, singerScroll;
var isMove = false;
var durationArry;
var cutOff = 10 * 1000; //截止与结束之间时长
var titleStage = 0; //0答题时间 1截止时间 2结束时间
var titleIndex = 0; //题目ID
var episode = false; //第几期
var isStart = false;
//总人数
var isok = false; //是否到了这起节目
var cd;
var currentIsRight = false;
var arryAnwerrList = [];
var isEnd;
var imgOK = false;
var dataOK = false;
var isServer = false;
var isready = false;
var issetanswer = false;
var showAnswer = false;
// var imageUrl='http://tuan.pcauto.com.cn/autotest/'
// var imgArry=[imageUrl+"images/logo.png",imageUrl+"images/bg.jpg"];
var WechatShareUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect";
var WechatShareImgUrl = "http://wx.gz.1251113199.clb.myqcloud.com/html/images/shareIcon.jpg";
var WechatShareTitle = "我正在玩麦王争霸直播竞猜，快来加入，赢大奖。";
var WechatShareContent = "分享来自微信摇一摇——麦王争霸直播竞猜赢大奖活动";

//从数据库获取数据
readData(setData);
//为安卓加上安卓的CSS
if (browserRedirect() == "Android") {
    loadCss('stylesheets/style_Android.css')
}
//判断设
function browserRedirect() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = false;
    var v = 0
    for (v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    if (flag) {
        return Agents[v]; // 设备类型
    } else {
        return "other";
    }
}

//加载CSS
function loadCss(path) {
    if (!path) {
        return;
    }
    var l;
    if (!window["_loadCss"] || window["_loadCss"].indexOf(path) < 0) {
        l = document.createElement('link');
        l.setAttribute('type', 'text/css');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('href', path);
        l.setAttribute("id", "loadCss" + Math.random());
        document.getElementsByTagName("head")[0].appendChild(l);
        window["_loadCss"] ? (window["_loadCss"] += "|" + path) : (window["_loadCss"] = "|" + path);
    }
    return true;
}




//从数据库拿到数据后处理
function setData(data) {
    serverData.openId = data.openId;
    if (store.get("maiwang" + serverData.openId)) {
        var newserverData = store.get("maiwang" + serverData.openId);
        for (i in newserverData) {
            serverData[i] = newserverData[i];
        }
    }
    for (i in data) {
        serverData[i] = data[i];
    }
    dataOK = true;
    var serverDate = serverData.serverDate;
    var arr = serverDate.split(" ");
    var serverTime;
    serverTime = countTime(arr[0], arr[1]);
    var nowd = new Date();
    var now = nowd.getTime()
    serverData.correctTime = serverTime - now;

    init();
}


//显示错误页面
function showErrorPage() {
    currentPage = 0;
    showPage(0);
    $('.fullpage').css({
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px'
    })
    $('#page1').addClass('error');
    $('.refresh').html('活动太火爆，抢麦的人太多<br/>请点击刷新页面').bind('touchend', function() {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect '
    })
}




//获取参数
function getUrlMsg(a_sParamName) {
    var reg = new RegExp("(^|\\?|&)" + a_sParamName + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
    return "";
}

// 设置状态
function setStae() {
    var currentTime = new Date().getTime() + serverData.correctTime;
    var lastTime;
    var eptimeStart;
    if (!isStart) {
        for (i = 0; i < question.length; i++) {
            var timeArry = question[i].eptimeEnd.split(" ")
            var data1Time = countTime(timeArry[0], timeArry[1]);
            if (currentTime < data1Time) {
                episode = i;
                countLvtest();
                break;
            }
        }
        if (episode === false) {
            //活动结束
            titleIndex = 0;
            pageStage = 0;
            episode = 0;
            isEnd = true;
            return
        }
        var eptimeStart = question[episode].eptimeStart.split(" ");
        var data3Time = relativeTime(eptimeStart[0], eptimeStart[1], question[episode].questionList[0].timeStart)
            //计算是否已经开始活动

        if (currentTime >= data3Time) {
            isStart = true;
        } else {
            pageStage = 0;
            var eptime = countTime(eptimeStart[0], eptimeStart[1])
            if (currentTime >= eptime) {
                lastTime = Math.floor((data3Time - currentTime) / 1000);
                isready = true;
                countLvtest();
                $('#page1_top .bottom').addClass("show");
                $(".countDown").addClass("hide");
            } else {
                lastTime = Math.floor((eptime - currentTime) / 1000);
            }

        }
    }
    eptimeStart = question[episode].eptimeStart.split(" ");
    if (isStart) {
        for (i = 0; i < question[episode].questionList.length; i++) {
            if (i == question[episode].questionList.length - 1) {
                titleIndex = i;
                break;
            } else {
                data1Time = relativeTime(eptimeStart[0], eptimeStart[1], question[episode].questionList[i + 1].timeStart);
                if (currentTime < data1Time) {
                    titleIndex = i;
                    break;
                }
            }
        }
        pageStage = question[episode].questionList[titleIndex].type;

        data2Time = relativeTime(eptimeStart[0], eptimeStart[1], question[episode].questionList[titleIndex].timeEnd);
        // new api from server
        var nTid = "title_" + episode + "_" + titleIndex;

        //判断是否在答题以内
        if (currentTime < data2Time) {
            if (currentTime < (data2Time - cutOff) && !showAnswer) { //答题状态
                titleStage = 0;
                if (serverData.answer[nTid] == undefined) {
                    lastTime = Math.floor((data2Time - cutOff - currentTime) / 1000);
                } else {
                    lastTime = 1;
                }
                showAnswer = true;
            } else { //截止状态
                titleStage = 1;
                lastTime = Math.floor((data2Time - currentTime) / 1000);

            }
        } else {

            if (titleIndex >= question[episode].questionList.length - 1) { //最后一题结束答题状态
                isStart = false;
                titleIndex = 0;
                pageStage = 0;
                titleStage = 0;
                if (serverData.isShowEnd) {
                    gameEnd();
                    serverData.isShowEnd = false;
                }
                if (episode == question.length - 1) {
                    $("#page1 .countDown>div").html("活动已经结束！请下期继续收看节目")
                    countLvtest();
                }

                if (episode + 1 >= question.length) {
                    lastTime = 360 * 24 * 6
                } else {
                    var lastEptimeStart = question[episode + 1].eptimeStart.split(" ");
                    lastTime = Math.floor((relativeTime(lastEptimeStart[0], lastEptimeStart[1], question[episode + 1].questionList[0].timeStart) - currentTime) / 1000);
                }

            } else { //结束答题状态

                var data3Time = relativeTime(eptimeStart[0], eptimeStart[1], question[episode].questionList[(i + 1)].timeStart);
                if (currentTime >= data2Time && currentTime < data3Time) {
                    lastTime = Math.floor((data3Time - currentTime) / 1000);
                    titleStage = 2;
                    showAnswer = false;
                    countLvtest();
                }
            }
        }
    }


    setDurationArry(lastTime);
}

window.alert = function(str, c) {
    if (c) $(".alert").addClass(c);
    $(".alert").html(str).addClass("show").addClass(c);
    setTimeout(function() {
        if (c) $(".alert").removeClass(c);
        $(".alert").removeClass("show");
    }, 3000)
}

//分享文字计算
function countLvtest() {
    var rightTotle = 0;

    var curepisode = (isStart || isready) ? episode : (episode - 1);
    var questionTotle = question[curepisode].questionList.length;
    var lvText = ["歌霸", "歌王", "歌神"];
    // new api from server
    for (i in serverData.answer) {
        var arr = i.split("_");
        if (arr[1] == curepisode && serverData.answer[i] == 1) rightTotle++;
    }


    var lv = rightTotle / questionTotle;
    var p = Math.floor(rightTotle / (titleIndex + 1) * 100)
    if (p > 100) p = 100;
    p += "%";
    var newLv;
    if (lv >= (1 / 3) && lv < (1 / 2)) {
        newLv = 1;
    } else if (lv >= (1 / 2) && lv < (2 / 3)) {
        newLv = 2;
    } else if (lv >= (2 / 3)) {
        newLv = 3;
    } else {
        newLv = 0
    }
    if (newLv > 0) {
        WechatShareTitle = "我答对" + rightTotle + "道题,击败了" + p + "的观众。我是" + lvText[newLv - 1] + ",大奖非我莫属。";
    } else {
        WechatShareTitle = "我正在玩麦王争霸直播竞猜，快来加入，赢大奖。";
    }

}

//构造确定组件
var Confirm = function() {
    this.wrap = $('.confirmWrap');
    this.p = this.wrap.find('p')
    this.ok = $('.confirmWrap button').eq(1);
    this.cancel = $('.confirmWrap button').eq(0);
    this.addbind();
}
Confirm.prototype.show = function(confirmText, _callback) {
    this.wrap.addClass("show");
    this.p.html(confirmText);
    this._callback = _callback;
    console.log(this._callback);
}
Confirm.prototype.close = function(confirmText, _callback) {
    var that = this;
    that.wrap.removeClass("show");
}
Confirm.prototype.addbind = function() {
    var that = this
    that.ok.bind('touchend', function(e) {
        that._callback();
        that.close();
        e.stopPropagation();
    });
    that.cancel.bind('touchend', function(e) {
        that.close();
    });
}



//找序号
function findIndex(arry) {
    if (arry.constructor.name == 'Array') {
        var newArry = [];
        console.log("findIndex")
        for (_i in arry) {
            for (_j in singerInfo) {
                if (arry[_i] == singerInfo[_j].id) {
                    newArry.push(_j);
                    break;
                }
            }
        }
    } else {
        for (_j in singerInfo) {
            if (arry == singerInfo[_j].id) {
                var newArry = _j;
                break;
            }
        }
    }
    console.log('找序号,newArry is:', newArry)
    return newArry;
}


//相对时间
function relativeTime(date, startTime, rTime) {
    var startTimeArry = startTime.split(":");
    var rTimeArry = rTime.split(":");
    var _len = startTimeArry.length - 1;
    var timeStr = "";

    for (j in startTimeArry) {
        startTimeArry[_len - j] = parseFloat(startTimeArry[_len - j]);
        startTimeArry[_len - j] += parseFloat(rTimeArry[_len - j]);
        //大于60进一位
        if (startTimeArry[_len - j] >= 60) {
            startTimeArry[_len - j] -= 60;
            startTimeArry[_len - (parseFloat(j) + parseFloat(1))]++;
        }
        //处理时间字符
        if (j == 0) {
            timeStr = startTimeArry[_len - j] + timeStr;
        } else {
            timeStr = startTimeArry[_len - j] + ":" + timeStr;
        }
    }
    var newTime = countTime(date, timeStr);
    return newTime
}



//计算绝对时间 日期和时间 countTime("2014-8-20","8:9:20")
function countTime(date, time) {
    var dateArry = date.split("-")
    var timeArry = time.split(":")
    dateArry[1]--;
    if (timeArry[0] >= 24) {
        timeArry[0] -= 24;
        dateArry[2]++;
    }
    var newDate = new Date();
    newDate.setFullYear(dateArry[0], dateArry[1], dateArry[2]);
    newDate.setHours(timeArry[0], timeArry[1], timeArry[2]);
    return newDate.getTime();
}


// 改变状态
function changeStae() {
    setStae();
    changeTitleStea(titleStage);
    if (titleStage == 0 || currentPage == false) showPage(pageStage);
}

// 改变答题状态

function changeTitleStea() {
    // if(titleStage==0){$("#page"+(pageStage+1) +" .answer>li").removeClass("current")};

    currentIsRight = false;
    var title = question[episode].questionList[titleIndex].title;
    var answer = question[episode].questionList[titleIndex].answer;
    var type = question[episode].questionList[titleIndex].type;
    var singerId = question[episode].questionList[titleIndex].singerId;
    singerId = findIndex(singerId);
    singerName = getSingerName(singerId);
    var nTid = "title_" + episode + "_" + titleIndex;



    if (serverData.answer[nTid] != undefined) {
        currentIsRight = serverData.answer[nTid];
        var answerIndex = question[episode].questionList[titleIndex].right;

    }

    switch (titleStage) {
        case 0:
            $("#page" + (pageStage + 1) + " .answer li").removeClass("current").removeClass("out");
            $("#page" + (pageStage + 1) + " .bottom").removeClass("stage1").addClass("stage0");
            $("#page" + (pageStage + 1) + " .bottom .button").removeClass("show");
            $("#page" + (pageStage + 1) + ">.time").removeClass("hide");
            $("#nav").removeClass('show');
            issetanswer = false;

            break
        case 1:
            if (3 == type) {
                $("#page" + (pageStage + 1) + " .text").html("你已猜”" + singerName + "“被淘汰<br>猜中将获得一次抽奖机会");
            } else {
                $("#page" + (pageStage + 1) + " .text").html("答题截止，马上揭晓答案!<br />快邀请您的小伙伴一起参与吧！");
                myConfirm.close();

            }
            $("#page" + (pageStage + 1) + ">.time").addClass("hide");
            $("#page" + (pageStage + 1) + " .bottom").removeClass("stage0").addClass("stage1");
            break
        case 2:
            $("#nav").addClass('show');
            var $bottom = $("#page" + (pageStage + 1) + " .bottom")
            if ($bottom.hasClass("stage1")) {
                $bottom.removeClass("stage1");
                setTimeout(function() {
                    $bottom.addClass("stage1");
                }, 300)
            } else {
                $bottom.removeClass("stage0").addClass("stage1");
            }
            $("#page" + (pageStage + 1) + ">.time").addClass("hide");
            if (currentIsRight) {

                $("#page" + (pageStage + 1) + " .text").html("恭喜你答对了，准备进入下一题!");
                $("#page" + (pageStage + 1) + " .bottom .button").addClass("show");
            } else if (currentIsRight === 0) {
                $("#page" + (pageStage + 1) + " .text").html("很遗憾答错了，准备进入下一题!");
            } else {
                $("#page" + (pageStage + 1) + " .text").html("很遗憾你错过答题时间了，<br />准备进入下一题!");
            }
            break;
    }


    if (!issetanswer) {
        console.log("设置问题，type is:", type)
        if (type == 1) { //当时type为1 猜词
            $("#page2 .question").html(title);
            $("#page2 .singerImg").attr("src", singerUrl(singerId));
            $("#page2 .singerName").html(singerInfo[singerId].name).attr("data-id", singerId);
            $("#page2 .answer>li").each(function(index) {
                // new api from server
                // $(this).html(answer[index].name);
                $(this).html(answer[index]);
                if (answerIndex == index) {
                    if (currentIsRight == 1) {
                        $(this).addClass("current").siblings().addClass("out");
                    } else if (currentIsRight == 0) {
                        $(this).addClass("out").siblings().addClass("current");
                    }
                }
            })

        } else if (type == 2) { //当时type为2 猜PK

            var answer = question[episode].questionList[titleIndex].answer;
            // new api from server
            // var answerNameArr = [];
            // for (var i = 0,j=answer.length; i <j; i++) {
            //   answerNameArr[i] = answer[i].name;
            // };
            // answer=findIndex(answerNameArr);
            answer = findIndex(answer);
            $("#page3 .singerName").each(function(index) {
                // new api from server
                // $(this).html( singerInfo[answer[index]].name)
                $(this).html(singerInfo[answer[index]])
            })
            $("#page3 .question").html("当前PK，谁能胜出");

            $("#page3 .singerImg").each(function(index) {
                // new api from server
                // $(this).attr("src", singerUrl(answer[index]).name)
                $(this).attr("src", singerUrl(answer[index]))
            })
            $("#page3 .answer>li").each(function(index) {
                // new api from server
                // $(this).css("background-image", "url(" + singerUrl(answer[index].name) + ")")
                $(this).css("background-image", "url(" + singerUrl(answer[index]) + ")")
            })
            console.log(currentIsRight)
            $("#page3 .answer>li").each(function(index) {
                if (answerIndex == index) {
                    if (currentIsRight == 1) {
                        $(this).addClass("current").siblings().addClass("out");
                    } else if (currentIsRight == 0) {
                        $(this).addClass("out").siblings().addClass("current");
                    }
                }
            })
        } else if (type == 3) { //当时type为3 8选1

            var answer = question[episode].questionList[titleIndex].answer;
            // new api from server
            // var answerNameArr = [];
            // for (var i = 0,j=answer.length; i <j; i++) {
            //   answerNameArr[i] = answer[i].name;
            // };
            // answer=findIndex(answerNameArr);
            answer = findIndex(answer);
            $("#page4 .question").html("你认为今天谁会被淘汰？");
            // $("#page4 .question").html(title);

            $("#page4 .answer li").each(function(index) {
                // new api from server
                // $(this).html(getSingerName(answer[index].name)).css("background-image", "url(" + singerUrl(answer[index].name) + ")")
                $(this).html(getSingerName(answer[index])).css("background-image", "url(" + singerUrl(answer[index]) + ")")
                // $(this).css("background-image","url("+singerIconUrl(answer[index])+")" )
            })
            console.log(currentIsRight)
            $("#page4 .answer li").each(function(index) {
                if (answerIndex == index) {
                    // if(currentIsRight==1){
                    //      $(this).addClass("current").siblings().addClass("out");
                    // }else if(currentIsRight==0){
                    //      $(this).addClass("out").siblings().addClass("current");
                    // }
                }
            })
        }
        issetanswer = true;
    }



    if (pageStage == 2 && currentIsRight !== false) {
        $("#page3 .question").html("你已做出选择，猜中后可获得一次抽奖机会")
    }

}

//获取歌手icon图片地址
function singerIconUrl(id) {
    var imageUrl = singerInfo[id].iconUrl;
    return imageUrl;
}

//获取歌手图片地址
function singerUrl(id) {
    var imageUrl = singerInfo[id].url;
    return imageUrl;
}
//获取歌手图片地址
function getSingerName(id) {
    return singerInfo[id].name;
}



// 处理刮奖次数
function handleLuckyTimes(action) {
    switch (action) {
        case 1: //增加总数
            serverData.luckyTotal++
            break;
        case 2: //增加已用次数
            if (serverData.luckyUse < serverData.luckyTotal) serverData.luckyUse++;
            break;
        default: //0只是进入页面 设置数
    }
    $(".gglCount").html(serverData.luckyTotal);
    $(".gglUse").html(serverData.luckyTotal - serverData.luckyUse);
    $(".gglFinish").html(serverData.luckyUse)
}

//计算抽奖
function countlottery() {

    serverData.lottery = 2;
    serverData.lotteryId = currentLotteryId;
    serverData.ids = currentLotteryId;
    serverData.luckyUse++;
    saveData(["lottery", "luckyUse", "lotteryId", "ids"], function(data) {
        if (data.lotteryResult == 1) {
            for (i in data.awards) {
                serverData.awards = data.awards;
                if (serverData.lotteryId == data.awards[i].lotteryId) $('#redPacketText').html(data.awards[i].name);
            }
            setTimeout(function() {
                handleLuckyTimes(0);
                $('#redPacket').removeClass('shake').addClass('open');
                setTimeout(function() {
                    showBox(1);
                }, 1000)
            }, 500);
        } else {
            $('#redPacketText').html("谢谢参与")
            setTimeout(function() {
                handleLuckyTimes(0);
                $('#redPacket').removeClass('shake').addClass('open');
                $('#lucky .continueBtn').removeClass('disabled');
            }, 500);
        }
        serverData.lottery = 0;
    })
}



//点击答案后 计算答案 设置答案
function setAnswer(i) {

    var answerIndex = question[episode].questionList[titleIndex].right;
    if (answerIndex == i) {
        currentIsRight = 1;
    } else {
        currentIsRight = 0;
    }
    if (currentPage == 2) {
        var name = singerInfo[findIndex(question[episode].questionList[titleIndex].answer[i])].name
            // $("#page3 .question").html("你已猜“"+ name +"”胜出，猜中将获一次刮奖机会。")
        $("#page3 .question").html("你已做出选择，猜中后可获得一次抽奖机会");
    }

    var titleID = "title_" + episode + "_" + titleIndex;
    serverData.answer[titleID] = currentIsRight;

    if (currentIsRight === 1) {
        handleLuckyTimes(1)
    }
    // if(3==currentPage){
    //  serverData.answer[titleID]=i;
    // }
    issetanswer = true;
    serverData.isShowEnd = true;
    saveData(["answer", "luckyTotal", "luckyUse"]);
    // saveData(["answer","luckyTotal","luckyUse","answerIndex"]);
    changeStae();
}



//把秒算成秒分时日
function setDurationArry(seconds) {

    if (seconds < 0) erreHandle();
    seconds++;
    durationArry = [Math.floor(seconds / (24 * 60 * 60)), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % (60)]
}

//倒计时处理
function counDownHandle() {

    durationArry[3]--;
    if (durationArry[3] <= 0 && durationArry[2] <= 0 && durationArry[1] <= 0 && durationArry[0] <= 0) {
        changeStae();
    }
    if (durationArry[3] < 0) {
        durationArry[3] = 59;
        durationArry[2]--;
        if (durationArry[2] < 0) {
            durationArry[2] = 59;
            durationArry[1]--
            if (durationArry[1] < 0) {
                durationArry[1] = 23
                durationArry[0]--
            }
        }

    }
    if (currentPage == 0) {

        if (isready) {
            $("#page1 .time").html(twoNum(durationArry[2]) + ":" + twoNum(durationArry[3]));
        } else {

            $("#page1 .countDown span").each(function(i) {
                $(this).html(twoNum(durationArry[i]));
            })
        }
    }

    if (currentPage == 1 || currentPage == 2 || currentPage == 3) {
        $(".time").html(twoNum(durationArry[2]) + ":" + twoNum(durationArry[3]));
    }


    if (durationArry[3] % 10 == 5 && currentPage != 0) {
        getTotal(
            function(data) {
                serverData.total = data.total;
                peopleCreate();
            }
        );
    }

}



//判断是否小于10并返回两位数

function twoNum(num) {
    if (num < 10) num = "0" + num;
    return num
}


// // 倒计时

function counDown(callback) {
    var startTime = new Date().getTime();
    var count = 0;
    fixed = function() {
        count++;
        // if(count%2==0){
        //
        //     peopleAdd()
        //  }
        var offset = new Date().getTime() - (startTime + count * 1000);
        var nextTime = 1000 - offset;
        if (nextTime < 0) nextTime = 0;
        callback()
        var t = setTimeout(fixed, nextTime);
    }
    if (isEnd) return;
    counDownTimeout = setTimeout(fixed, 1000);
}





// 加载图片
function loadImage(src, callback) {
    var img = new Image();
    console.log(111);
    img.src = src;
    console.log(222);
    if (img.complete) {
        console.log(333);
        callback();

    } else {
        img.onload = function() {
            console.log(333);
            callback();
        }
        img.onerror = function() {
            arguments.callee(src, callback);
        }
    }
}

function erreHandle() {
    window.history.go(0);
}



//加载图片组
function loadImageList(imagesList, callback) {
    var i = 0;
    eachList()

    function eachList() {

        if (i === imagesList.length) {
            if (callback) callback()
        } else {
            console.log(imagesList[i])
            loadImage(imagesList[i++], eachList);
        }
    }
}



// 显示主页面 0：预热 1：歌词竞猜 2：PK竞猜
function showPage(i) {
    var $page = $('.page');
    var $curPage = $('.page.show');
    var $nav = $('#nav');
    var $sum = $(".sum");

    if (i == 0 && !singerScroll) {
        setTimeout(function() {
            var singerList = ['21', '22', '23', '24', '25', '26', '27', '28']
            singerList = findIndex(singerList);
            var singerhtml = ""
            for (i in singerList) {
                var j = singerList[i]
                singerhtml += '<li class="fullpage" style="width:' + window.innerWidth + 'px;height:' + window.innerHeight +
                    'px"><div class="top"><img class="singerImg centerHor" style="z-index:0;" src="' + singerInfo[j].url + '"  /><div class="singerName" data-id="' + j + '">' + singerInfo[j].name + '</div></div>' +
                    '<div class="bottom"><div class="singerIntro">' + singerInfo[j].intro + '</div></div></li>'
            }
            $("#singersInfo").html(singerhtml);
            singerScroll = new iScroll("page1", {
                snap: true,
                momentum: false,
                hScrollbar: false,
                vScrollbar: false,
                onScrollEnd: singerScrollEnd
            });
        }, 1000)
    }
    if (i == 0 && singerScroll) {
        console.log('refresh')
        singerScroll.scrollTo(0, 0, 0);
    }

    if (i == 0) {
        $nav.addClass('show');
        $sum.removeClass('show');
        setTimeout(function() {
            handleLuckyTimes(0)
        }, 500)
    } else {
        $sum.addClass('show');
    }


    if (currentPage === false) {
        $page.eq(i).addClass('show').removeClass('out');
    } else {
        $curPage.removeClass('show').addClass('out');
        setTimeout(function() {
            $page.eq(i).addClass('show').removeClass('out');
            $curPage.removeClass('out');
        }, 500)
    }

    currentPage = i;
}

//歌手简介滚动效果
function singerScrollEnd() {
    $("#singersInfo>li").eq(singerScroll.currPageY - 1).addClass("show").siblings().removeClass("show");
    $("#scrollFocus>li").eq(singerScroll.currPageY).addClass("show").siblings().removeClass("show");
}

//创建总人数
function peopleCreate() {
    var peopleTotal = serverData.total.toString();
    var _this = this;
    var numArry = peopleTotal.split("");
    $sumNum = $(".sumpPeople");
    $sumNum.html("");
    $sumNum.width(numArry.length * 15);
    for (i in numArry) {
        $sumNum.prepend('<div><div class="out">&nbsp;</div><div class="show">' + numArry[i] + '</div></div>')
    };
}

//竞猜记录查看
function selectResult() {
    var c = ["一", "二", "三", "四", "五", "六"];
    var row = ["wrong", "right"]
    var curE;
    var right = [];
    var phase = [];
    var dl = [];
    var lvdiv = [];
    var lvText = ["歌霸", "歌王", "歌神"]
    var $recordScroller = $("#recordScroller")
    var has = false;
    var listbigList = [];
    $recordScroller.html("");

    var awardsL = serverData.awards.length;
    // if(serverData.lottery==2) awardsL--;



    for (i in serverData.answer) {
        has = true;
        var titleArry = i.split("_");
        if (titleArry[1] != curE && titleArry[1] != undefined) {
            curE = titleArry[1];
            // console.log(curE);
            phase[curE] = $('<div class="phase"><div class="title">第' + c[titleArry[1]] + '期</div></div>')

            dl[curE] = $('<dl></dl>')
            lvdiv[curE] = $('<div class="lv"></div>')
            phase[curE].prependTo($recordScroller);
            lvdiv[curE].appendTo(phase[curE]);
            dl[curE].appendTo(phase[curE]);
            listbigList.push[""];
        }
    }
    if (!has) {
        $('<div class="phase"><div class="title">第' + c[episode] + '期</div><p style=" text-align: center;">还没有记录请留意活动时间</p></div></div>').appendTo($recordScroller);
    }

    for (i in serverData.answer) {
        var titleArry = i.split("_");

        var titleName;
        if (titleArry[2] == undefined || titleArry[1] == undefined) continue;

        if (question[titleArry[1]].questionList[titleArry[2]].type == 1) {
            titleName = question[titleArry[1]].questionList[titleArry[2]].answer[question[titleArry[1]].questionList[titleArry[2]].right]
            if (titleName.length >= 12) titleName = titleName.slice(0, 14) + "...";

        } else {
            titleName = question[titleArry[1]].questionList[titleArry[2]].title
        }
        if (titleArry[2] >= 10) {
            if (listbigList[titleArry[1]]) {

                listbigList[titleArry[1]] += '<dd class="' + row[serverData.answer[i]] + '"> ' + titleName + '</dd>'
            } else {

                listbigList[titleArry[1]] = '<dd class="' + row[serverData.answer[i]] + '"> ' + titleName + '</dd>'
            }

        } else {
            $('<dd class="' + row[serverData.answer[i]] + '"> ' + titleName + '</dd>').appendTo(dl[titleArry[1]]);
        }

        if (serverData.answer[i]) {
            console.log(titleArry[1])
            if (!right[titleArry[1]]) {
                right[titleArry[1]] = 1
            } else {
                right[titleArry[1]]++
            }

        }
    }

    for (i in listbigList) {
        if (listbigList[i]) $(listbigList[i]).appendTo(dl[i]);
    }

    for (i in right) {
        var lv = right[i] / question[i].questionList.length;
        var newLv;
        if (lv >= (1 / 3) && lv < (1 / 2)) {
            newLv = 1;
        } else if (lv >= (1 / 2) && lv < (2 / 3)) {
            newLv = 2;
        } else if (lv >= (2 / 3)) {
            newLv = 3;
        } else {
            newLv = 0
        }
        if (newLv > 0) {
            $('<div class="lvImg lv' + newLv + '"></div><p>恭喜你猜中' + right[i] + "题，获得" + lvText[newLv - 1] + '称号</p> ').appendTo(lvdiv[i]);
        }

    }
    //查看信息

    console.log(serverData.nickname);
    for (i = 0; i < awardsL; i++) {
        if (serverData.awards[i].name) {
            if (serverData.nickname) {
                $('<div class="prize edit button">' + serverData.awards[i].name + '</div>').prependTo($recordScroller);
            } else {
                $('<div class="prize button">' + serverData.awards[i].name + '</div>').prependTo($recordScroller);
            }

        }
    }
    $(".prize").bind("touchend", function() {
        showBox(1)
    })
}



function gameEnd() { //活动结束
    var lvText = ["歌霸", "歌王", "歌神"];
    var right = 0;
    for (i in serverData.answer) {
        var titleArry = i.split("_");
        console.log(titleArry);
        if (titleArry[1] == (episode) && serverData.answer[i] == 1) right++;
    }

    var lv = right / question[episode].questionList.length;

    if (lv >= (1 / 3) && lv < (1 / 2)) {
        newLv = 1;
    } else if (lv >= (1 / 2) && lv < (2 / 3)) {
        newLv = 2;
    } else if (lv >= (2 / 3)) {
        newLv = 3;
    } else {
        newLv = 0
    }

    $('<div class="endText">猜对<strong>' + right + '</strong>题,获得<strong>' + right + '</strong>个刮刮乐，<br/>' +
        '击败全国<strong>' + Math.floor(right / question[episode].questionList.length * 100) + '%</strong>的观众，<br />分享出去让小伙伴们眼红吧！</div>').prependTo($("#gameEnd"));

    if (newLv > 0) {
        $('<div class="lvImg lv' + newLv + '"></div><p style="font-size:18px; color:#ffdb60;">恭喜' + lvText[newLv - 1] + '</p> ').prependTo($("#gameEnd"));
    } else {
        $('<div style="height:50px;"> </div> ').prependTo($("#gameEnd"));
    }
    showBox(5)

    $('.gjBtn').bind("touchend", function() {
        showBox(0)
    })
    $('.shareBtn').bind("touchend", function() {
        alert("点击右上角分享朋友圈！")
    })


}



// 显示弹框 0:刮刮乐 1：竞猜记录 2：游戏规则 3：结束提示
function showBox(i) {
    var $cover = $('#cover');
    var $box = $('.box');
    var $curBox = $('.box.show');

    //进入抽奖页面




    if (i == 0) {
        handleLuckyTimes(0);
        reStartLucky();
    }
    //查看信息页面
    if (i == 1 || $('#userInfo .name').val() == "") {
        $('#userInfo .name').val(serverData.nickname);
        $('#userInfo .phone').val(serverData.mobile);
        if (checkInfo(serverData.nickname, serverData.mobile, false)) {
            $('.submit').removeClass("disabled");
        } else {
            $('.submit').addClass("disabled");
        }
    }


    if (i == 2) {
        selectResult()
        if (!myscroll) {
            setTimeout(function() {
                myscroll = new iScroll("recordScroll", {
                    snap: false,
                    momentum: true,
                });
            }, 500)
        } else {
            myscroll.refresh();
        }
    }

    $cover.addClass('show');
    $box.eq(i).addClass('show');
    $curBox.removeClass('show');

}

//关闭窗口
function closeBox() {
    var $cover = $('#cover');
    var $curBox = $('.box.show');
    $cover.removeClass('show');
    $curBox.removeClass('show');
}

//更新抽奖
function reStartLucky() {
    $("#redPacket").removeClass('open');
    $('#lucky .continueBtn').addClass('disabled');
    $('#lucky .recordUserInfo').addClass('disabled');
}

//检查填写信息
function checkInfo(userName, mobile, show) {
    var err = "";
    if (!$.trim(userName)) {
        err += "请输入名字!";
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}|(17[0-9]{1})))+\d{8})$/;
    if (mobile.length != 11 || !myreg.test(mobile)) {
        err += "请输入有效号码!";
    }
    userName = $.trim(userName);

    if (err) {
        return false
    } else {
        return true
    }

}





$('.recordUserInfo').bind('touchend', function() {
    showBox(1);
})

// 阻止滑动
$('body').bind('touchmove', function(e) {
    e.preventDefault();
    e.stopPropagation();
})

//页面切换
$("#pageBtn").bind('touchend', function() {
    currentPage++
    if (currentPage == 3) currentPage = 0;
    showPage(currentPage);

})

//红包抽奖
$('#redPacket').bind('touchend', function() {

    if (!$(this).hasClass('open') && serverData.luckyTotal > serverData.luckyUse) {
        $(this).addClass("shake");
        countlottery();
    } else {
        alert("您的抽奖次数用完了>_<");
    }

})


$(".titleStage .button").bind('touchend', function() {
    showBox(0)
})

//首页按钮
// $('.backBtn').bind('touchend',function(){
//    showPage(0);
// })

//导航
$('#nav li').bind('touchend', function() {
    if ($(this).attr('data-b')) {

        showBox($(this).attr('data-b'));
    }

})

//答题
$('.answer li').bind('touchend', function() {
    console.log('.answer li touchend')
    var el = $(this);
    var index = $(this).index()
    el.addClass('current').siblings().addClass('out').removeClass('current');
    if (currentIsRight === false) {
        myConfirm.show("确定你的选择吗？", function() {

            console.log('user select index is:', index)
            setAnswer(index);
        })

    }
})

// 关闭窗口
$('#cover,.closeBtn,.laterBtn').bind('touchend', function() {
    closeBox();
})

// 继续刮奖
$(".continueBtn").bind('touchend', function() {
    if ($(this).hasClass('disabled')) return;
    if (serverData.luckyTotal - serverData.luckyUse > 0) {
        reStartLucky();
    } else {
        alert("您的抽奖次数用完了>_<");
    };
})



//检查信息
$('.submit').bind('touchend', function() {
    var userName = $('#userInfo .name').val();
    var mobile = $('#userInfo .phone').val();
    console.log(userName, mobile)
    if (checkInfo(userName, mobile, true)) {
        // 赋值
        serverData.nickname = $.trim(userName);
        serverData.mobile = mobile;
        saveData(["nickname", "mobile"], function(data) {
            if (data.errmsg) {
                alert(data.errmsg)
            } else {
                alert("提交成功");
                closeBox();
            }

        });
    }
})

$('#userInfo input').bind('keyup', function() {
    var userName = $('#userInfo .name').val();
    var mobile = $('#userInfo .phone').val();
    if (checkInfo(userName, mobile, false)) {
        $('.submit').removeClass("disabled");
    } else {
        $('.submit').addClass("disabled");
    }
})


$("#userInfo").bind("touchend", function(e) {
    if (e.target.tagName === "INPUT") {
        $(e.target).focus();
        e.preventDefault();
        e.stopPropagation();
    }
});

$('.button').bind('touchstart', function() {
    $(this).addClass('hover');
}).bind('touchend', function(e) {
    $(this).removeClass('hover');
    e.preventDefault();
    e.stopPropagation();
})


//跳去清除数据页面
$("#clearStore").bind("touchend", function() {
    window.location.href = "store.html?id=" + serverData.openId;
})


window.onresize = function() {
    $('.fullpage').css({
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px'
    })
}

//初始化页面
var myConfirm = new Confirm();

function init() {
    $('.fullpage').css({
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px'
    })
    changeStae();
    cd = new counDown(counDownHandle);
    peopleCreate();
    handleLuckyTimes(0);
    countLvtest();
}



//ajax处理数据------------------------------------------------


function readData(callback) {
    var get_data = {};
    var userId = getUrlMsg("id");
    if (store.get("maiwang_openid")) {
        userId = store.get("maiwang_openid");
    };
    serverData.openId = userId;
    get_data.id = userId;
    var ticket = shaketv.getUserTicket();
    get_data.ticket = ticket;
    get_data.ids = serverData.ids;

    if (userId || ticket) {
        // $("#loading").addClass("show");
        $.ajax({
            type: 'GET',
            url: 'http://wx.gz.1251113199.clb.myqcloud.com/api/lottery.jsp',
            //url:'javascripts/data.js',
            data: get_data,
            dataType: 'jsonp',
            timeout: 10000,
            context: $('#debug'),
            success: function(data) {
                if (data.errmsg) {
                    if (data.errmsg.match("blank")) {
                        store.set("maiwang_openid", "");
                        window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect"
                    } else {
                        window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect"
                    }
                } else {
                    console.log("get数据,data is:");
                    console.log(data);
                    setStoreId(data.openId);
                    if (callback) callback(data);
                    // $("#loading").removeClass("show");
                }

            },
            error: function(xhr, type) {
                window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect";
            }
        })
    } else {
        window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf8d169d4c6515dab&redirect_uri=http%3A%2F%2Fwx.gz.1251113199.clb.myqcloud.com%2Fapi%2Foauth.jsp&response_type=code&scope=snsapi_base&state=share#wechat_redirect";
    }


}


function getTotal(callback) {

    $.ajax({
        type: 'GET',
        url: 'http://wx.gz.1251113199.clb.myqcloud.com/api/lottery.jsp',
        data: "",
        dataType: 'jsonp',
        timeout: 10000,
        context: $('#debug'),
        success: function(data) {
            if (callback) callback(data);


        },
        error: function(xhr, type) {

        }
    })
}


function setStoreId(id) {
    if (!store.get("maiwang_openid")) {
        store.set("maiwang_openid", id);
    }
}


function saveData(arry, callback) {
    var data = {};
    data.openId = serverData.openId;
    for (i in arry) {
        if (arry[i] == "answer") {
            data[arry[i]] = JSON.stringify(serverData[arry[i]])
        } else {
            data[arry[i]] = serverData[arry[i]]
        };
    }
    console.log("post数据")
    console.log(data);
    // $("#loading").addClass("show");
    $.ajax({
        type: 'POST',
        url: 'http://wx.gz.1251113199.clb.myqcloud.com/api/lottery.jsp',
        dataType: 'json',
        data: data,
        success: function(data) {
            console.log("post成功")
            console.log(data);
            if (callback) callback(data)

        },
        error: function(xhr, type) {
            showErrorPage();
        }
    })
    store.set("maiwang" + serverData.openId, serverData);
}




//-------------------     微信的东西   -----------------------------------------



var WechatShareType = {
    /// <field name="appmessage" type="String">发送给好友</field>
    appmessage: "appmessage",
    /// <field name="timeline" type="String">分享到朋友圈</field>
    timeline: "timeline",
    /// <field name="weibo" type="String">分享到微博</field>
    weibo: "weibo",
    /// <field name="facebook" type="String">分享到facebook</field>
    facebook: "facebook"
}

var WechatShareSuccessCallBack = function(type) {
    if (type == "appmessage") {
        _czc.push(﻿["_trackEvent", "微信", "分享朋友"]);
    } else if (type == "timeline") {
        _czc.push(﻿["_trackEvent", "微信", "分享朋友圈"]);
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
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": WechatShareImgUrl,
            "img_width": "100",
            "img_height": "100",
            "link": WechatShareUrl,
            "desc": WechatShareContent,
            "title": WechatShareTitle
        }, function(res) {
            if (WechatShareSuccessCallBack != undefined) {
                WechatShareSuccessCallBack(WechatShareType.appmessage);
            }
        });
    });

    // 分享到朋友圈;
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": WechatShareImgUrl,
            "img_width": "100",
            "img_height": "100",
            "link": WechatShareUrl,
            "desc": WechatShareContent,
            "title": WechatShareTitle
        }, function(res) {
            if (WechatShareSuccessCallBack != undefined) {
                WechatShareSuccessCallBack(WechatShareType.timeline);
            }
        });
    });
}
