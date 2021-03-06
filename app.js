var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var IK = require("./model/ingkee");
var request = require("request");
var HashMap = require("hashmap").HashMap;
map = new HashMap();
var options = {
    method: 'GET',
    url: 'http://webapi.busi.inke.cn/web/live_hotlist_pc'
};
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.minute = 0;
schedule.scheduleJob(rule, function () {
    Lis();
});
function Lis() {
    request(options, function (error, response, body) {
        if (error) return console.log(error);
        var parse = JSON.parse(body);

        console.log(body);
        var hotlists = parse.data.hotlists;
        var i = 0;
        var interval = setInterval(function () {
            if (i >= hotlists.length-1) {
                clearInterval(interval);
            }
            var item = hotlists[i];
            if (map.get(item.id) == undefined || !map.get(item.id)) {
                new IK(item.id, item.liveid, item.nick, item.title, item.online_users);
            }
            i++;
        }, 1000);
        // for (var i = 0; i < hotlists.length; i++) {
        //     var item = hotlists[i];
        //     if (map.get(item.id) == undefined || !map.get(item.id)) {
        //         new IK(item.id, item.liveid, item.nick, item.title, item.online_users);
        //     }
        // }
    });
}
Lis();

module.exports = app;
