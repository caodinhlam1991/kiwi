require("jsdom").env(
    '', [
        "./data/js/jquery-1.7.2.min.js",
        "./data/js/jquery.md5.js"
    ],
    function(errors, window){
        $ = window.$;
        $.express = require('express');
        $.config = require('./config.js').config;
        $.isOf = true;
        $.busy = false;
        $.dateTimeObj = new require('./data/js/dateTimeObj.js').dateTimeObj({
            time: +7
        });
        $.bodyParser = require('body-parser');
        $.__dirname = __dirname;
        $.mongoose = require('mongoose');
        $.formidable = require('formidable');
        $.gettext = require("node-gettext");
        $.postmark = new require("postmark");
        $.excel = require('exceljs');
        $.model = {};
        $.model.db = {};
        $.path = {};
        $.ip = {};
        $.getIpBySocIp = {};
        $.com = {};
        $.app = $.express();
        $.http = require('http');
        $.https = require('https');
        $.querystring = require('querystring');
        $.server = $.http.createServer($.app);
        $.servers = $.https.createServer($.app);
        $.db = $.mongoose.connection;
        $.fs = require('fs');
        $.ejs = require('ejs');
        $.app.use($.bodyParser.json());
        $.app.use($.bodyParser.urlencoded({extended: true, limit: '100mb'}));
        $.app.set('port', process.env.PORT || $.config.port);
        $.app.set('view engine', 'ejs');
        $.app.use($.config.publicpath[1], $.express.static($.__dirname + $.config.publicpath[0]));
        const {spawn} = require('child_process');
        $.crypto = require('crypto');
        $.returned = 0;
        $.webGet = function ($, url, onData, onEnd) {
            $.http.get(url, function (rs) {
                rs.headers['content-type'];
                rs.setEncoding('utf8');
                rs.on('data', function (dt) {
                    onData(dt);
                });
                rs.on('end', function () {
                    onEnd();
                });
            });
        };
        $.folow = function($, ip){
            $.com[ip] = $.done($.com[ip], {num: 1, doAction: true});
            if($.com[ip].num<6)
                $.com[ip].num = parseInt($.com[ip].num)+1;
            else
                $.com[ip].doAction = false;
        };
        $.baseurl = function(req){
            return (((process.env.PORT || $.app.get('port')) == 80)? 'http://': 'https://')+req.headers.host;
        };
        $.baseurls = function(req){
            return (((process.env.PORT || $.app.get('port')) == 80)? 'http://': 'https://')+req.headers.host;
        };
        $.done = function(dt, opt){return ((typeof(dt)!='undefined' && dt != null)? dt: ((typeof(opt)=='undefined')? '': opt));};
        $.createSlug = function(Text){ return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-'); };
        $.parseArray = function(json){
            arr = new Array();
            $.each(json, function(k, v){
                arr[k]=v;
            });
            return arr;
        };
        $.sep_price = function(a){
            var b=new Array,c="",d=1;
            for(c="",d=1,b=a.slice(),i=b.length-1;i>=0;i--)
                c=3==d||6==d||9==d||12==d?0==i?b[i]+c:","+b[i]+c:b[i]+c,d++;
            return c;
        };
        $.getCursorResult = function(cursors, callback){
            $.busy = true;
            var results = [];
            cursors.forEach(function (result) {
                results.push(result);
                cursors.hasNext(function (err, has) {
                    if(has == false)
                    {
                        $.busy = false;
                        callback(results);
                    }
                });
            });
        };
        $.setController = function(file, req, res, action){
            if($.ip.hasOwnProperty((((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress))) == false || JSON.stringify(req.query) !== JSON.stringify($.ip[(((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress))].req.query) ) {
                $.ip[(((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress))] = {
                    req: req,
                    res: res,
                    name: (((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress)),
                    history: {},
                    secure: String(Math.round(Math.random()*666666))
                };
                $.io.sockets.on('connection', function(socket) {
                    $.returned++;
                    if($.returned == 1)
                    {
                        $.getIpBySocIp[socket.handshake.address] = (((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress));
                        $.io.sockets.emit('setIp', {
                            ip: (((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress)),
                            secure: $.ip[(((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress))].secure
                        });
                        setTimeout(function () {
                            $.returned = 0;
                        }, 66);
                    }
                });
            }
            else
                ipTemp = (((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress));
            if(typeof($.ip[(((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress))].life)!='undefined')
                clearTimeout($.ip[(((req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ").length > 1)? (req.header('x-forwarded-for') || req.connection.remoteAddress).split(", ")[0]: (req.header('x-forwarded-for') || req.connection.remoteAddress))].life);
            $.trans = new $.gettext();
            req.params.lang = $.done(((req.params!='undefined')? req.params.lang: null), 'vi');
            $.trans.addTextdomain(req.params.lang, $.fs.readFileSync("./data/media/language/"+req.params.lang+".po"));
            if(typeof(action) !== "undefined")
                require('./views/'+file).controller($, req, res)[action]();
            else
            if(typeof(req.params.action) !== "undefined")
                require('./views/'+file).controller($, req, res)[req.params.action]();
            else
                require('./views/'+file).controller($, req, res);
        };
        $.getModel = function(modul, model, $){
            if(typeof($.model[modul]) === "undefined" || typeof($.model[modul][model]) === "undefined" || $.model[modul][model] === null)
            {
                $.model[modul] = $.done($.model[modul], new Array());
                $.model[modul][model] = new require('./views/' + modul + '/Model/' + model + '.js').model($);
            }
            return $.model[modul][model];
        };
        for(var m=0; m<Object.keys($.config.modules).length; m++)
            require('./views/'+$.config.modules[m]+'/Config.js').config($);
        $.app.use(function(req, res, next) {
            res.redirect($.baseurl(req));
        });
        $.db.on('error', console.error);
        $.mongoose.connect($.config.database.dsnLoc);
        $.server.listen(process.env.PORT || $.app.get('port'), function(){
            $.io = ($.config.onsocket)? require('socket.io').listen($.server): '';
            $.io.sockets.on('connection', function(socket){
                temp = '';
                socket.on('req', function(data){
                    if(data.key != temp)
                    {
                        temp = data.key;
                        if(typeof($.ip[data.ip])!='undefined')
                        {
                            for (var m = 0; m < Object.keys($.config.modules).length; m++)
                                if (typeof(require('./views/' + $.config.modules[m] + '/Controller/index.js').controller($, $.ip[data.ip].req, $.ip[data.ip].res)[data.params.action]) == 'function') {
                                    $.ip[data.ip].name = (data.user!=null)? $.done(data.user.email, data.ip): data.ip;
                                    $.ip[data.ip].history = data.history;
                                    require('./views/' + $.config.modules[m] + '/Controller/index.js').controller($, $.ip[data.ip].req, $.ip[data.ip].res)[data.params.action](data);
//                                    return false;
                                }
                        }
                        else
                            if(typeof(ipTemp)=='undefined' || typeof($.ip[ipTemp])=='undefined')
                                $.io.sockets.emit('reload', {});
                            else
                            {
                                $.io.sockets.emit('setIp', {
                                    ip: ipTemp,
                                    secure: $.ip[ipTemp].secure
                                });
                                delete $.getIpBySocIp[Object.keys($.getIpBySocIp)[Object.values($.getIpBySocIp).indexOf(ipTemp)]];
                                $.getIpBySocIp[socket.handshake.address] = ipTemp;
                                delete ipTemp;
                                for(var m = 0; m < Object.keys($.config.modules).length; m++)
                                    if(typeof(require('./views/' + $.config.modules[m] + '/Controller/index.js').controller($, $.ip[$.getIpBySocIp[socket.handshake.address]].req, $.ip[$.getIpBySocIp[socket.handshake.address]].res)[data.params.action]) == 'function') {
                                        $.ip[$.getIpBySocIp[socket.handshake.address]].name = (data.user!=null)? $.done(data.user.email, $.getIpBySocIp[socket.handshake.address]): $.getIpBySocIp[socket.handshake.address];
                                        $.ip[$.getIpBySocIp[socket.handshake.address]].history = data.history;
                                        require('./views/' + $.config.modules[m] + '/Controller/index.js').controller($, $.ip[$.getIpBySocIp[socket.handshake.address]].req, $.ip[$.getIpBySocIp[socket.handshake.address]].res)[data.params.action](data);
//                                        return false;
                                    }
                            }
                    }
                });
                socket.on('disconnect', function(){
                    if(typeof($.getIpBySocIp[socket.handshake.address])!='undefined' && typeof($.ip[$.getIpBySocIp[socket.handshake.address]]!='undefined') && $.ip[$.getIpBySocIp[socket.handshake.address]].hasOwnProperty('life'))
                    {
                        $.ip[$.getIpBySocIp[socket.handshake.address]].life = setTimeout(function () {
                            $.returned++;
                            if ($.returned == 1)
                            {
                                delete $.ip[$.getIpBySocIp[socket.handshake.address]];
                                delete $.getIpBySocIp[socket.handshake.address];
                                setTimeout(function () {
                                    $.returned = 0;
                                }, 66);
                            }
                        }, 57600);
                        require('./views/User/Controller/index.js').controller($, $.ip[$.getIpBySocIp[socket.handshake.address]].req, $.ip[$.getIpBySocIp[socket.handshake.address]].res)['iAddHistories']($.ip[$.getIpBySocIp[socket.handshake.address]]);
//                        return false;
                    }
                });
                $.return = function(data, result){
                    $.returned++;
                    if ($.returned == 1)
                    {
                        $.io.sockets.emit(data.ip+data.now+data.key, result);
                        setTimeout(function () {
                            $.returned = 0;
                        }, 66);
                    }
                };
                $.returns = function(data, result){
                    $.returned++;
                    if ($.returned == 1)
                    {
                        result.rers = data.params.rers;
                        result.acad = data.user.acad;
                        $.each(JSON.parse(data.params.rers), function(k, v){
                            $.io.sockets.emit(k, result);
                        });
                        $.io.sockets.emit(data.ip+data.now+data.key, result);
                        setTimeout(function () {
                            $.returned = 0;
                        }, 66);
                    }
                };
            });
            if((process.env.PORT || $.app.get('port'))==80)
            {
                //$.runBat = spawn('jsapp-go.bat');
                //$.runBat.stdout.on('data', function(data){
                //    console.log(data.toString());
                //});
                //$.runBat.stderr.on('data', function(data){
                //    console.log(data.toString());
                //});
                //$.runBat.on('exit', function(code){
                //    console.log('Child exited with code ${code}');
                //});
            }
            else
                setInterval(function() {
                    $.https.get("https://wsup3.herokuapp.com");
                }, 300000);
        });
    }
);