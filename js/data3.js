var currentEventId = 21;
var currentLotteryId = 54;
var question = [{
    "date": "2014-09-15",
    "episodeId": 31,
    "eptimeEnd": "2014-09-30 18:38:18",
    "eptimeStart": "2014-09-30 17:18:40",
    "questionList": [{
        "answer": [{
            "aid": 1,
            "name": "1. Apple Watch",
            "qid": 53,
            "seq": 0
        }, {
            "aid": 2,
            "name": "2. 你没在看它的时候",
            "qid": 53,
            "seq": 1
        }, {
            "aid": 3,
            "name": "3. 该手表的屏幕会保持黑暗状态。",
            "qid": 53,
            "seq": 2
        }, {
            "aid": 4,
            "name": "4. 你翻动你的手腕时",
            "qid": 53,
            "seq": 3
        }, {
            "aid": 5,
            "name": "5. 它的屏幕就会变亮，",
            "qid": 53,
            "seq": 4
        }, {
            "aid": 6,
            "name": "6. 只在你需要的时候显示信息。",
            "qid": 53,
            "seq": 5
        }, {
            "aid": 7,
            "name": "7. 有人对这种模式的可行性表示怀疑，",
            "qid": 53,
            "seq": 6
        }, {
            "aid": 8,
            "name": "8. 但相信只要能够节省电量。",
            "qid": 53,
            "seq": 7
        }],
        "qId": 53,
        "right": 1,
        "seq": 1,
        "singerId": 31,
        "timeEnd": "05:00:05",
        "timeStart": "00:00:00",
        "title": "最后一句歌词是什么？",
        "type": 2
    },{
        "answer": [{
            "aid": 1,
            "name": "1. a",
            "qid": 53,
            "seq": 0
        }, {
            "aid": 2,
            "name": "2. b",
            "qid": 53,
            "seq": 1
        }, {
            "aid": 3,
            "name": "3. c",
            "qid": 53,
            "seq": 2
        }, {
            "aid": 4,
            "name": "4. d",
            "qid": 53,
            "seq": 3
        }, {
            "aid": 5,
            "name": "5. 它的屏幕就会变亮，",
            "qid": 53,
            "seq": 4
        }, {
            "aid": 6,
            "name": "6. 只在你需要的时候显示信息。",
            "qid": 53,
            "seq": 5
        }, {
            "aid": 7,
            "name": "7. 有人对这种模式的可行性表示怀疑，",
            "qid": 53,
            "seq": 6
        }, {
            "aid": 8,
            "name": "8. 但相信只要能够节省电量。",
            "qid": 53,
            "seq": 7
        }],
        "qId": 54,
        "right": 2,
        "seq": 2,
        "singerId": 32,
        "timeEnd": "01:00:10",
        "timeStart": "01:00:06",
        "title": "喂喂",
        "type": 2
    },{
        "answer": [{
            "aid": 1,
            "name": "1. hello1",
            "qid": 53,
            "seq": 0
        }, {
            "aid": 2,
            "name": "2. hello2",
            "qid": 53,
            "seq": 1
        }, {
            "aid": 3,
            "name": "3. hello3",
            "qid": 53,
            "seq": 2
        }, {
            "aid": 4,
            "name": "4. hello4",
            "qid": 53,
            "seq": 3
        }, {
            "aid": 5,
            "name": "5. 它的屏幕就会变亮，",
            "qid": 53,
            "seq": 4
        }, {
            "aid": 6,
            "name": "6. 只在你需要的时候显示信息。",
            "qid": 53,
            "seq": 5
        }, {
            "aid": 7,
            "name": "7. 有人对这种模式的可行性表示怀疑，",
            "qid": 53,
            "seq": 6
        }, {
            "aid": 8,
            "name": "8. 但相信只要能够节省电量。",
            "qid": 53,
            "seq": 7
        }],
        "qId": 54,
        "right": 2,
        "seq": 2,
        "singerId": 32,
        "timeEnd": "01:00:15",
        "timeStart": "01:00:11",
        "title": "ha 什么啊？",
        "type": 3
    }]
}];
var singerInfo = [{
    "episodeId": 31,
    "id": 31,
    "intro": "Jay",
    "name": "周杰伦",
    "url": "http://www.hvbao.com/uploadfile/2011/0831/20110831045810925.jpg"
}, {
    "episodeId": 33,
    "id": 33,
    "intro": "2014年5月推出第一首个人粤语单曲《密室逃脱》，说唱部分请来广东著名演员康天庥扮演者李俊毅担任；个人音乐作品《123》打入原创酷狗音乐榜。",
    "name": "罗隽永",
    "url": "1"
}, {
    "episodeId": 31,
    "id": 32,
    "intro": "GEM",
    "name": "GEM鄧紫棋",
    "url": "http://img2.duitang.com/uploads/item/201212/28/20121228163612_cLzes.thumb.600_0.jpeg"
}, {
    "episodeId": 33,
    "id": 34,
    "intro": "自称是“女汉子”唱功扎实，能唱大气的歌曲，外形靓丽，眼神迷离，风格多变，舞台经验丰富。",
    "name": "王琪飞",
    "url": "2"
}, {
    "episodeId": 33,
    "id": 35,
    "intro": "香港乐队Fabel（寓言）女主音，另一成员名陈庆聪（Jimmy）；新城劲爆颁奖典礼2013“新城劲爆新登场组合”；已发布歌曲《盐花》《风吹草动》（粤，林夕填词）、《庸人自扰》（国）等。",
    "name": "FABEL",
    "url": "3"
}, {
    "episodeId": 33,
    "id": 36,
    "intro": "被誉为“百变神灯”舞台造型百变，擅长音乐剧，个性张扬，造型惊艳，风格多变，极具舞台表现力。",
    "name": "麦震烁",
    "url": "4"
}, {
    "episodeId": 33,
    "id": 37,
    "intro": "台风特别，动感十足，极强的感染力与表演欲；2011年《麦王争霸》冠军；2013音乐先锋榜年度最佳十大金曲（内地）《明日》。",
    "name": "冯博",
    "url": "5"
}, {
    "episodeId": 33,
    "id": 38,
    "intro": "成员为张震宇、郑家樑，开朗善谈，幽默，舞台上善于与观众交流，有活力，曲风可多元化，例如把二重唱融入摇滚。",
    "name": "Bombeiros",
    "url": "6"
}, {
    "episodeId": 33,
    "id": 39,
    "intro": "阳光帅气，唱跳型，舞蹈偏80年代的风格，凭借消声客的公益引起广大网友的关注，引导大众用耳机来跳广场舞。",
    "name": "何乾梁",
    "url": "7"
}, {
    "episodeId": 33,
    "id": 40,
    "intro": "形象多变、风格多样；声线独特、有爆发力；2012第2届《麦王争霸》优胜选手及最具网络人气奖。",
    "name": "劳晓音",
    "url": "8"
}];
