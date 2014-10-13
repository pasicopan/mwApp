var currentEventId = 21;
var currentLotteryId = 54;
var question = [{
    "date": "2014-08-30",
    "episodeId": 3,
    "eptimeEnd": "2014-08-31 00:14:15",
    "eptimeStart": "2014-08-30 21:44:15",
    "questionList": [{
        "answer": ["A.你这晚热辣辣 HE YA", "B.热辣辣热辣辣热辣辣 麻辣辣过火"],
        "qId": 3,
        "right": 0,
        "seq": 1,
        "singerId": 2,
        "timeEnd": "00:12:08",
        "timeStart": "00:09:30",
        "title": "1.请问冯博现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A.哪会怕有一天只你共我", "B.问谁又能做到"],
        "qId": 4,
        "right": 0,
        "seq": 2,
        "singerId": 3,
        "timeEnd": "00:26:04",
        "timeStart": "00:20:00",
        "title": "2.请问邓英婷现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A.而你那呵欠绝得不能绝，绝到溶掉我", "B.两鬓斑白 都可认得你"],
        "qId": 5,
        "right": 1,
        "seq": 3,
        "singerId": 4,
        "timeEnd": "00:33:16",
        "timeStart": "00:29:13",
        "title": "3.请问梁子媛现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A.即使你离得多远也不好抱怨", "B.但不要用偿还做借口，再让我伤心"],
        "qId": 6,
        "right": 0,
        "seq": 4,
        "singerId": 5,
        "timeEnd": "00:46:27",
        "timeStart": "00:42:35",
        "title": "4.请问Fabel现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A.燃烧我心?承担一切结果", "B.焚心以火?让爱烧我以火"],
        "qId": 7,
        "right": 0,
        "seq": 5,
        "singerId": 6,
        "timeEnd": "00:54:19",
        "timeStart": "00:51:11",
        "title": "5.请问可岚现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A.他?他?他燒滾我", "B.我再过两秒便溶火 柱车偏未到"],
        "qId": 8,
        "right": 1,
        "seq": 6,
        "singerId": 7,
        "timeEnd": "01:03:18",
        "timeStart": "01:00:09",
        "title": "6.请问劳晓音现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A.愿你一生的背影", "B.天天伴身边望星"],
        "qId": 9,
        "right": 1,
        "seq": 7,
        "singerId": 8,
        "timeEnd": "01:09:46",
        "timeStart": "01:06:38",
        "title": "7.请问罗隽永现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A.很想一生跟你走", "B.今生不可不能没有"],
        "qId": 10,
        "right": 1,
        "seq": 8,
        "singerId": 9,
        "timeEnd": "01:22:58",
        "timeStart": "01:18:27",
        "title": "8.请问邓俊宇现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["4", "6"],
        "qId": 11,
        "right": 1,
        "seq": 9,
        "singerId": 6,
        "timeEnd": "01:47:35",
        "timeStart": "01:49:29",
        "title": "梁子媛VS可岚",
        "type": 2
    }, {
        "answer": ["3", "6"],
        "qId": 12,
        "right": 0,
        "seq": 10,
        "singerId": 3,
        "timeEnd": "01:57:50",
        "timeStart": "01:52:59",
        "title": "邓英婷VS可岚",
        "type": 2
    }, {
        "answer": ["3", "9"],
        "qId": 13,
        "right": 0,
        "seq": 11,
        "singerId": 3,
        "timeEnd": "02:45:25",
        "timeStart": "01:59:08",
        "title": "邓英婷VS邓俊宇",
        "type": 2
    }, {
        "answer": ["3", "2"],
        "qId": 14,
        "right": 1,
        "seq": 12,
        "singerId": 2,
        "timeEnd": "02:28:08",
        "timeStart": "02:11:57",
        "title": "邓英婷VS冯博",
        "type": 2
    }]
}, {
    "date": "2014-09-06",
    "episodeId": 5,
    "eptimeEnd": "2014-09-07 00:07:20",
    "eptimeStart": "2014-09-06 21:44:15",
    "questionList": [{
        "answer": ["A 从此永无尽期", "B 忘记他"],
        "qId": 15,
        "right": 0,
        "seq": 1,
        "singerId": 10,
        "timeEnd": "00:10:00",
        "timeStart": "00:06:00",
        "title": "1.请问彭永琛现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 使我心里着迷", "B 轻轻地留住"],
        "qId": 16,
        "right": 1,
        "seq": 2,
        "singerId": 11,
        "timeEnd": "00:18:50",
        "timeStart": "00:15:31",
        "title": "2.请问晴昕现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 让日落暮色渗满泪眼", "B 唏嘘的感概一年年"],
        "qId": 17,
        "right": 0,
        "seq": 3,
        "singerId": 12,
        "timeEnd": "00:33:18",
        "timeStart": "00:30:15",
        "title": "3.请问BOMBEIROS现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 来制造这次兴奋", "B 这分钟抱紧"],
        "qId": 18,
        "right": 0,
        "seq": 4,
        "singerId": 13,
        "timeEnd": "00:43:09",
        "timeStart": "00:39:37",
        "title": "4.请问麦震烁现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 伴歌曲走入新的层次", "B 迷恋的心不可制止"],
        "qId": 19,
        "right": 0,
        "seq": 5,
        "singerId": 14,
        "timeEnd": "01:00:30",
        "timeStart": "00:56:15",
        "title": "5.请问张曼莉现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 谁愿到你要对我说分开", "B 才后悔我过去不太懂得把你热爱"],
        "qId": 20,
        "right": 1,
        "seq": 6,
        "singerId": 15,
        "timeEnd": "01:08:48",
        "timeStart": "01:04:58",
        "title": "6.请问刘俊威现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 我体温已失踪", "B 用太阳"],
        "qId": 21,
        "right": 1,
        "seq": 7,
        "singerId": 16,
        "timeEnd": "01:23:50",
        "timeStart": "01:19:56",
        "title": "7.请问何乾梁现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 如今再没有力气共你在这夜玩火", "B 我伤心得消失中的一切"],
        "qId": 22,
        "right": 0,
        "seq": 8,
        "singerId": 17,
        "timeEnd": "01:33:43",
        "timeStart": "01:30:15",
        "title": "8.请问王琪飞现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["14", "11"],
        "qId": 23,
        "right": 0,
        "seq": 9,
        "singerId": 14,
        "timeEnd": "01:54:30",
        "timeStart": "01:49:26",
        "title": "张曼莉VS晴昕",
        "type": 2
    }, {
        "answer": ["14", "10"],
        "qId": 24,
        "right": 1,
        "seq": 10,
        "singerId": 10,
        "timeEnd": "01:57:32",
        "timeStart": "01:55:24",
        "title": "张曼莉VS彭永琛",
        "type": 2
    }, {
        "answer": ["10", "12"],
        "qId": 25,
        "right": 1,
        "seq": 11,
        "singerId": 12,
        "timeEnd": "02:09:50",
        "timeStart": "02:02:40",
        "title": "彭永琛VS BOMBEIROS",
        "type": 2
    }, {
        "answer": ["12", "15"],
        "qId": 26,
        "right": 0,
        "seq": 12,
        "singerId": 12,
        "timeEnd": "02:20:22",
        "timeStart": "02:10:50",
        "title": "BOMBEIROS VS 刘俊威",
        "type": 2
    }]
}, {
    "date": "2014-09-13",
    "episodeId": 21,
    "eptimeEnd": "2014-09-14 00:16:20",
    "eptimeStart": "2014-09-13 21:42:15",
    "questionList": [{
        "answer": ["A 凑巧过路 提着皮箱", "B 跟他对墙 跟他对唱"],
        "qId": 31,
        "right": 1,
        "seq": 1,
        "singerId": 21,
        "timeEnd": "00:09:55",
        "timeStart": "00:05:42",
        "title": "1.请问罗隽永现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 怎相信人命中怎么爱着你为人", "B 难道爱爱爱对爱情已死心"],
        "qId": 32,
        "right": 0,
        "seq": 2,
        "singerId": 22,
        "timeEnd": "00:19:11",
        "timeStart": "00:14:59",
        "title": "2.请问王琪飞现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 深爱过谁", "B 一天可抵上一岁"],
        "qId": 33,
        "right": 1,
        "seq": 3,
        "singerId": 23,
        "timeEnd": "00:35:47",
        "timeStart": "00:30:56",
        "title": "3.请问Fabel现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 无谓再抑压心底爱", "B 你午夜莫期待"],
        "qId": 34,
        "right": 1,
        "seq": 4,
        "singerId": 24,
        "timeEnd": "00:46:41",
        "timeStart": "00:43:11",
        "title": "4.请问麦震烁现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 唯求在某次尽情欢乐过", "B 时针偏偏 I make it wrong"],
        "qId": 35,
        "right": 1,
        "seq": 5,
        "singerId": 25,
        "timeEnd": "00:58:16",
        "timeStart": "00:55:05",
        "title": "5.请问冯博现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A We don't need you anymore", "B Go to hell"],
        "qId": 36,
        "right": 1,
        "seq": 6,
        "singerId": 26,
        "timeEnd": "01:08:06",
        "timeStart": "01:05:01",
        "title": "6.请问Bombeiros现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 孩儿在公司很忙 不需喝汤", "B 沉默令我听得见叶儿声声降"],
        "qId": 37,
        "right": 1,
        "seq": 7,
        "singerId": 27,
        "timeEnd": "01:21:21",
        "timeStart": "01:17:29",
        "title": "7.请问何乾梁现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["A 请你想　想起我", "B 求你在心中记住我"],
        "qId": 38,
        "right": 1,
        "seq": 8,
        "singerId": 28,
        "timeEnd": "01:31:40",
        "timeStart": "01:27:43",
        "title": "8.请问劳晓音现在演唱的歌曲，最后一句歌词是？",
        "type": 1
    }, {
        "answer": ["27", "21"],
        "qId": 39,
        "right": 1,
        "seq": 9,
        "singerId": 21,
        "timeEnd": "01:58:18",
        "timeStart": "01:50:34",
        "title": "何乾梁 VS 罗隽永",
        "type": 2
    }, {
        "answer": ["21", "26"],
        "qId": 40,
        "right": 1,
        "seq": 10,
        "singerId": 26,
        "timeEnd": "02:03:25",
        "timeStart": "01:59:19",
        "title": "罗隽永 VS BOMBEIROS",
        "type": 2
    }, {
        "answer": ["26", "23"],
        "qId": 41,
        "right": 0,
        "seq": 11,
        "singerId": 26,
        "timeEnd": "02:13:06",
        "timeStart": "02:08:21",
        "title": "BOMBEIROS VS FABEL",
        "type": 2
    }, {
        "answer": ["26", "24"],
        "qId": 42,
        "right": 1,
        "seq": 12,
        "singerId": 24,
        "timeEnd": "02:20:46",
        "timeStart": "02:14:10",
        "title": "BOMBEIROS VS 麦震烁",
        "type": 2
    }]
}, {
    "date": "2014-09-15",
    "episodeId": 22,
    "eptimeEnd": "2014-09-15 23:07:20",
    "eptimeStart": "2014-09-15 21:37:15",
    "questionList": [{
        // "answer": ["A 凑巧过路 提着皮箱", "B 跟他对墙 跟他对唱"],
        "answer": ["29", "9", "23", "6", "4", "3", "2", "7"],
        "qId": 31,
        "right": 1,
        "seq": 1,
        "singerId": 21,
        "timeEnd": "0:47:50",
        "timeStart": "0:0:15",
        "title": "你认为今天谁会被淘汰？",
        "type": 3
    },{
        // "answer": ["A 凑巧过路 提着皮箱", "B 跟他对墙 跟他对唱"],
        "answer": ["29", "9", "23", "6", "4", "3", "2", "8"],
        "qId": 32,
        "right": 1,
        "seq": 1,
        "singerId": 21,
        "timeEnd": "1:1:50",
        "timeStart": "1:1:00",
        "title": "你认为今天谁会被淘汰？",
        "type": 3
    },{
        // "answer": ["A 凑巧过路 提着皮箱", "B 跟他对墙 跟他对唱"],
        "answer": ["29", "9", "23", "6", "4", "3", "2", "9"],
        "qId": 33,
        "right": 1,
        "seq": 1,
        "singerId": 21,
        "timeEnd": "0:2:50",
        "timeStart": "0:2:00",
        "title": "你认为今天谁会被淘汰？",
        "type": 3
    }]
    // "questionList": [{
    //     "answer": ["A We don't need you anymore", "B Go to hell"],
    //     "qId": 43,
    //     "right": 0,
    //     "seq": 1,
    //     "singerId": 29,
    //     "timeEnd": "00:06:00",
    //     "timeStart": "00:05:00",
    //     "title": "测试1",
    //     "type": 1
    // }]
}];
var singerInfo = [{
    "episodeId": 1,
    "id": 1,
    "intro": "1234567890",
    "name": "陆仁贾",
    "url": "http://img.hb.aicdn.com/d676591255bd6d2f3062564005ae87ad2c094695d1dd8-icpz4W_fw658"
}, {
    "episodeId": 3,
    "id": 2,
    "intro": "台风特别，动感十足，极强的感染力与表演欲；2011年《麦王争霸》冠军；2013音乐先锋榜年度最佳十大金曲（内地）《明日》。",
    "name": "冯博",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/2.png"
}, {
    "episodeId": 5,
    "id": 10,
    "intro": "歌曲风格偏R&B，08年曾代表澳门登上央视春晚，与韦唯、陈奕迅、梁咏琪、毛宁等演唱奥运歌曲《同一个梦想》。",
    "name": "彭永琛",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/10.png"
}, {
    "episodeId": 21,
    "id": 21,
    "intro": "2014年5月推出第一首个人粤语单曲《密室逃脱》，说唱部分请来广东著名演员康天庥扮演者李俊毅担任；个人音乐作品《123》打入原创酷狗音乐榜。",
    "name": "罗隽永",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/8.png"
}, {
    "episodeId": 22,
    "id": 29,
    "intro": "2014年5月推出第一首个人粤语单曲《密室逃脱》，说唱部分请来广东著名演员康天庥扮演者李俊毅担任；个人音乐作品《123》打入原创酷狗音乐榜。",
    "name": "罗隽永",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/8.png"
}, {
    "episodeId": 3,
    "id": 3,
    "intro": "表演经验丰富，发挥稳定；2011年《麦王争霸》季军；曾被授予“亚运歌手”称号。",
    "name": "邓英婷",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/3.png"
}, {
    "episodeId": 5,
    "id": 11,
    "intro": "甜美活泼，出道2年，发布歌曲《女生外向》《My girl》《我没有》等，多次获得多个新人及金曲奖项。",
    "name": "晴昕",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/11.png"
}, {
    "episodeId": 21,
    "id": 22,
    "intro": "自称是“女汉子”唱功扎实，能唱大气的歌曲，外形靓丽，眼神迷离，风格多变，舞台经验丰富。",
    "name": "王琪飞",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/17.png"
}, {
    "episodeId": 3,
    "id": 4,
    "intro": "甜美型，可爱风趣有活力，有表演天分；2013第二季度广州新音乐十大金曲《BYEBYE》演唱者。",
    "name": "梁子媛",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/4.png"
}, {
    "episodeId": 5,
    "id": 12,
    "intro": "成员为张震宇、郑家樑，开朗善谈，幽默，舞台上善于与观众交流，有活力，曲风可多元化，例如把二重唱融入摇滚。",
    "name": "Bombeiros",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/12.png"
}, {
    "episodeId": 21,
    "id": 23,
    "intro": "香港乐队Fabel（寓言）女主音，另一成员名陈庆聪（Jimmy）；新城劲爆颁奖典礼2013“新城劲爆新登场组合”；已发布歌曲《盐花》《风吹草动》（粤，林夕填词）、《庸人自扰》（国）等。",
    "name": "FABEL",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/5.png"
}, {
    "episodeId": 3,
    "id": 5,
    "intro": "香港乐队Fabel（寓言）女主音，另一成员名陈庆聪（Jimmy）；新城劲爆颁奖典礼2013“新城劲爆新登场组合”；已发布歌曲《盐花》《风吹草动》（粤，林夕填词）、《庸人自扰》（国）等。",
    "name": "FABEL",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/5.png"
}, {
    "episodeId": 5,
    "id": 13,
    "intro": "被誉为“百变神灯”舞台造型百变，擅长音乐剧，个性张扬，造型惊艳，风格多变，极具舞台表现力。",
    "name": "麦震烁",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/13.png"
}, {
    "episodeId": 21,
    "id": 24,
    "intro": "被誉为“百变神灯”舞台造型百变，擅长音乐剧，个性张扬，造型惊艳，风格多变，极具舞台表现力。",
    "name": "麦震烁",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/13.png"
}, {
    "episodeId": 3,
    "id": 6,
    "intro": "嗜好唱歌跳舞、中国武术、书国画、烹饪；2008年推出唱片《女生不哭》；2009年十大劲歌金曲颁奖典礼：最佳改编歌曲铜奖《千娇百媚》。",
    "name": "可岚",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/6.png"
}, {
    "episodeId": 5,
    "id": 14,
    "intro": "目前广东地区唯一兼主持、歌唱、影视、魔术四栖发展的女艺人。曾获得多个奖项，一直以来她以充满智慧的知性美女形象和不断勤奋的努力得到广大观众的喜爱。",
    "name": "张曼莉",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/14.png"
}, {
    "episodeId": 21,
    "id": 25,
    "intro": "台风特别，动感十足，极强的感染力与表演欲；2011年《麦王争霸》冠军；2013音乐先锋榜年度最佳十大金曲（内地）《明日》。",
    "name": "冯博",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/2.png"
}, {
    "episodeId": 3,
    "id": 7,
    "intro": "形象多变、风格多样；声线独特、有爆发力；2012第2届《麦王争霸》优胜选手及最具网络人气奖。",
    "name": "劳晓音",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/7.png"
}, {
    "episodeId": 5,
    "id": 15,
    "intro": "台风稳健，擅长慢歌情歌，性格幽默，反应快，属实力派歌手、主持。比赛经验丰富，多年前就已经开始参加各种歌唱比赛。",
    "name": "刘俊威",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/15.png"
}, {
    "episodeId": 21,
    "id": 26,
    "intro": "成员为张震宇、郑家樑，开朗善谈，幽默，舞台上善于与观众交流，有活力，曲风可多元化，例如把二重唱融入摇滚。",
    "name": "Bombeiros",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/12.png"
}, {
    "episodeId": 3,
    "id": 8,
    "intro": "2014年5月推出第一首个人粤语单曲《密室逃脱》，说唱部分请来广东著名演员康天庥扮演者李俊毅担任；个人音乐作品《123》打入原创酷狗音乐榜。",
    "name": "罗隽永",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/8.png"
}, {
    "episodeId": 5,
    "id": 16,
    "intro": "阳光帅气，唱跳型，舞蹈偏80年代的风格，凭借消声客的公益引起广大网友的关注，引导大众用耳机来跳广场舞。",
    "name": "何乾梁",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/16.png"
}, {
    "episodeId": 21,
    "id": 27,
    "intro": "阳光帅气，唱跳型，舞蹈偏80年代的风格，凭借消声客的公益引起广大网友的关注，引导大众用耳机来跳广场舞。",
    "name": "何乾梁",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/16.png"
}, {
    "episodeId": 3,
    "id": 9,
    "intro": "高大俊朗，温文尔雅；适合唱慢歌，擅长情歌，模仿谭咏麟、李克勤；2013第三季广州新音乐播放率最高歌曲《只怪我》演唱者。",
    "name": "邓俊宇",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/9.png"
}, {
    "episodeId": 5,
    "id": 17,
    "intro": "自称是“女汉子”唱功扎实，能唱大气的歌曲，外形靓丽，眼神迷离，风格多变，舞台经验丰富。",
    "name": "王琪飞",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/17.png"
}, {
    "episodeId": 21,
    "id": 28,
    "intro": "形象多变、风格多样；声线独特、有爆发力；2012第2届《麦王争霸》优胜选手及最具网络人气奖。",
    "name": "劳晓音",
    "url": "http://1251113199.cdn.myqcloud.com/1251113199/html/images/singer/7.png"
}];
