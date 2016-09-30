jwplayer.key = "lsUqQ+PB1edH+bYoMb85Yr5CuPlXyhK/ngcyNQ==";
var level = {
    data: "", init: function () {
        var e = this;
        this.getData().done(function (n) {
            0 == n.error_code ? e.data = e.formatData(n.data) : alert(n.message || "获取等级图标失败，请重试！")
        })
    }, getData: function () {
        return $.ajax({
            url: initData.api_url + "Live_resource_rank", dataType: "json", error: function () {
                alert("获取等级图标出错！")
            }
        })
    }, formatData: function (e) {
        for (var n = {}, o = 0; o < e.length; o++)n[e[o].level + "_1"] = e[o].blk, n[e[o].level + "_0"] = e[o].glk;
        return n
    }
};
localStorage.level || level.init(), $(document).ready(function () {
    function getLocationSearch() {
        var e = document.location.search ? document.location.search.substring(1).split("&") : [];
        0 != e.length && (_uid = e[0].split("=")[1], _id = e[1].split("=")[1])
    }

    function renderView(e) {
        function n() {
            var e = $comments.find(".comments_box input");
            return addBuriedPointHandler("109000", 1), e.val().length <= 0 ? void alert("请先输入内容，再进行评论哦～") : e.val().length > 150 ? void alert("字数过多，请清除些，重新发送～") : (o.send(e.val()), void e.val(""))
        }

        var o = new Chat(e);
        if (_isLogin ? ($hostFocus.show(), $hostFocusDone.hide(), e.is_follow && ($hostFocus.hide(), $hostFocusDone.show().html("已关注")), $comments.find(".comments_box input").attr("placeholder", "和大家说点什么吧"), $comments.find(".comments_box span").on("click", n), $(document).on("keydown", function (e) {
                13 == e.keyCode && n()
            }), $comments.find(".comments_box p").hide()) : ($comments.find(".comments_box span").on("click", function () {
                addBuriedPointHandler("109000")
            }), $comments.find(".comments_box p").show()), $liveInfo.find("li:first span").html(e.file.online_users), $liveInfo.find("li:last span").html(e.file.city || "火星"), $hostInfo.find(".host_portrait").attr({
                src: e.media_info.portrait,
                alt: e.media_info.nick
            }), $hostInfo.find(".host_name span").html(e.media_info.nick), $hostInfo.find(".host_name i:first").addClass(0 == e.media_info.gender ? "sex_woman" : "sex_man"), $hostInfo.find(".host_name i:last").css({
                backgroundImage: "url(" + e.media_info.level_img + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
            }), $hostInfo.find(".host_code span").html(e.live_uid), $hostInfo.find(".host_slogan").html(e.media_info.description), hasFlash)if (player = PlayControl.init(), 1 == e.status) {
            $livePlay.show().on("click", function () {
                $(this).hide(), player.player.play()
            }), o.enter_room(_id, _uid);
            var i = {file: e.file.record_url, image: e.file.pic, controls: !1};
            player.setUp(i)
        } else if (0 == e.status) {
            var i = {
                file: e.file.record_url,
                image: e.file.pic,
                controls: !0,
                skin: "http://static.inke.com/web/common/xml/five.xml"
            };
            player.setUp(i), $liveInfo.find("li:first span").html(e.file.online_users + "人看过"), $comments.find(".comments_box").hide(), $comments.css("background", '#f5f5f5 url("./images/comments_bg.png") no-repeat 50% 50%')
        } else $("#liveMedia").css({
            background: "url(" + e.file.pic + ") no-repeat",
            backgroundSize: "100%"
        }), liveEndFn(); else $hasFlash.show();
        if ($hostFocus.on("click", function () {
                hostFocusFn(_uid), addBuriedPointHandler("104000", 1)
            }), $hostFocusDone.on("click", function () {
                _isLogin || (renderLoginPanel(), addBuriedPointHandler("104000"))
            }), $comments.find(".comments_box p").on("click", renderLoginPanel), $commentsBox.on("mouseenter", function () {
                _isScroll = !0, $(this).css("overflowY", "auto")
            }).on("mouseleave", function () {
                _isScroll = !1, $(this).css("overflowY", "hidden")
            }).on("scroll", function (e) {
                e.preventDefault()
            }), $listPanelBd.on("mouseenter", ".list_box .list_pic", function () {
                $(this).find("img").addClass("hover_scale"), $(this).find(".play_layer").show()
            }).on("mouseleave", ".list_box .list_pic", function () {
                $(this).find("img").removeClass("hover_scale"), $(this).find(".play_layer").hide()
            }).on("click", ".list_box .list_pic", function (e) {
                window.location.search = "?uid=" + ($(this).data("uid") || "") + "&id=" + ($(this).data("id") || "")
            }), $liveReplay.find("h3").siblings().attr("href", "/replaylive_list.html?uid=" + _uid).on("click", function () {
                _isLogin ? addBuriedPointHandler("110001", 1) : addBuriedPointHandler("110001")
            }), recordsArr.length > 0) {
            for (var t = "", s = 0; s < (recordsArr.length <= 3 ? recordsArr.length : 3); s++)t += '<div class="list_box"><div class="list_pic" data-uid="' + e.live_uid + '" data-id="' + recordsArr[s].liveid + '"><img src="' + recordsArr[s].pic + '" alt="' + e.media_info.nick + '"><p class="num"><i></i><span>' + recordsArr[s].online_users + '人看过</span></p><span class="tag">回放</span><span class="play_layer"><i></i></span></div><div class="list_intro"><p>' + recordsArr[s].title + "</p></div></div>";
            $liveReplay.find(".list_panel_bd").append(t)
        } else $liveReplay.hide();
        getHotLiveFn(), $liveHot.find("h3").siblings().on("click", function () {
            _isLogin ? addBuriedPointHandler("110002", 1) : addBuriedPointHandler("110002")
        })
    }

    function hostFocusFn(e) {
        $.ajax({
            url: initData.api_url + "live_follow_pc",
            data: {uid: e},
            dataType: "json",
            xhrFields: {withCredentials: !0},
            success: function (e) {
                0 != e.error_code ? alert(e.msg || "关注失败，请重试！") : ($hostFocus.hide(), $hostFocusDone.show().html("已关注"))
            },
            error: function () {
                alert("关注出错！")
            }
        })
    }

    function liveEndFn() {
        $playendBox.find("dd span").html(_liveData.file.online_users), $playendBox.show(), $comments.find(".comments_box").hide(), $comments.css("background", '#f5f5f5 url("./images/comments_bg.png") no-repeat 50% 50%')
    }

    function getHotLiveFn() {
        $.ajax({
            url: initData.api_url + "live_hotlist_pc", dataType: "json", success: function (e) {
                if (0 == e.error_code) {
                    for (var n = "", o = 0; o < 3; o++)n += '<div class="list_box"><div class="list_pic" data-uid="' + e.data.hotlists[o].id + '" data-id="' + e.data.hotlists[o].liveid + '"><img src="' + e.data.hotlists[o].portrait + '" alt="' + e.data.hotlists[o].nick + '"><p class="num"><i></i><span>' + e.data.hotlists[o].online_users + '</span></p><span class="tag">热门</span><span class="play_layer"><i></i></span></div><div class="list_intro"><p>' + e.data.hotlists[o].title + "</p></div></div>";
                    $liveHot.find(".list_panel_bd").append(n)
                } else alert(e.message || "获取热门数据失败，请重试！")
            }, error: function () {
                alert("获取热门数据出错！")
            }
        })
    }

    function json_decode(str) {
        var data = null;
        try {
            str = str.replace(/\"(\w+)\":/g, "$1:"), data = eval("(" + str + ")")
        } catch (e) {
        }
        return data
    }

    var _uid = "", _id = "", _view_id = JSON.parse(initData.userInfo || "{}").view_id, $liveInfo = $(".live_info"), $hostInfo = $(".host_info"), $hostFocus = $(".host_focus"), $hostFocusDone = $(".host_focus_done"), $replayBox = $(".replay_box"), $playendBox = $(".playend_box"), $livePlay = $(".live_play"), $liveReplay = $("#live_replay"), $liveCont = $(".live_content"), $liveHot = $("#live_hot"), $listPanelBd = $(".list_panel_bd"), $loading = $(".loading_wrapper"), $comments = $(".comments"), $commentsBox = $comments.find(".comments_list"), $hasFlash = $(".has_flash"), _liveData = [], PlayControl = null, player = null, Chat = null, timer = null, _isLogin = initData.userInfo, _isFollow = !0, _isScroll = !1, recordsArr = [], hasFlash = flashCheck().hasFlash;
    getLocationSearch(), $.ajax({
        url: initData.api_url + "live_share_pc",
        data: {uid: _uid, id: _id},
        dataType: "json",
        xhrFields: {withCredentials: !0},
        success: function (e) {
            if (e.data && e.data.records && e.data.records.length > 0)for (var n = 0; n < e.data.records.length; n++)e.data.records[n].liveid != _id && recordsArr.push(e.data.records[n]);
            $loading.hide(), $liveCont.show(), $liveHot.show(), recordsArr.length > 0 && $liveReplay.show(), 0 == e.error_code ? (_liveData = e.data, renderView(e.data)) : alert(e.message || "获取数据失败，请重试！")
        },
        error: function () {
            alert("获取数据出错！")
        }
    }), PlayControl = {
        player: null, isRecordList: 0, conf: "", init: function (e) {
            var n = this;
            return n
        }, setUp: function (e, n) {
            var o = this;
            o.isRecordList = n || 0;
            var i = {
                flashplayer: "http://static.inke.com/web/common/swf/jwplayer.flash.swf",
                width: "100%",
                height: "100%",
                primary: "flash",
                events: {
                    onPlay: o.onPlay,
                    onPause: o.onPause,
                    onBuffer: o.onBuffer,
                    onDisplayClick: o.onDisplayClick,
                    onSetupError: o.onSetupError,
                    onComplete: o.onComplete,
                    onIdle: o.onIdle,
                    onError: o.onError
                }
            };
            $.extend(!0, i, e || {}), o.player = jwplayer("liveMedia").setup(i)
        }, onPlay: function () {
            console.log("onPlay")
        }, onPause: function () {
            console.log("onPause")
        }, onBuffer: function () {
            console.log("onBuffer")
        }, onDisplayClick: function () {
            console.log("onDisplayClick")
        }, onSetupError: function () {
            console.log("onSetupError", arguments)
        }, onComplete: function () {
            liveEndFn(), console.log("onComplete")
        }, onIdle: function () {
            console.log("onIdle", arguments)
        }, onError: function () {
            console.error("player onError", arguments)
        }, bindEvent: function () {
        }
    }, Chat = function (e) {
        var n = this;
        this.socket = null, this.enter_room = function (o, i) {
            var t = {
                uid: _view_id,
                place: "room",
                sid: 1,
                roomid: o,
                token: e.token,
                time: _isLogin ? e.token_time : e.time,
                nonce: e.nonce,
                sec: e.sec
            };
            if (null != this.socket) {
                var s = {b: {ev: "c.lr"}};
                this.socket.emit("c.lr", s)
            }
            this.socket = io.connect("http://" + e.sio_ip + "?" + $.param(t)), this.socket.on("connect", function (e) {
            }), this.socket.on("message", function (e, o) {
                if (o && o(), e = json_decode(e), null != e) {
                    if ("undefined" != typeof e.b && "s.d" == e.b.ev && ($commentsBox.hide(), $comments.css("background", '#f5f5f5 url("./images/comments_bg.png") no-repeat 50% 50%'), alertHandler("您的帐号同时在客户端登录，为了保证您的观看质量，建议您去客户端继续观看哦！"), n.leave_room()), "undefined" != typeof e.b && "s.m" == e.b.ev) {
                        var i = n.parse_message(e);
                        n.show_message(i)
                    }
                    "undefined" != typeof e.b && "s.m" == e.b.ev && "undefined" != typeof e.ms && 1 == e.ms.length && "usernu" == e.ms[0].tp && "undefined" != typeof e.ms[0].n && parseInt(e.ms[0].n) > 0 && $liveInfo.find("li:first span").html(e.ms[0].n), "undefined" != typeof e.b && "c.g" == e.b.ev && gift.after_send(e)
                }
            })
        }, this.send = function (e) {
            var n = {b: {ev: "c.ch"}, c: e};
            this.socket.send(JSON.stringify(n));
            var o = [{
                nick: JSON.parse(initData.userInfo).name,
                level: JSON.parse(initData.userInfo).level,
                gender: JSON.parse(initData.userInfo).gender,
                msg: e
            }];
            this.show_message(o)
        }, this.parse_message = function (e) {
            var n = [];
            if ("undefined" != typeof e.b && "undefined" != typeof e.b.ev && "s.m" == e.b.ev && "undefined" != typeof e.ms && e.ms.length)for (var o = e.ms, i = 0; i < o.length; i++)"undefined" != typeof o[i].from && "undefined" != typeof o[i].c && n.push({
                nick: o[i].from.nic,
                msg: o[i].c,
                level: o[i].from.lvl,
                gender: o[i].from.gd
            });
            return n
        }, this.show_message = function (e) {
            level.data && (localStorage.level = JSON.stringify(level.data));
            for (var n = JSON.parse(localStorage.level), o = 0; o < e.length; o++) {
                var i = "comments_text";
                e[o].msg.indexOf("我送了") != -1 && (i = "comments_gift");
                var t = '<li><img src="http://img.meelive.cn/' + n[e[o].level + "_" + e[o].gender] + '" alt="第' + e[o].level + '级" /><span>' + e[o].nick + '：</span><span class="' + i + '">' + e[o].msg + "</span></li>";
                $commentsBox.find("ul").append(t)
            }
            !_isScroll && $commentsBox.find("ul").innerHeight() > $commentsBox.height() && $commentsBox.scrollTop($commentsBox.find("ul").innerHeight() - $commentsBox.height()), $commentsBox.find("ul").children().length > 60 && $commentsBox.find("ul li:first").remove()
        }, this.send_gift = function (e, n, o, i) {
            var t = {b: {ev: "c.g"}, id: e.id, repeat: n, cl: [255, 255, 255], to: o, seq: i};
            this.socket.send(JSON.stringify(t))
        }, this.leave_room = function () {
            this.socket.disconnect()
        }
    }
});