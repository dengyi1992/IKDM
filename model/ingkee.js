/**
 * Created by deng on 16-9-30.
 */
var request = require("request");
var Upload =require("./upload");

function IK(uid, id) {
    this.uid = uid;
    this.id = id;
    this.start()
}
IK.prototype.start = function () {
    var uid = this.uid;
    var id = this.id;
    var token = null, time = null, nonce = null, sec = null, wsurl = null, sioIp = null;
    var options = {
        method: 'GET',
        url: 'http://webapi.busi.inke.cn/web/live_share_pc',
        qs: {uid: uid, id: id}
    };

    request(options, function (error, response, body) {
        if (error) return console.log(error);
        var parse = JSON.parse(body);
        var t = new Date().getTime() + '';
        token = parse.data.token;
        time = parse.data.time;
        nonce = parse.data.nonce;
        sec = parse.data.sec;
        sioIp = parse.data.sio_ip;
        var options = {
            method: 'GET',
            url: 'http://' + sioIp +
            '/socket.io/1/',
            qs: {
                uid: '',
                place: 'room',
                sid: '1',
                roomid: id,
                token: token,
                time: time,
                nonce: nonce,
                sec: sec,
                t: t
            }
        };

        request(options, function (error, response, body) {
            if (error) return console.log(error);
            wsurl = body.slice(0, 20);
            startDMListen();

            console.log(body);
        });
    });
    function json_decode(str) {
        var replace = str.replace(/\"(\w+)\":/g, "$1:");
        return replace.slice(0, 3);
    }
    function startDMListen() {
        var uploaddata=[];
        var WebSocketClient = require('websocket').client;

        var client = new WebSocketClient();
        client.on('connectFailed', function (error) {
            console.log('Connect Error: ' + error.toString());
        });
        client.on('connect', function (connection) {
            console.log('WebSocket Client Connected');
            connection.on('error', function (error) {
                console.log("Connection Error: " + error.toString());
            });
            connection.on('close', function () {
                console.log('echo-protocol Connection Closed');
            });
            function sendHeartBeat() {
                try {
                    if (connection.connected) {

                        connection.sendUTF("2::");
                    }
                } catch (e) {
                    console.log(e.message);
                }
            }

            connection.on('message', function (message) {


                if (message.type === 'utf8') {
                    switch (json_decode(message.utf8Data)) {
                        case "2::":
                            sendHeartBeat();
                            break;
                        case "3::":
                            // console.log("-----------" + json_decode(message.utf8Data));
                            var data = message.utf8Data.slice(4);
                            var parse = JSON.parse(data);
                            uploaddata.push(parse);
                            //console.log(parse.userid + "--------" + data);
                            break;
                        default:
                            break;
                    }

                }
                if (uploaddata.length>30){
                    Upload.uploadServe(id,uid,'ingkee',uploaddata);
                    uploaddata=[];
                }
            });
        });
        client.connect("ws://" + sioIp +
            "/socket.io/1/websocket/" + wsurl +
            "?uid=&place=room&sid=1&roomid=" + id +
            "&token=&time=" + time +
            "&nonce=" + nonce +
            "&sec=" + sec);

    }
};


module.exports = IK;
