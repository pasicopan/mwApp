

/// <summary>微信分享类型</summary>


function SetWechatShare(shardData) {
    var _this=this;
    _this.WechatShareTitle = shardData.title;
    _this.WechatShareContent = shardData.content;
    _this.WechatShareUrl =shardData.url;
    _this.WechatShareStart=shardData.start;
    _this.WechatShareImgUrl = shardData.imgUrl;
    _this.WechatShareSuccessCallBack =shardData.shareSuccessCallBack;

    _this.WechatShareType = {
    /// <field name="appmessage" type="String">发送给好友</field>
    appmessage: "appmessage",
    /// <field name="timeline" type="String">分享到朋友圈</field>
    timeline: "timeline",
    /// <field name="weibo" type="String">分享到微博</field>
    weibo: "weibo",
    /// <field name="facebook" type="String">分享到facebook</field>
    facebook: "facebook"
    }


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
            alert("OK")
           // if ( _this.WechatShareStart != undefined) {  _this.WechatShareStart(); }
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url":  _this.WechatShareImgUrl,
                "img_width": "100",
                "img_height": "100",
                "link":  _this.WechatShareUrl,
                "desc":  _this.WechatShareContent,
                "title": _this.WechatShareTitle,
            }, function (res) {
    
                if (res.err_msg.indexOf(":ok") > 0) {
                    if ( _this.WechatShareSuccessCallBack != undefined) {  _this.WechatShareSuccessCallBack(_this.WechatShareType.appmessage); }
                }
            });
        });

        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
              showPage(2);
            if (_this.WechatShareStart != undefined) { _this.WechatShareStart(); }
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": _this.WechatShareImgUrl,
                "img_width": "100",
                "img_height": "100",
                "link": _this.WechatShareUrl,
                "desc": _this.WechatShareContent,
                "title": _this.WechatShareTitle
            }, function (res) {
                if (res.err_msg.indexOf(":ok") > 0) {
                    if (_this.WechatShareSuccessCallBack != undefined) { _this.WechatShareSuccessCallBack(_this.WechatShareType.timeline); }
                }
            });
        });

        // 分享到微博;
        var weiboContent = '';
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
              showPage(2);
            if (_this.WechatShareStart != undefined) { _this.WechatShareStart(); }
            _this.WeixinJSBridge.invoke('shareWeibo', {
                "content": _this.WechatShareTitle + _this.WechatShareContent,
                "url": _this.WechatShareUrl
            }, function (res) {
                if (res.err_msg.indexOf(":ok") > 0) {
                    if (WechatShareSuccessCallBack != undefined) { WechatShareSuccessCallBack(WechatShareType.weibo); }
                }
            });
        });

        // 分享到Facebook
        WeixinJSBridge.on('menu:share:facebook', function (argv) {
            WeixinJSBridge.invoke('shareFB', {
                "img_url": _this.WechatShareImgUrl,
                "img_width": "100",
                "img_height": "100",
                "link": _this.WechatShareUrl,
                "desc": _this.WechatShareContent,
                "title": _this.WechatShareTitle
            }, function (res) {
                if (res.err_msg.indexOf(":ok") > 0) {
                    if (_this.WechatShareSuccessCallBack != undefined) { _this.WechatShareSuccessCallBack(_this.WechatShareType.facebook); }
                }
            });
        });

        // 新的接口
        WeixinJSBridge.on('menu:general:share', function (argv) {
            var scene = 0;
            switch (argv.shareTo) {
                case 'friend': scene = 1; break;
                case 'timeline': scene = 2; break;
                case 'weibo': scene = 3; break;
            }
            argv.generalShare({
                "appid": "",
                "img_url": _this.WechatShareImgUrl,
                "img_width": "100",
                "img_height": "100",
                "link": _this.WechatShareUrl,
                "desc": _this.WechatShareContent,
                "title": _this.WechatShareTitle
            }, function (res) {
                if (res.err_msg.indexOf(":ok") > 0) {
                    if (WechatShareSuccessCallBack != undefined) {
                        if (scene == 1) { _this.WechatShareSuccessCallBack(WechatShareType.appmessage); }
                        else if (scene == 2) { _this.WechatShareSuccessCallBack(WechatShareType.timeline); }
                        else if (scene == 3) { _this.WechatShareSuccessCallBack(WechatShareType.weibo); }
                    }
                }
            });
        });

        // get network type
        var nettype_map = {
            "network_type:fail": "fail",
            "network_type:edge": "2g",
            "network_type:wwan": "3g",
            "network_type:wifi": "wifi"
        };
        /*
		if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke){
			WeixinJSBridge.invoke('getNetworkType',{}, function(res) {
				var networkType = nettype_map[res.err_msg];
				if(networkType=="2g"){
					alert("请使用3G或wifi浏览本网页。");
				}
			});
		}
		*/
    };

}
function viewProfile(userName) {
    if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke) {
        WeixinJSBridge.invoke("profile", {
            username: userName,
            scene: "57"
        });
    } else {
    }
}