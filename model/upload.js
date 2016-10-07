/**
 * Created by deng on 16-10-7.
 */
var request = require("request");
var config = require("../config");

exports.uploadServe = function (room_id, paltform, data) {
    var options = {
        headers: {"Connection": "close"},
        url: config.upload.uploadurl + "dmIngkee" +
        "?room_id=" + room_id,
        /* url: "http://localhost:2999/" +  "dmYY" +
         "?room_id=" + room_id,*/
        method: 'POST',
        json: true,
        body: {data: data}
    };

    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('----info------', data);

        } else {
            console.log(error)
        }
    }

    request(options, callback);
    console.log(room_id + "******");//+ JSON.stringify({data: data}));
};