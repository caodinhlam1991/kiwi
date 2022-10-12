exports.controller = function ($, req, res) {
    var iSaveContent = function (data) {
        item = {};
        if (data.params.item.hasOwnProperty('cats') == true && data.params.item.cats.hasOwnProperty(0) == true) {
            cats = new Array();
            $.each(data.params.item.cats, function (index, value) {
                cats[index] = $.ObjectId(value);
            });
            item.cats = cats;
        } else
            item.cats = new Array();
        item.keyword = data.params.item.keyword;
        item.date = new Date($.done(data.params.item.date, $.dateTimeObj.getNow()));
        item.live = data.params.item.live == 'true';
        item.views = $.done(data.params.item.views, 0);
        item.position = parseInt($.done(data.params.item.position, 0));
        item.wid = $.ObjectId(data.people._id);
        item.path = data.params.item.path;
        item.type = data.params.item.type;
        if(data.params.item.opath == data.params.item.path && data.params.item.path != '')
            saveContent(data, item, function () {
                $.return(data, item);
            });
        else
            getPath(data.params.item.path, {params: {loops: -1, slugTemp: 2, flag: req.params.lang}, fn: function (slug) {
                item.path = slug;
                saveContent(data, item, function () {
                    $.return(data, item);
                });
            }});
    };
    var iWriteGN = function (data) {
        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.people._id), function (coin) {
            item = {};
            if (data.params.item.hasOwnProperty('cats') == true && data.params.item.cats.hasOwnProperty(0) == true) {
                cats = new Array();
                $.each(data.params.item.cats, function (index, value) {
                    cats[index] = $.ObjectId(value);
                });
                item.cats = cats;
            } else
                item.cats = new Array();
            item.keyword = data.params.item.keyword;
            item.date = new Date($.done(data.params.item.date, $.dateTimeObj.getNow()));
            item.live = data.params.item.live == 'true';
            item.views = $.done(data.params.item.views, 0);
            item.position = parseInt($.done(data.params.item.position, 0));
            item.wid = $.ObjectId(data.params.item.wid);
            item.path = data.params.item.path;
            item.type = data.params.item.type;
            switch(data.params.adId)
            {
                case data.people._id:
                    if(coin.coin >= 9000)
                    {
                        coin.had = {
                            coin: coin.coin,
                            shared: coin.shared,
                            getedFree: coin.getedFree,
                            gifted: coin.gifted
                        };
                        coin.coin = coin.coin - 9000;
                        coin.date = new Date($.dateTimeObj.getNow());
                        $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                            getPath(data.params.item.path, {params: {loops: -1, slugTemp: 2, flag: $.done(req.params.lang, 'vi')}, fn: function (path) {
                                item.path = path;
                                saveContent(data, item, function (ite) {
                                    $.return(data, {writed: true, coin: coin.coin, shared: coin.shared, item: ite});
                                });
                            }});
                        });
                    }
                    else
                        $.return(data, {writed: false});
                    break;
                case null:
                    if(coin.shared<30)
                        getPath(data.params.item.path, {params: {loops: -1, slugTemp: 2, flag: $.done(req.params.lang, 'vi')}, fn: function (path) {
                            item.path = path;
                            saveContent(data, item, function () {
                                coin.had = {
                                    coin: coin.coin,
                                    shared: coin.shared,
                                    getedFree: coin.getedFree,
                                    gifted: coin.gifted
                                };
                                coin.shared = coin.shared + 1;
                                coin.date = new Date($.dateTimeObj.getNow());
                                $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                                    $.return(data, {writed: true, item: item, shared: coin.shared});
                                });
                            });
                        }});
                    else
                        $.return(data, {writed: false});
                    break;
                default:
                    if(coin.coin >= 11000)
                    {
                        coin.had = {
                            coin: coin.coin,
                            shared: coin.shared,
                            getedFree: coin.getedFree,
                            gifted: coin.gifted
                        };
                        coin.coin = coin.coin - 11000;
                        coin.date = new Date($.dateTimeObj.getNow());
                        $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                            editS(data.params.adId, 1500, function(s){
                                getPath(data.params.item.path, {params: {loops: -1, slugTemp: 2, flag: $.done(req.params.lang, 'vi')}, fn: function (path) {
                                    item.path = path;
                                    saveContent(data, item, function () {
                                        $.return(data, {writed: true, coin: coin.coin, shared: coin.shared, item: item});
                                    });
                                }});
                            });
                        });
                    }
                    else
                        $.return(data, {writed: false});
                    break
            }
        });
    };
    var editS = function(_id, sEdit, fn){
        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(_id), function (watts) {
            watts.had = {
                coin: watts.coin,
                shared: watts.shared,
                getedFree: watts.getedFree,
                gifted: watts.gifted
            };
            watts.coin = watts.coin + sEdit;
            watts.date = new Date($.dateTimeObj.getNow());
            $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                if(typeof(fn)=='function')
                    fn(watts);
            });
        });
    };
    var saveContent = function (data, item, cb) {
        if (data.flags.length > 0) {
            item.flag = data.flags[0].id;
            delete item._id;
            item.title = data.params.item['title' + data.flags[0].id];
            item.except = data.params.item['except' + data.flags[0].id];
            item.imgs = data.params.item['imgs' + data.flags[0].id];
            item.params = data.params.item['params' + data.flags[0].id];
            console.log(data.flags[0].id);
            if (typeof (data.params.item['_id' + data.flags[0].id]) == 'undefined') {
                if (item.type != 'term') {
                    item.site = $.config.link;
                    $.getModel('Content', 'index', $).addContent(item, function (ct) {
                        if(data.params.item['detail' + data.flags[0].id]!='empties')
                            $.getModel('Content', 'post', $).addPost({
                                detail: ((data.params.item['detail' + data.flags[0].id] != '') ? data.params.item['detail' + data.flags[0].id] : '$'),
                                contentid: $.ObjectId(ct._id)
                            }, function (dt) {
                                item['contentid' + data.flags[0].id] = dt.contentid;
                                console.log(dt);
                                data.flags.shift();
                                saveContent(data, item, cb);
                            });
                        else
                        {
                            data.flags.shift();
                            saveContent(data, item, cb);
                        }
                    });
                } else
                    $.getModel('Content', 'index', $).addContent(item, function (dt) {
                        data.flags.shift();
                        saveContent(data, item, cb);
                    });
            } else {
                item._id = $.ObjectId(data.params.item['_id' + data.flags[0].id]);
                if (item.type != 'term')
                    item.site = data.params.item.site;
                $.getModel('Content', 'index', $).editContent(item, function (dt) {
                    if (item.type != 'term')
                    {
                        if (item.site == $.config.link)
                        {
                            $.getModel('Content', 'post', $).getPostCId($.ObjectId(item._id), function (post) {
                                delete post.contentid;
                                $.getModel('Content', 'post', $).editPostId($.ObjectId(post._id), {
                                    detail: ((data.params.item['detail' + data.flags[0].id] != '') ? data.params.item['detail' + data.flags[0].id] : '$'),
                                    contentid: $.ObjectId(item._id)
                                }, function (dt) {
                                    data.flags.shift();
                                    saveContent(data, item, cb);
                                });
                            });
                        } else
                            $.getModel('Content', 'post', $).addPost({
                                detail: ((data.params.item['detail' + data.flags[0].id] != '') ? data.params.item['detail' + data.flags[0].id] : '$'),
                                contentid: $.ObjectId(item._id)
                            }, function (post) {
                                $.webGet($, item.site + '/vi/content/setPost?&contentid=' + data.params.item['_id' + data.flags[0].id] + '&mSite=' + $.config.link + '&mContentId=' + post.contentid, function (dt) {

                                }, function () {
                                    data.flags.shift();
                                    saveContent(data, item, cb);
                                });
                            });
                    } else {
                        data.flags.shift();
                        saveContent(data, item, cb);
                    }
                });
            }
        } else
            cb(item);
    };
    var iGetContent = function (data) {
        $.getModel('Content', 'index', $).getContentsByPath(data.params.path, function (contents) {
            if (contents[0].type != 'term')
                $.each(contents, function (i, v) {
                    new Promise(function (resolve, reject) {
                        resolve({index: i, rt: true});
                    }).then(function (objDt) {
                        contents[objDt.index].detail = '';
                        $.webGet($, contents[objDt.index].site + '/vi/content/getPost?&contentid=' + contents[objDt.index]._id, function (dt) {
                            contents[objDt.index].detail += dt;
                        }, function () {
                            $.each(contents, function (k, d) {
                                if (contents[k].detail == '')
                                    objDt.rt = false
                            });
                            if (objDt.rt == true)
                            {
                                $.return(data, contents);
                            }
                        });
                    });
                });
            else
                $.return(data, contents);
        });
    };
    var iGetFeatures = function (data) {
        $.getModel('Content', 'index', $).getContentsOpts({type: 'feature', 'params.rang-buoc.detail': '1', flag: data.people.flag}, {date: -1}, {params: 1, path: 1, title: 1}, function (contents) {
            $.return(data, contents);
        });
    };
    var iChangePw = function (data) {
        $.getModel('People', 'index', $).getPeopleByEmail(data.people.email, function (people) {
            if ($.md5(data.params.pw) == people.pw)
            {
                $.getModel('People', 'index', $).editPeople({
                    _id: $.ObjectId(data.people._id),
                    pw: $.md5(data.params.newPw)
                }, function (dt) {
                    $.return(data, true);
                });
            } else
                $.return(data, false);
        });
    };
    var iGetMores = function (data) {
        query = {};
        switch (data.params.type)
        {
            case 'post':
                data.params.type = [data.params.type];
                if (data.people.class == 6)
                    data.params.type.push('spost');
                if (data.params.opt != '')
                {
                    query = {type: {$in: data.params.type}, flag: data.people.flag, cats: $.ObjectId(data.params.opt), title: {$regex: ".*" + data.params.keys + ".*"}};
                    (data.people.class != 6) ? query['wid'] = $.ObjectId(data.people._id) : '';
                    $.getModel('Content', 'index', $).getContentsAdv(query, {date: -1}, data.params.from, 10, function (contents) {
                        $.return(data, contents.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date);
                        }));
                    });
                } else
                {
                    query = {type: {$in: data.params.type}, flag: data.people.flag, title: {$regex: ".*" + data.params.keys + ".*"}};
                    (data.people.class != 6) ? query['wid'] = $.ObjectId(data.people._id) : '';
                    $.getModel('Content', 'index', $).getContentsAdv(query, {date: -1}, data.params.from, 10, function (contents) {
                        $.return(data, contents.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date);
                        }));
                    });
                }
                break;
            case 'page':
            case 'feature':
            case 'menu':
                query = {type: data.params.type, flag: data.people.flag, title: {$regex: ".*" + data.params.keys + ".*"}};
                (data.people.class != 6) ? query['wid'] = $.ObjectId(data.people._id) : '';
                $.getModel('Content', 'index', $).getContentsAdv(query, {date: -1}, data.params.from, 10, function (contents) {
                    $.return(data, contents.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }));
                });
                break;
            case 'term':
                query = {type: data.params.type, flag: data.people.flag, title: {$regex: ".*" + data.params.keys + ".*"}};
                    console.log(query);
                (data.people.class != 6) ? query['wid'] = {$in: [$.ObjectId(data.people._id)]} : '';
                $.getModel('Content', 'index', $).getContentsAdv(query, {cats: 1, date: 1}, data.params.from, 10, function (contents) {
                    console.log(contents);
                    $.return(data, contents.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }));
                });
                break;
            case 'locterm':
                query = {type: 'term', flag: data.people.flag, title: {$regex: ".*" + data.params.keys + ".*"}};
                (data.people.class != 6) ? query['wid'] = {$in: [$.ObjectId(data.people._id)]} : '';
                $.getModel('Content', 'index', $).getLocContentsAdv(query, {cats: 1, date: 1}, data.params.from, 10, function (contents) {
                    $.return(data, contents.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }));
                });
                break;
            case 'image':
            case 'video':
                query = {};
                if (data.people.class != 6)
                    query = {wid: $.ObjectId(data.people._id)};
                query['type'] = data.params.type;
                query['name'] = {$regex: ".*" + data.params.keys + ".*"};
                $.getModel('File', 'index', $).getFilesAdv(query, {date: -1, name: 1}, data.params.from, 12, function (files) {
                    $.return(data, files.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }));
                });
                break;
            case 'audio':
                query = {};
                if (data.people.class != 6)
                    query = {$or: [{wid: $.ObjectId(data.people._id)}, {live: true}]};
                query['type'] = data.params.type;
                query['name'] = {$regex: ".*" + data.params.keys + ".*"};
                $.getModel('File', 'index', $).getFilesAdv(query, {date: -1, name: 1}, data.params.from, 9, function (files) {
                    files.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
                    $.each(files, function (m, n) {
                        files[m].name = n.name.substring(0, n.name.indexOf(".mp3"));
                        if (m == 0)
                            files[m].space = 0;
                        else
                            files[m].space = files[m - 1].params.duration + files[m - 1].space;
                    });
                    if (files.length > 0) {
                        $.return(data, {
                            list: files,
                            src: null
                        });
                    } else
                        $.return(data, {
                            list: [],
                            src: null
                        });
                });
                break;
            case 'customer':
                $.getModel('People', 'index', $).getPeoplesAdv({class: 2}, {date: -1}, data.params.from, 10, function (peoples) {
                    $.return(data, peoples.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }));
                });
                break;
            case 'messenges':
                data.params.wids = [];
                $.each(data.params.chats, function (k, v) {
                    data.params.wids.push($.ObjectId(v._id));
                });
                        console.log(data.params.wids);
                $.getModel('People', 'index', $).getPeoplesAdv({email: {$regex: ".*" + data.params.keys + ".*"}, _id: {$in: data.params.wids}}, {schoolname: -1, displayname: -1}, data.params.from, 10, function (peoples) {
                    chats = {wid: {$in: data.params.wids}};
                    chats['params.readed.' + data.people.pead] = 1;
                    $.getModel('Chat', 'index', $).getAll1Chats(chats, {date: 1}, function (chats) {
                        data.params.letters = {};
                        $.each(chats, function (k, v) {
                            data.params.letters[data.params.wids] = v;
                        });
                        $.each(peoples, function (k, v) {
                            $.each(data.params.letters, function (k2, v2) {
                                if(v._id == k2)
                                    peoples[k].chat = v2
                            });
                        });
                        $.each(peoples, function (k, v) {
                            if (typeof (data.people.friends) != 'undefined' && data.people.friends.indexOf(String(v._id)) > -1) {
                                peoples[k].isFr = true;
                                peoples.splice(k, 1);
                                peoples.unshift(v);
                            } else
                                peoples[k].isFr = false;
                        });
                        $.return(data, [peoples]);
                    });
                });
                break;
            case 'mfriend':
                console.log('222');
                var friends = [];
                $.each(data.people.friends, function (k, v) {
                    friends.push($.ObjectId(v));
                });
                $.getModel('People', 'index', $).getPeoplesAdv({email: {$regex: ".*" + data.params.keys + ".*"}, _id: {$in: friends}}, {schoolname: -1, displayname: -1}, data.params.from, 10, function (peoples) {
                    delete friends;
                    $.return(data, peoples);
                });
                break;
            case 'friend':
                console.log('333');
                var friends = [$.ObjectId(data.people._id)];
                $.each(data.people.friends, function (k, v) {
                    friends.push($.ObjectId(v));
                });
                $.getModel('People', 'index', $).getPeoplesAdv({email: {$regex: ".*" + data.params.keys + ".*"}, _id: {$nin: friends}}, {schoolname: -1, displayname: -1}, data.params.from, 10, function (peoples) {
                    delete friends;
                    $.return(data, peoples);
                });
                break;
            case 'people':
                console.log('444');
                if (data.people.class == 6)
                    $.getModel('People', 'index', $).getPeoplesAdv({email: {$regex: ".*" + data.params.keys + ".*"}}, {date: -1}, data.params.from, 10, function (peoples) {
                        $.return(data, peoples.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date);
                        }));
                    });
                else
                    $.getModel('People', 'index', $).getPeoplesAdv({class: {$ne: 6}, email: {$regex: ".*" + data.params.keys + ".*"}}, {date: -1}, data.params.from, 10, function (peoples) {
                        $.return(data, peoples.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date);
                        }));
                    });
                break;
            case 'flag':
                if (data.people.class == 6)
                    $.getModel('Flag', 'index', $).getFlagsAdv({flag: data.people.flag}, {position: 1}, data.params.from, 10, function (flags) {
                        $.return(data, flags.sort(function (a, b) {
                            return new Date(b.created) - new Date(a.created);
                        }));
                    });
                else
                    $.getModel('Flag', 'index', $).getFlagsAdv({flag: data.people.flag, active: true}, {position: 1}, data.params.from, 10, function (flags) {
                        $.return(data, flags.sort(function (a, b) {
                            return new Date(b.created) - new Date(a.created);
                        }));
                    });
                break;
            case 'order':
                if (data.people.class == 1 || data.people.class == 6)
                    $.getModel('Cart', 'index', $).getCarts({}, {date: -1}, data.params.from, 10, function (carts) {
                        $.return(data, carts.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date);
                        }));
                    });
                break;
            case 'contact':
                if (data.people.class == 1 || data.people.class == 6)
                    $.getModel('Contact', 'index', $).getContactsAdv({type: data.params.type}, {date: -1}, data.params.from, 10, function (contacts) {
                        $.return(data, contacts.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date);
                        }));
                    });
                break;
            case 'subscription':
                if (data.people.class == 1 || data.people.class == 6)
                    $.getModel('Contact', 'index', $).getSubscriptionsAdv({type: data.params.type}, {date: -1}, data.params.from, 10, function (contacts) {
                        $.return(data, contacts.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date);
                        }));
                    });
                break;
        }
    };
    var iCreateListMusic = function (data) {
        if (data.params.list.length > 0)
            createFiles(data.params.list, 0, function () {
                var audioconcat = require('audioconcat');
                var songs = [];
                data.params.name = data.ip + $.dateTimeObj.getNowString() + data.key + '.mp3';
                $.each(data.params.list, function (m, n) {
                    songs.push($.config.filedir + '/' + n.name + '.mp3');
                });
                audioconcat(songs)
                        .concat($.config.filedir + '/' + data.params.name)
                        .on('start', function (command) {
                            console.log('ffmpeg process started:', command);
                        })
                        .on('error', function (err, stdout, stderr) {
                            console.error('Error:', err);
                            console.error('ffmpeg stderr:', stderr);
                        })
                        .on('end', function (output) {
                            console.error('Audio created in:', output);
                            $.return(data, (($.isOf == true) ? $.baseurls(req) : $.config.link) + $.config.file + '/' + data.params.name);
                        });
            });
        else
            $.return(data, null);
    };
    var createFiles = function (result, k, callback) {
        multimedia = '';
        $.webGet($, result[k].site + '/vi/media/getData?&mediaid=' + result[k].mediaid, function (dt) {
            multimedia += dt;
        }, function () {
            media = multimedia.substring(multimedia.indexOf(';base64,') + 8);
            media = media.replace(/ /g, '+');
            media = new Buffer(media, 'base64');
            $.fs.writeFileSync($.config.filedir + '/' + result[k].name + '.mp3', media);
            if (k == result.length - 1)
                callback();
            else
                createFiles(result, k + 1, callback);
        });
    };
    var iGetTerms = function (data) {
        query = {type: 'term', flag: req.params.lang};
        (data.people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(data.people._id) : '';
        $.getModel('Content', 'index', $).getAll(query, {cats: 1, date: 1}, {title: 1, cats: 1}, function (contents) {
            $.return(data, contents);
        });
    };
    var iDelContent = function (data) {
        $.getModel('Content', 'index', $).getContentsByPath(data.params.path, function (contents) {
            delContent(contents, function () {
                $.return(data, contents);
            });
        });
    };
    var delContent = function (contents, cb) {
        if (contents.length > 0) {
            if (contents[0].type != 'term') {
                $.webGet($, contents[0].site + '/vi/content/delPost?&contentid=' + contents[0]._id, function (dt) {

                }, function () {
                    $.getModel('Content', 'index', $).delContentByPath(contents[0].path, function (dt) {
                        contents.shift();
                        delContent(contents, cb);
                    })
                });
            } else
                $.getModel('Content', 'index', $).delContentByPath(contents[0].path, function (dt) {
                    contents.shift();
                    delContent(contents, cb);
                })
        } else
            cb();
    }
    var iDelOrder = function (data) {
        $.getModel('Cart', 'index', $).delCart($.ObjectId(data.params._id), function (dt) {
            $.getModel('Cart', 'product', $).delProByCartid($.ObjectId(data.params._id), function (dt2) {
                $.return(data, {cart: dt, product: dt2});
            });
        });
    };
    var iDelProduct = function (data) {
        $.getModel('Cart', 'product', $).delProduct($.ObjectId(data.params._id), function (dt) {
            $.return(data, {product: dt});
        });
    };
    var iDelContact = function (data) {
        $.getModel('Contact', 'index', $).delContactId($.ObjectId(data.params._id), function (dt) {
            $.return(data, dt);
        });
    };
    var iDelSub = function (data) {
        $.getModel('People', 'index', $).getPeopleByEmail(data.params.email, function (people) {
            delete people.contact[0][data.params.key];
            $.getModel('People', 'index', $).editContact({
                email: data.params.email,
                contact: people.contact
            }, function (docs) {
                $.return(data, docs);
            });
        });
    };
    var iDelPeople = function (data) {
        if (data.people.class == 1 || data.people.class == 6)
            $.getModel('People', 'index', $).delPeople($.ObjectId(data.params._id), function (docs) {
                $.return(data, docs);
            });
    };
    var iAddFr = function (data) {
        data.people.friends = (typeof (data.people.friends) == 'undefined') ? [] : data.people.friends;
        data.people.friends.push(data.params.id);
        $.getModel('People', 'index', $).editPeople({
            _id: $.ObjectId(data.people._id),
            email: data.people.email,
            pw: data.people.pw,
            pead: data.people.pead,
            displayname: data.people.displayname,
            class: data.people.class,
            active: data.people.active,
            flag: data.people.flag,
            date: new Date(data.people.date),
            classes: data.people.classes,
            deco: data.people.deco,
            schoolname: data.people.schoolname,
            parameters: data.people.parameters,
            phone: data.people.phone,
            friends: data.people.friends
        }, function(people){
            $.return(data, people);
        });
    };
    var iDelFr = function (data) {
        data.people.friends.splice(data.people.friends.indexOf(data.params.id), 1);
        $.getModel('People', 'index', $).editPeople({
            _id: $.ObjectId(data.people._id),
            email: data.people.email,
            pw: data.people.pw,
            pead: data.people.pead,
            displayname: data.people.displayname,
            class: data.people.class,
            active: data.people.active,
            flag: data.people.flag,
            date: new Date(data.people.date),
            classes: data.people.classes,
            deco: data.people.deco,
            schoolname: data.people.schoolname,
            parameters: data.people.parameters,
            phone: data.people.phone,
            friends: data.people.friends
        }, function (people) {
            $.return(data, people);
        });
    };
    var wTranfer = function (data) {
        $.returns(data, {info: data.params.info, type: 'tranfer', index: data.params.index});
    };
    var wTalk = function (data) {
        $.getModel('Chat', 'index', $).addChat({
            detail: data.params.mess,
            wid: $.ObjectId(data.people._id),
            params: {
                rers: JSON.parse(data.params.rers),
                readed: JSON.parse(data.params.rers)
            },
            date: $.dateTimeObj.getNow()
        }, function (docs) {
            //data.params = null;
            console.log(data);
            $.returns(data, {type: 'talk', chat: docs});
        });
        //data.params = null;
    };
    var iReaded = function (data) {
        data.params.chat.params.readed[data.params.pead] = true;
        $.getModel('Chat', 'index', $).editChat($.ObjectId(data.params.chat._id), {
            params: {
                rers: data.params.chat.params.rers,
                readed: data.params.chat.params.readed
            }
        }, function (doc) {
            $.return(data, true);
        });
    };
    var iChangeLive = function (data) {
        switch (data.params.board) {
            case 'dBoardOrder':
                $.getModel('Cart', 'index', $).changeLive($.ObjectId(data.params.id), data.params.live, function (doc) {
                    $.return(data, doc);
                });
                break;
            case 'dBoardCustomers':
                $.getModel('People', 'index', $).changeActiveById($.ObjectId(data.params.id), data.params.live, function (doc) {
                    $.return(data, doc);
                });
                break;
            case 'dBoardContact':
                console.log(data.params);
                $.getModel('Contact', 'index', $).changeLive($.ObjectId(data.params.id), data.params.live, function (doc) {
                    $.return(data, doc);
                });
                break;
            default:
                $.getModel('Content', 'index', $).changeLive($.ObjectId(data.params.id), data.params.live, function (doc) {
                    $.return(data, doc);
                });
                break;
        }
    };
    var iDeleteImg = function (data) {
        $.getModel('File', 'index', $).delMultimediaId(data.params._id, function (doc) {
            $.return(data, true);
        });
    };
    var iSaveFlag = function (data) {
        if (data.people.class == 1 || data.people.class == 6 || data.people.class == 4) {
            if (typeof (data.params.item._id) == 'undefined')
            {
                itemvi = {};
                itemen = {};
                itemru = {};
                itemch = {};
                itemja = {};
                itemvi.id = itemen.id = itemru.id = itemch.id = itemja.id = data.params.item.id;
                itemvi.name = data.params.item.namevi;
                itemen.name = data.params.item.nameen;
                itemru.name = data.params.item.nameru;
                itemch.name = data.params.item.namech;
                itemja.name = data.params.item.nameja;
                itemvi.image = itemen.image = itemru.image = itemch.image = itemja.image = data.params.item.image;
                itemvi.parameters = itemen.parameters = itemru.parameters = itemch.parameters = itemja.parameters = data.params.item.parameters;
                itemvi.position = itemen.position = itemru.position = itemch.position = itemja.position = 1;
                itemvi.active = itemen.active = itemru.active = itemch.active = itemja.active = data.params.item.active == 'true';
                itemvi.flag = 'vi';
                itemen.flag = 'en';
                itemru.flag = 'ru';
                itemch.flag = 'ch';
                itemja.flag = 'ja';
                itemvi.created = itemen.created = itemru.created = itemch.created = itemja.created = new Date($.dateTimeObj.getNow());
                $.getModel('Flag', 'index', $).addFlag([itemvi, itemen, itemru, itemch, itemja], function (doc) {
                    $.return(data, true);
                });
            } else
                $.getModel('Flag', 'index', $).getFlag({id: data.params.item.idOld}, function (flags) {
                    editLang(flags, data, function () {
                        $.return(data, flags);
                    });
                });
        } else
            $.return(data, false);
    };
    var editLang = function (flags, data, cb) {
        if (flags.length > 0) {
            flags[0].id = data.params.item.id;
            flags[0].image = data.params.item.image;
            flags[0].position = parseInt($.done(data.params.item.position, 0));
            flags[0].active = data.params.item.active == 'true';
            flags[0].name = data.params.item['name' + flags[0].flag];
            $.getModel('Flag', 'index', $).editFlag(flags[0], function (doc) {
                flags.shift();
                editLang(flags, data, cb);
            });
        } else
            cb();
    };
    var iGetFeatures2 = function (data) {
        query = {type: 'feature', flag: data.people.flag};
        (data.people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(data.people._id) : '';
        $.getModel('Content', 'index', $).getContents(query, {date: -1}, 0, 20, function (contents) {
            $.return(data, contents);
        });
    };
    var iGetNews = function (data) {

    };
    var iGetLetters = function (data) {
        query = {wid: $.ObjectId(data.params._id)};
        query['params.readed.' + data.people.pead] = 1;
            console.log(query);
        $.getModel('Chat', 'index', $).getAllChats(query, {date: 1}, function (chats) {
            console.log(chats);
            $.return(data, chats);
            if(chats.length>0)
                editChats(chats, 0, data.people.pead);
        });
    }
    var editChats = function (chats, i, pead) {
        chats[i].params.readed[pead] = true;
        $.getModel('Chat', 'index', $).editChat($.ObjectId(chats[i]._id), {
            params: chats[i].params
        }, function (doc) {
            i++;
            if(i < chats.length)
                editChats(chats, i, pead);
        });
    };
    var iGetPeople = function (data) {
        if (data.people.class == 1 || data.people.class == 6)
            $.getModel('People', 'index', $).getPeopleId($.ObjectId(data.params._id), function (people) {
                $.return(data, people);
            });
    };
    var iGetStore = function (data) {
        $.getModel('Content', 'index', $).getContents({type: 'spost', flag: data.people.flag, cats: $.ObjectId('59ae34f5a1402508f8c277db'), 'params.mien-phi.detail': 'y'}, {position: 1}, 0, 10, function (fContents) {
            $.getModel('Content', 'index', $).getContents({type: 'spost', flag: data.people.flag, cats: $.ObjectId('59ae34f5a1402508f8c277db'), 'params.mien-phi.detail': 'n'}, {position: 1}, 0, 10, function (pContents) {
                $.return(data, {freeApps: fContents, priceApps: pContents});
            });
        });
    };
    var iSavePeople = function (data) {
        $.getModel('People', 'index', $).getPeopleByEmail(data.params.item.email, function (people) {
            if (people == null)
            {
                pw = Math.floor((Math.random() + 6) * 1000);
                client = new $.postmark.Client($.config.pmtokens);
                console.log($.baseurls(req));
                client.sendEmailWithTemplate({
                    "From": $.config.femail,
                    "To": data.params.item.email,
                    "ReplyTo": $.config.remail,
                    "TemplateId": 10969752,
                    "TemplateModel": {
                        "sitename": $.config.sitename,
                        "text1": $.trans.gettext('Register successfully'),
                        "text2": $.trans.gettext('Hello'),
                        "displayname": ((data.params.item.hasOwnProperty('displayname') && data.params.item.displayname != '') ? data.params.item.displayname : data.params.item.schoolname),
                        "text3": $.trans.gettext('Your account'),
                        "text4": $.trans.gettext('Email'),
                        "email": data.params.item.email,
                        "text5": $.trans.gettext('Password'),
                        "password": pw,
                        "text6": $.trans.gettext('Thanks'),
                        "text7": $.trans.gettext('for your trust and use services of'),
                        "baseurl": $.baseurls(req),
                        "text8": $.trans.gettext('Respect'),
                        "fblink": $.config.fblink,
                        "skin": $.baseurls(req) + $.config.skin,
                        "ttlink": $.config.ttlink,
                        "gglink": $.config.gglink
                    }
                }, function (error, success) {
                    if (error)
                        $.return(data, {status: false, msg: $.trans.gettext('Send mail fail') + ': ' + error.message});
                    else {
                        data.params.item.gender = data.params.item.gender == 'true';
                        data.params.item.active = data.params.item.active == 'true';
                        data.params.item.pead = $.md5(data.params.item.email + pw);
                        data.params.item.pw = $.md5(pw);
                        data.params.item.flag = req.params.lang;
                        data.params.item.date = $.dateTimeObj.getNow();
                        data.params.item.schoolname = null;
                        data.params.item.address = null;
                        data.params.item.phone = null;
                        data.params.item.classes = [];
                        data.params.item.contact = {};
                        data.params.item.birthday = null;
                        data.params.item.friends = [];
                        data.params.item.deco = '';
                        $.getModel('People', 'index', $).addPeople(data.params.item, function (dt) {
                            $.return(data, data.params.item);
                        });
                    }
                });
            } else
            {
                data.params.item.gender = data.params.item.gender == 'true';
                data.params.item.active = data.params.item.active == '1';
                data.params.item._id = $.ObjectId(data.params.item._id);
                $.getModel('People', 'index', $).editPeople(data.params.item, function (dt) {
                    $.return(data, data.params.item);
                });
            }
        });
    };
    var iGetFlag = function (data) {
        $.getModel('Flag', 'index', $).getFlag({id: data.params.id}, function (flags) {
            $.return(data, flags);
        });
    };
    var iChangeFlag = function (data) {
        data.people.flag = data.params.flag;
        $.getModel('People', 'index', $).changeFlag(data.people, function (doc) {
            $.return(data, data.people);
        });
    };
    var iUploadExcel = function (data) {
        query = {type: 'term'};
        (data.people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(data.people._id) : '';
        $.getModel('Content', 'index', $).getAll(query, {date: -1}, {title: 1}, function (oldCats) {
            var workbook = new $.excel.Workbook();
            var content = new Array();
            workbook.xlsx.readFile($.config.filedir + '/' + data.params.name).then(function (dt) {
                for (k = 2; k < dt._worksheets[1]._rows.length; k++) {
                    if (typeof (dt._worksheets[1]._rows[k]._cells[0]._value.model.value) == 'undefined')
                        break;
                    content[k] = {params: {}};
                    content[k].title = dt._worksheets[1]._rows[k]._cells[2]._value.model.value;
                    content[k].except = '';
                    content[k].detail = dt._worksheets[1]._rows[k]._cells[2]._value.model.value;
                    content[k].type = 'post';
                    content[k].keyword = content[k].title.toLowerCase();
                    content[k].live = true;
                    content[k].wid = $.ObjectId(data.people._id);
                    content[k].site = $.config.link;
                    content[k].date = $.dateTimeObj.getNow();
                    if (dt._worksheets[1]._rows[k]._cells[1]._value.model.value != '_') {
                        content[k].params['ma-thuoc'] = {};
                        content[k].params['ma-thuoc'].tool = 'text';
                        content[k].params['ma-thuoc'].title = 'Mã thuốc';
                        content[k].params['ma-thuoc'].detail = dt._worksheets[1]._rows[k]._cells[1]._value.model.value;
                    }
                    content[k].params['gia-ban'] = {};
                    content[k].params['gia-ban'].tool = 'number';
                    content[k].params['gia-ban'].title = 'Giá bán';
                    content[k].params['gia-ban'].detail = dt._worksheets[1]._rows[k]._cells[3]._value.model.value;
                    content[k].params['gia-goc'] = {};
                    content[k].params['gia-goc'].tool = 'number';
                    content[k].params['gia-goc'].title = 'Giá gốc';
                    content[k].params['gia-goc'].detail = dt._worksheets[1]._rows[k]._cells[4]._value.model.value;
                    content[k].params['gia-von'] = {};
                    content[k].params['gia-von'].tool = 'number';
                    content[k].params['gia-von'].title = 'Giá vốn';
                    content[k].params['gia-von'].detail = dt._worksheets[1]._rows[k]._cells[5]._value.model.value;
                    content[k].params['ton-kho'] = {};
                    content[k].params['ton-kho'].tool = 'number';
                    content[k].params['ton-kho'].title = 'Tồn kho';
                    content[k].params['ton-kho'].detail = dt._worksheets[1]._rows[k]._cells[6]._value.model.value;
                    content[k].params['don-vi-tinh'] = {};
                    content[k].params['don-vi-tinh'].tool = 'text';
                    content[k].params['don-vi-tinh'].title = 'Đơn vị tính';
                    content[k].params['don-vi-tinh'].detail = dt._worksheets[1]._rows[k]._cells[7]._value.model.value;
                    content[k].params['han-dung'] = {};
                    content[k].params['han-dung'].tool = 'date';
                    content[k].params['han-dung'].title = 'Hạn dùng';
                    content[k].params['han-dung'].detail = dt._worksheets[1]._rows[k]._cells[10]._value.model.value;
                    if (dt._worksheets[1]._rows[k]._cells[11]._value.model.value != '_') {
                        content[k].params['thue-suat'] = {};
                        content[k].params['thue-suat'].tool = 'number';
                        content[k].params['thue-suat'].title = 'Thuế suất';
                        content[k].params['thue-suat'].detail = dt._worksheets[1]._rows[k]._cells[11]._value.model.value;
                    }
                    content[k].params['chiet-khau'] = {};
                    content[k].params['chiet-khau'].tool = 'number';
                    content[k].params['chiet-khau'].title = 'Chiết khấu';
                    content[k].params['chiet-khau'].detail = dt._worksheets[1]._rows[k]._cells[12]._value.model.value;
                    content[k].params['kiem-tra-het-hang'] = {};
                    content[k].params['kiem-tra-het-hang'].tool = 'number';
                    content[k].params['kiem-tra-het-hang'].title = 'kiểm tra hết hàng';
                    content[k].params['kiem-tra-het-hang'].detail = parseInt(dt._worksheets[1]._rows[k]._cells[6]._value.model.value * 20 / 100);
                    if (dt._worksheets[1]._rows[k]._cells[13]._value.model.value != '_')
                    {
                        content[k].params['quy-doi'] = {};
                        content[k].params['quy-doi'].tool = 'number';
                        content[k].params['quy-doi'].title = 'quy đổi';
                        content[k].params['quy-doi'].detail = dt._worksheets[1]._rows[k]._cells[13]._value.model.value;
                    }
                    if (dt._worksheets[1]._rows[k]._cells[19]._value.model.value != '_')
                    {
                        content[k].params['gia-quy-doi'] = {};
                        content[k].params['gia-quy-doi'].tool = 'number';
                        content[k].params['gia-quy-doi'].title = 'Giá quy đổi';
                        content[k].params['gia-quy-doi'].detail = dt._worksheets[1]._rows[k]._cells[19]._value.model.value;
                    }
                    //Add imgs
                    if (dt._worksheets[1]._rows[k]._cells[8]._value.model.value != '_') {
                        imgs = (typeof (dt._worksheets[1]._rows[k]._cells[8]._value.model.value) != 'undefined') ? dt._worksheets[1]._rows[k]._cells[8]._value.model.value.split(",") : [];
                        if (imgs.length > 0) {
                            content[k].imgs = new Array();
                            content[k].imgs[0] = {};
                            $.each(imgs, function (k2, v2) {
                                if (v2 != '')
                                    content[k].imgs[0][k2] = v2;
                            });
                        }//End add imgs
                    }
                    //add term
                    cats = dt._worksheets[1]._rows[k]._cells[0]._value.model.value.split("/");
                    $.each(cats, function (k2, v2) {
                        term = {};
                        term.cats = new Array();
                        if (typeof (content[k]) != 'undefined')
                            content[k].cats = $.done(content[k].cats, new Array());
                        else
                            content[k] = {cats: new Array()};
                        content[k].cats.push($.ObjectId('596cc23fb945c117fc41dc3d'));
                        term.title = v2;
                        term.except = '';
                        term.type = 'term';
                        term.keyword = v2.toLowerCase();
                        term.live = true;
                        term.wid = $.ObjectId(data.people._id);
                        term.site = $.config.link;
                        term.date = $.dateTimeObj.getNow();
                        term.position = k2;
                        $.each(data.flags, function (index, value) {
                            term.flag = value.id;
                            if (index < 1)
                                getPath($.createSlug(v2), {params: {loops: -1, slugTemp: 2, k: k, v2: v2, c: content, t: term, end: dt._worksheets[1]._rows[parseInt(k) + 1]._cells[0]._value.model.value}, fn: function (slug, params) {
                                        params.t.path = slug;
                                        exitst = false;
                                        $.each(oldCats, function (k3, v3) {
                                            if (v3.title == params.v2) {
                                                exitst = true;
                                                params.c[params.k].cats.push($.ObjectId(v3._id));
                                            }
                                            if ($.done(cats[k2 - 1], 'title') == v3.title)
                                                params.t.cats.push($.ObjectId(v3._id));
                                        });
                                        if (exitst == false) {
                                            if (k2 == 0)
                                                params.t.cats.push($.ObjectId('596cc23fb945c117fc41dc3d'));
                                            $.getModel('Content', 'index', $).addContent(params.t, function (dt) {
                                                params.c[params.k].cats.push($.ObjectId(dt));
                                                oldCats.push({title: params.v2, _id: dt});
                                            });
                                        }
                                        if (typeof (params.end) == 'undefined' && cats.length == k2 + 1)
                                        {
                                            query = {type: 'post'};
                                            (data.people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(data.people._id) : '';
                                            $.getModel('Content', 'index', $).getAll(query, {date: -1}, {title: 1}, function (oldPosts) {
                                                for (temp = 2; temp < params.c.length; temp++)
                                                {
                                                    exPost = false;
                                                    $.each(oldPosts, function (o, p) {
                                                        if (params.c[temp].title == p.title)
                                                            exPost = true;
                                                    });
                                                    if (exPost == false)
                                                        $.each(data.flags, function (index, value) {
                                                            params.c[temp].flag = value.id;
                                                            if (index < 1)
                                                                getPath($.createSlug(params.c[temp].title), {params: {loops: -1, slugTemp: 2, c: params.c, temp: temp}, fn: function (slug, params) {
                                                                        params.c[params.temp].path = slug;
                                                                        $.getModel('Content', 'index', $).addContent(params.c[params.temp], function (dt) { });
                                                                    }});
                                                            else
                                                                $.getModel('Content', 'index', $).addContent(params.c[temp], function (dt) { });
                                                        });
                                                }
                                                if (temp == params.c.length)
                                                    $.return(data, true);
                                            });
                                        }
                                    }});
                            else {
                                $.getModel('Content', 'index', $).addContent(term, function (dt) {
                                    content[k].cats.push($.ObjectId(dt._id));
                                    if (typeof (dt._worksheets[1]._rows[k]._cells[0]._value.model.value) == 'undefined') {
                                        query = {type: 'post'};
                                        (data.people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(data.people._id) : '';
                                        $.getModel('Content', 'index', $).getAll(query, {date: -1}, {title: 1}, function (oldPosts) {
                                            for (temp = 2; temp < content.length - 1; temp++) {
                                                exPost = false;
                                                $.each(oldPosts, function (o, p) {
                                                    if (content[temp].title == p.title)
                                                        exPost = true;
                                                });
                                                if (exPost == false)
                                                    $.each(data.flags, function (index, value) {
                                                        content[temp].flag = value.id;
                                                        if (index < 1)
                                                            getPath($.createSlug(content[temp].title), {
                                                                params: {loops: -1, slugTemp: 2, c: content, temp: temp}, fn: function (slug, params) {
                                                                    params.c[params.temp].path = slug;
                                                                    $.getModel('Content', 'index', $).addContent(params.c[params.temp], function (dt) { });
                                                                }
                                                            });
                                                        else
                                                            $.getModel('Content', 'index', $).addContent(content[temp], function (dt) { });
                                                    });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });//end add term
                    //add factory
                    if (dt._worksheets[1]._rows[k]._cells[9]._value.model.value != '_')
                    {
                        factory = {};
                        factory.cats = new Array();
                        if (typeof (content[k]) != 'undefined')
                            content[k].cats = $.done(content[k].cats, new Array());
                        else
                            content[k] = {cats: new Array()};
                        content[k].cats.push($.ObjectId('596cc25ab945c117fc41dc3e'));
                        factory.cats.push($.ObjectId('596cc25ab945c117fc41dc3e'));
                        factory.title = dt._worksheets[1]._rows[k]._cells[9]._value.model.value;
                        factory.except = '';
                        factory.keyword = dt._worksheets[1]._rows[k]._cells[9]._value.model.value.toLowerCase();
                        factory.type = 'term';
                        factory.live = true;
                        factory.wid = $.ObjectId(data.people._id);
                        factory.site = $.config.link;
                        factory.date = $.dateTimeObj.getNow();
                        $.each(data.flags, function (index, value) {
                            factory.flag = value.id;
                            if (index < 1)
                                getPath($.createSlug(dt._worksheets[1]._rows[k]._cells[9]._value.model.value), {
                                    params: {loops: -1, slugTemp: 2, f: factory, v2: dt._worksheets[1]._rows[k]._cells[9]._value.model.value, cats: content[k].cats}, fn: function (slug, params) {
                                        params.f.path = slug;
                                        exitst = false;
                                        $.each(oldCats, function (k3, v3) {
                                            if (v3.title == params.v2) {
                                                exitst = true;
                                                params.cats.push($.ObjectId(v3._id));
                                            }
                                            if (params.v2 == v3.title)
                                                params.f.cats.push($.ObjectId(v3._id));
                                        });
                                        if (exitst == false) {
                                            $.getModel('Content', 'index', $).addContent(params.f, function (dt) {
                                                params.cats.push($.ObjectId(dt._id));
                                                oldCats.push({title: params.v2, _id: dt._id});
                                            });
                                        }//end add factory
                                    }
                                });
                            else
                                $.getModel('Content', 'index', $).addContent(factory, function (dt) {
                                    content[k].cats.push($.ObjectId(dt._id));
                                });
                        });
                    }
                    //add MadeIn
                    if (dt._worksheets[1]._rows[k]._cells[18]._value.model.value != '_')
                    {
                        madeIn = {};
                        madeIn.cats = new Array();
                        if (typeof (content[k]) != 'undefined')
                            content[k].cats = $.done(content[k].cats, new Array());
                        else
                            content[k] = {cats: new Array()};
                        content[k].cats.push($.ObjectId('599ae9159f3c782978601c80'));
                        madeIn.cats.push($.ObjectId('599ae9159f3c782978601c80'));
                        madeIn.title = dt._worksheets[1]._rows[k]._cells[18]._value.model.value;
                        madeIn.except = '';
                        madeIn.keyword = dt._worksheets[1]._rows[k]._cells[18]._value.model.value.toLowerCase();
                        madeIn.type = 'term';
                        madeIn.live = true;
                        madeIn.wid = $.ObjectId(data.people._id);
                        madeIn.site = $.config.link;
                        madeIn.date = $.dateTimeObj.getNow();
                        $.each(data.flags, function (index, value) {
                            madeIn.flag = value.id;
                            if (index < 1)
                                getPath($.createSlug(dt._worksheets[1]._rows[k]._cells[18]._value.model.value), {params: {loops: -1, slugTemp: 2, f: madeIn, v2: dt._worksheets[1]._rows[k]._cells[18]._value.model.value, cats: content[k].cats}, fn: function (slug, params) {
                                        params.f.path = slug;
                                        exitst = false;
                                        $.each(oldCats, function (k3, v3) {
                                            if (v3.title == params.v2) {
                                                exitst = true;
                                                params.cats.push($.ObjectId(v3._id));
                                            }
                                            if (params.v2 == v3.title)
                                                params.f.cats.push($.ObjectId(v3._id));
                                        });
                                        if (exitst == false) {
                                            $.getModel('Content', 'index', $).addContent(params.f, function (dt) {
                                                params.cats.push($.ObjectId(dt._id));
                                                oldCats.push({title: params.v2, _id: dt._id});
                                            });
                                        }//end add madeIn
                                    }});
                            else
                                $.getModel('Content', 'index', $).addContent(madeIn, function (dt) {
                                    content[k].cats.push($.ObjectId(dt._id));
                                });
                        });
                    }
                }
            });
        });
    };
    var getPath = function (slug, callback) {
        $.getModel('Content', 'index', $).getContentPath(slug, function (content) {
            callback.params.loops++;
            callback.params.content = content;
            if (content != null)
            {
                content.path = $.createSlug(callback.params.content.title) + '-' + String(callback.params.slugTemp + callback.params.loops);
                getPath(content.path, {params: callback.params, fn: callback.fn});
            } else
                callback.fn(slug, callback.params);
        });
    };
    var index = function () {
        if (req.params._id != undefined)
            $.getModel('People', 'index', $).getPeopleId($.ObjectId(req.params._id), function (people) {
                if ($.isEmptyObject(people))
                    res.redirect($.baseurls(req) + '/admin/' + $.done(req.params.lang, 'vi') + '/people/login');
                else {
                    $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
                        id: 1,
                        name: 1,
                        image: 1
                    }, function (flags) {
                        query = {type: 'feature', flag: people.flag};
                        (people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(people._id) : '';
                        $.getModel('Content', 'index', $).getParams(query, {date: 1}, function (features) {
                            query = {cats: $.ObjectId('596cc23fb945c117fc41dc3d'), type: 'post'};
                            (people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(people._id) : '';
                            $.getModel('Content', 'index', $).getAll(query, {date: -1}, {title: 1, params: 1}, function (contents) {
                                res.render('Admin/View/Layout/index', {
                                    $: $,
                                    req: req,
                                    res: res,
                                    template: 'dashboard',
                                    page: 'dashboard',
                                    title: $.trans.gettext('Dashboard'),
                                    path: 'admin/' + $.done(req.params.lang, 'vi'),
                                    flags: flags,
                                    features: features,
                                    report: contents,
                                    wid: people._id
                                });
                            });
                        });
                    });
                }
            });
        else
        {
            res.render('Admin/View/Layout/index', {
                $: $,
                req: req,
                res: res,
                template: 'dashboard',
                page: 'dashboard',
                title: $.trans.gettext('Dashboard'),
                path: 'admin/' + $.done(req.params.lang, 'vi'),
                flags: [],
                features: [],
                report: [],
                wid: ''
            });
        }
    };
    var dashbrowser = function ()
    {
        $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
            id: 1,
            name: 1,
            image: 1
        }, function (flags) {
            res.render('Admin/View/Layout/trangers', {
                $: $,
                req: req,
                res: res,
                template: 'dashbrowser',
                page: 'dashbrowser',
                title: $.trans.gettext('Browser dashboard'),
                path: 'dashbrowser/' + $.done(req.params.lang, 'vi'),
                flags: flags
            });
        });
    };
    var dashapp = function ()
    {
        if (req.params._id != undefined)
            $.getModel('People', 'index', $).getPeopleId($.ObjectId(req.params._id), function (people) {
                if ($.isEmptyObject(people))
                    res.redirect($.baseurls(req) + '/dashapp');
                else {
                    $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
                        id: 1,
                        name: 1,
                        image: 1
                    }, function (flags) {
                        query = {type: 'feature', flag: people.flag};
                        (people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(people._id) : '';
                        $.getModel('Content', 'index', $).getParams(query, {date: 1}, function (features) {
                            query = {cats: $.ObjectId('596cc23fb945c117fc41dc3d'), type: 'post'};
                            (people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(people._id) : '';
                            $.getModel('Content', 'index', $).getAll(query, {date: -1}, {title: 1, params: 1}, function (contents) {
                                res.render('Admin/View/Layout/app', {
                                    $: $,
                                    req: req,
                                    res: res,
                                    template: 'dashapp',
                                    page: 'dashapp',
                                    title: $.trans.gettext('App dashboard'),
                                    path: '',
                                    flags: flags,
                                    features: features,
                                    report: contents,
                                    wid: people._id,
                                    now: $.dateTimeObj.getFormatNowArr()
                                });
                            });
                        });
                    });
                }
            });
        else
        {
            people = {};
            $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
                id: 1,
                name: 1,
                image: 1
            }, function (flags) {
                query = {type: 'feature', flag: people.flag};
                (people._id != undefined && people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(people._id) : '';
                $.getModel('Content', 'index', $).getParams(query, {date: 1}, function (features) {
                    query = {cats: $.ObjectId('596cc23fb945c117fc41dc3d'), type: 'post'};
                    (people._id != undefined && people._id != "58a93ae9e07dcb00045808d6") ? query['wid'] = $.ObjectId(people._id) : '';
                    $.getModel('Content', 'index', $).getAll(query, {date: -1}, {title: 1, params: 1}, function (contents) {
                        res.render('Admin/View/Layout/app', {
                            $: $,
                            req: req,
                            res: res,
                            template: 'dashapp',
                            page: 'dashapp',
                            title: $.trans.gettext('App dashboard'),
                            path: '',
                            flags: flags,
                            features: features,
                            report: contents,
                            wid: '',
                            now: $.dateTimeObj.getFormatNowArr()
                        });
                    });
                });
            });
        }
    };
    var wapp = function ()
    {
        res.render('Admin/View/Layout/wapp', {
            $: $,
            req: req,
            res: res,
            page: 'wapp',
            title: $.trans.gettext('App'),
            slug: '/wapp',
            features: [],
            chats: [],
        });
    };
    var iGetFormatNowArr = function (data) {
        $.return(data, $.dateTimeObj.getFormatNowArr());
        $.infoIp[data.ip] = {
            agent: data.params.agent
        };
    };
    var browserlogin = function ()
    {
        $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
            id: 1,
            name: 1,
            image: 1
        }, function (flags) {
            res.render('Admin/View/Layout/trangers', {
                $: $,
                req: req,
                res: res,
                template: 'browserlogin',
                page: 'browserlogin',
                title: $.trans.gettext('Browser login'),
                path: 'browserlogin/' + $.done(req.params.lang, 'vi'),
                flags: flags
            });
        });
    };
    var trangers = function ()
    {
        $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
            id: 1,
            name: 1,
            image: 1
        }, function (flags) {
            res.render('Admin/View/Layout/trangers', {
                $: $,
                req: req,
                res: res,
                template: 'trangers',
                page: 'trangers',
                title: $.trans.gettext('Url or search'),
                path: 'trangers/' + $.done(req.params.lang, 'vi'),
                flags: flags
            });
        });
    };
    var camera = function () {
        $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
            id: 1,
            name: 1,
            image: 1
        }, function (flags) {
            res.render('Admin/View/Layout/camera', {
                $: $,
                req: req,
                res: res,
                template: 'camera',
                page: 'camera',
                title: $.trans.gettext('Camera'),
                slug: '/admin/' + $.done(req.params.lang, 'vi') + '/camera',
                flags: flags
            });
        });
    };
    var recording = function () {
        $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
            id: 1,
            name: 1,
            image: 1
        }, function (flags) {
            res.render('Admin/View/Layout/camera', {
                $: $,
                req: req,
                res: res,
                template: 'recording',
                page: 'recording',
                title: $.trans.gettext('recording'),
                slug: '/admin/' + $.done(req.params.lang, 'vi') + '/recording',
                flags: flags
            });
        });
    };
    var browsers = function () {
        if (!$.isEmptyObject($.people))
            res.redirect($.people.parameters.apad);
        else
            res.redirect("https://www.wsup3.cf/trangers/en");
    };
    var login = function () {
        $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
            id: 1,
            name: 1,
            image: 1
        }, function (flags) {
            $.people = {};
            if (!$.isEmptyObject(req.query) == true)
                $.getModel('People', 'index', $).getPeopleByEmail(req.query.email, function (people) {
                    if ($.md5(people.active) == req.query.active) {
                        $.getModel('People', 'index', $).active(people, function (dt) {
                            msg = $.trans.gettext('New password has activated');
                            res.render('Admin/View/Layout/index', {
                                $: $,
                                req: req,
                                res: res,
                                template: 'people',
                                page: 'login',
                                title: $.trans.gettext('Login'),
                                path: '/admin/' + $.done(req.params.lang, 'vi') + '/people/login',
                                flags: flags,
                                features: {},
                                chats: {},
                                wid: '',
                                msg: msg
                            });
                        });
                    }
                });
            else
                res.render('Admin/View/Layout/index', {
                    $: $,
                    req: req,
                    res: res,
                    template: 'people',
                    page: 'login',
                    title: $.trans.gettext('Login'),
                    path: '/admin/' + $.done(req.params.lang, 'vi') + '/people/login',
                    flags: flags,
                    features: {},
                    chats: {},
                    wid: ''
                });
        });
    };
    var forgot = function () {
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'forgot';
                $.title = $.trans.gettext('Forgot') + ' - ' + $.config.sitename;
                $.template = 'forgot';
                res.render('People/View/Layout/account', {$: $});
            });
        });
    };
    var peopleLogin = function () {
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'login';
                $.title = $.trans.gettext('Login') + ' - ' + $.config.sitename;
                $.template = 'login';
                res.render('People/View/Layout/account', {$: $});
            });
        });
    };
    var peopleRegister = function () {
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'register';
                $.title = $.trans.gettext('Register') + ' - ' + $.config.sitename;
                $.template = 'register';
                res.render('People/View/Layout/account', {$: $});
            });
        });
    };
    var history = function () {
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'history';
                $.title = 'Lịch sử thanh toán' + ' - ' + $.config.sitename;
                $.template = 'history';
                res.render('People/View/Layout/index', {$: $});
            });
        });
    };
    var active = function () {
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'active';
                $.title = 'Kích hoạt khóa học' + ' - ' + $.config.sitename;
                $.template = 'active';
                res.render('People/View/Layout/index', {$: $});
            });
        });
    };
    var iGetPeoples = function (data) {
        $.getModel('People', 'index', $).getAll({class: {$in: [1, 4]}}, {displayname: 1, schoolname: 1}, function (peoples) {
            $.return(data, peoples);
        });
    };
    var iGetCustomers = function (data) {
        $.getModel('People', 'index', $).getAll({class: 2}, {displayname: 1, schoolname: 1}, function (peoples) {
            $.return(data, peoples);
        });
    };
    var iLogin = function (data) {
        $.getModel('People', 'index', $).getPeopleLogin(data.params.email, $.md5(data.params.password), function (people) {
            if ($.isEmptyObject(people))
                $.return(data, null);
            else {
                if ($.baseurls(req) == 'http://localhost')
                    $.people = people;
                if (data.page == 'browsers')
                    $.return(data, {path: people.parameters.apad});
                else
                    $.getModel('Flag', 'index', $).getAll({flag: people.flag, active: true}, {
                        id: 1,
                        name: 1,
                        image: 1
                    }, function (flags) {
                        switch (data.page)
                        {
                            case 'login':
                                $.return(data, {people: people, flags: flags, path: $.baseurls(req) + '/classes?id=' + people._id});
                                break;
                            case 'dashapp':
                                $.return(data, {people: people, flags: flags, path: '/dashapp'});
                                break;
                            default:
                                $.return(data, {people: people, flags: flags, path: '/dashboard'});
                                break;
                        }
                    });
            }
        });
    };
    var iRegister = function (data) {
        $.folow($, data.ip);
        if ($.com[data.ip].doAction == true) {
            $.getModel('People', 'index', $).getPeopleByEmail(data.params.email, function (people) {
                if ($.isEmptyObject(people)) {
                    client = new $.postmark.Client($.config.pmtokens);
                    client.sendEmailWithTemplate({
                        "From": $.config.femail,
                        "To": data.params.email,
                        "ReplyTo": $.config.remail,
                        "TemplateId": 10969752,
                        "TemplateModel": {
                            "sitename": $.config.sitename,
                            "text1": $.trans.gettext('Register successfully'),
                            "text2": $.trans.gettext('Hello'),
                            "displayname": data.params.displayname,
                            "text3": $.trans.gettext('Your account'),
                            "text4": $.trans.gettext('Email'),
                            "email": data.params.email,
                            "text5": $.trans.gettext('Password'),
                            "password": data.params.password,
                            "text6": $.trans.gettext('Thanks'),
                            "text7": $.trans.gettext('for your trust and use services of'),
                            "baseurl": $.baseurls(req),
                            "text8": $.trans.gettext('Respect'),
                            "fblink": $.config.fblink,
                            "skin": $.baseurls(req) + $.config.skin,
                            "ttlink": $.config.ttlink,
                            "gglink": $.config.gglink
                        }
                    }, function (error, success) {
                        if (error)
                            $.return(data, {status: false, msg: $.trans.gettext('Send mail fail') + ': ' + error.message});
                        else {
                            $.getModel('People', 'index', $).getLastPeople({}, function (laster) {
                                $.getModel('People', 'index', $).addPeople({
                                    email: data.params.email,
                                    pw: $.md5(data.params.password),
                                    displayname: data.params.displayname,
                                    schoolname: '',
                                    gender: false,
                                    address: '',
                                    phone: '',
                                    image: '',
                                    class: 5,
                                    classes: [],
                                    active: '1',
                                    contact: {},
                                    flag: 'vi',
                                    parameters: [],
                                    date: new Date($.dateTimeObj.getNow()),
                                    birthday: null,
                                    friends: [],
                                    pead: $.md5(data.params.email + data.params.password),
                                    ix: parseInt(laster[0].ix) + 1,
                                }, function (dt) {
                                    console.log(dt);
                                    $.getModel('Coin', 'index', $).addCoin({
                                        had: {},
                                        wid: $.ObjectId(dt._id),
                                        coin: 20000,
                                        shared: 20,
                                        getedFree: $.dateTimeObj.getDateNow(),
                                        date: new Date($.dateTimeObj.getNow())
                                    }, function (cdt) {
                                        $.return(data, {status: true, msg: $.trans.gettext('Register successfully')});
                                    });
                                });
                            });
                        }
                    });
                } else
                    $.return(data, {status: false, msg: $.trans.gettext('Email already exists')});
            });
        }
    };
    var iAddHistories = function (data) {
        $.getModel('People', 'history', $).addHistory({
            name: data.name,
            histories: data.history,
            date: $.dateTimeObj.getNow()
        }, function (dt) { });
    };
    var iForgot = function (data) {
        $.getModel('People', 'index', $).getPeopleByEmail(data.params.email, function (people) {
            if ($.isEmptyObject(people))
                $.return(data, $.trans.gettext('Email address not registered'));
            else {
                var usr = people;
                usr.active = Math.floor((Math.random() + 6) * 1000);
                client = new $.postmark.Client($.config.pmtokens);
                client.sendEmailWithTemplate({
                    "From": $.config.femail,
                    "To": people.email,
                    "ReplyTo": $.config.remail,
                    "TemplateId": 10988146,
                    "TemplateModel": {
                        "baseurl": $.baseurls(req),
                        "sitename": $.config.sitename,
                        "text1": $.trans.gettext('Account infomation'),
                        "text2": $.trans.gettext('Hello'),
                        "displayname": people.displayname,
                        "text3": $.trans.gettext('Your account'),
                        "text4": $.trans.gettext('Email'),
                        "email": people.email,
                        "text5": $.trans.gettext('Password'),
                        "password": usr.active,
                        "text6": $.trans.gettext('To use new password you need to'),
                        "lang": usr.flag,
                        "active": $.md5(usr.active),
                        "text7": $.trans.gettext('click here'),
                        "text8": $.trans.gettext('Thanks'),
                        "text9": $.trans.gettext('for your trust and use services of'),
                        "text10": $.trans.gettext('Respect'),
                        "fblink": $.config.fblink,
                        "skin": $.baseurls(req) + $.config.skin,
                        "ttlink": $.config.ttlink,
                        "gglink": $.config.gglink
                    }
                }, function (error, success) {
                    if (error)
                        $.return(data, $.trans.gettext('Send mail fail') + ': ' + error.message);
                    else {
                        $.getModel('People', 'index', $).changeActive(usr, function (flags) {
                            client = undefined;
                            $.return(data, $.trans.gettext('Account info has been sent to your email'));
                        });
                    }
                });
            }
        });
    };
    var iGetFlags = function (data) {
        $.getModel('Flag', 'index', $).getFlags({site: (($.isOf == false) ? $.config.link : $.baseurls(req)), flag: req.params.lang, active: true}, {position: 1}, 0, 20, function (flags) {
            $.return(data, flags);
        });
    };
    var iBrowsers = function (data) {
        $.people = data.params.people;
        $.return(data, $.people);
    };
    var iActive = function (data) {
        $.getModel('People', 'index', $).getGroups({'groups.0': {$exists: true}}, function (peoples) {
            $.getModel('People', 'index', $).getPeopleByEmail(data.people.email, function (people) {
                $.each(people.groups[0], function (k, v) {
                    if (people.groups[0][v._id].code == data.params.code)
                        people.groups[0][v._id].status = 1;
                    count = 1;
                    $.each(peoples, function (k2, v2) {
                        var groups = $.done(v2.groups[0], v2.groups);
                        $.each(groups, function (k3, v3) {
                            if (k3 == v._id && v3.status == 1)
                                count++;
                        });
                    });
                    $.getModel('Content', 'index', $).getContentId(v._id, function (doc) {
                        if (doc.params.hasOwnProperty(0)) {
                            var params = doc.params[0];
                            doc.params = params;
                            doc.params.buys = {detail: count};
                            $.getModel('Content', 'index', $).editContent(doc, function (people) { });
                        } else {
                            doc.params.buys = {detail: count};
                            $.getModel('Content', 'index', $).editContent(doc, function (people) { });
                        }
                        $.getModel('People', 'index', $).editPeople(people, function (people) {
                            people = $.sercurityGroups(people);
                            $.return(data, people);
                        });
                    });
                });
            });
        });
    };
    var iGetHistory = function (data) {
        ids = new Array(), xids = new Array();
        $.getModel('People', 'index', $).getGroups({_id: $.mongoose(data.people._id)}, function (peoples) {
            var classs = $.done(peoples[0].groups[0], peoples[0].groups);
            if (Object.keys(groups).length > 0)
                $.each(groups, function (index, value) {
                    if (ids.length > 0) {
                        temp = true;
                        $.each(ids, function (k2, v2) {
                            if (index == v2)
                                temp = false;
                        });
                        if (temp == true && value.status == data.params.status)
                            ids.push($.mongoose(index));
                        else
                            xids.push($.mongoose(index));
                    } else
                    if (value.status == data.params.status)
                        ids.push($.mongoose(index));
                    else
                        xids.push($.mongoose(index));
                });
            $.each(groups, function (index, value) {
                $.each(xids, function (k, v) {
                    delete groups[v];
                });
            });
            $.getModel('People', 'index', $).getGroups({'classes.0': {$exists: true}}, function (docs) {
                $.groups = docs;
                postNum = 12;
                $.getModel('Content', 'index', $).getContentPages({_id: {$in: ids}, flag: data.people.flag, type: 'post'}, {date: 1}, postNum * (data.params.page - 1), postNum, {title: 1, except: 1, path: 1, imgs: 1, params: 1, 'people.schoolname': 1}, function (contents) {
                    $.getModel('Content', 'index', $).getAll({_id: {$in: ids}, flag: data.people.flag, type: 'post'}, {_id: 1}, function (total) {
                        contents = $.sercurityParams(contents);
                        $.groups = $.sercurityAllGroups($.groups);
                        if (typeof (groups) != 'undefined')
                            $.each(groups, function (k3, v3) {
                                delete groups[k3].code;
                            });
                        $.return(data, {courses: contents, groups: $.groups, myGroups: groups, totalPages: Math.ceil(total.length / postNum)});
                    });
                });
            });
        });
    };
    var iDeleteFile = function (data) {
        multimedia = '';
        $.webGet($, data.params.site + '/vi/media/delMedia?&mediaid=' + data.params.id, function (dt) {
            multimedia += dt;
        }, function () {
            $.getModel('File', 'index', $).delFileMediaid($.ObjectId(data.params.id), function (dt) {
                $.return(data, {status: true});
            });
        });
    };

    var format = function () {
        eachGet(0, function () {
            res.end('ok');
        });
    };
    var eachGet = function (skip, cb) {
        if (skip <= 4900) {
            console.log(skip);
            $.getModel('Content', 'index', $).getContents({}, {}, skip, 20, function (contents) {
                eachEdit(contents, 0, function () {
                    skip = skip + 19;
                    eachGet(skip, cb);
                });
            });
        } else
            cb();
    };
    var eachEdit = function (contents, index, cb) {
        if (index < contents.length) {
            //console.log(contents[index]);
            if (contents[index].imgs == null)
            {
                contents[index].imgs = {};
                idTemp = contents[index]._id;
                delete contents[index]._id;
                $.getModel('Content', 'index', $).editContentId($.ObjectId(idTemp), contents[index], function (dt3) {
                    index++;
                    eachEdit(contents, index, cb);
                });
            } else
            {
                index++;
                eachEdit(contents, index, cb);
            }
        } else
            cb();
    };
    return {
        iSaveContent: iSaveContent,
        iWriteGN: iWriteGN,
        iGetContent: iGetContent,
        iChangePw: iChangePw,
        iGetMores: iGetMores,
        iGetTerms: iGetTerms,
        iCreateListMusic: iCreateListMusic,
        createFiles: createFiles,
        iDelContent: iDelContent,
        iDelOrder: iDelOrder,
        iDelProduct: iDelProduct,
        iDelContact: iDelContact,
        iDelSub: iDelSub,
        iDelPeople: iDelPeople,
        iAddFr: iAddFr,
        iDelFr: iDelFr,
        wTranfer: wTranfer,
        wTalk: wTalk,
        iReaded: iReaded,
        wAccessScreen: function (data) {
            $.returns(data, {type: 'accessScreen', index: data.params.index});
        },
        wAccessScreens: function (data) {
            $.returns(data, {type: 'accessScreens', index: data.params.index});
        },
        wAccessUpdate: function (data) {
            $.returns(data, {type: 'accessUpdate', index: data.params.index});
        },
        wDone: function (data) {
            $.returns(data, {type: 'done'});
        },
        wpVarAppid: function (data) {
            $.returnsp(data, {type: 'varAppid', id: data.params.id});
        },
        wpBacksBrowser: function (data) {
            $.returnsp(data, {type: 'backsBrowser'});
        },
        wpReloadsBrowser: function (data) {
            $.returnsp(data, {type: 'reloadsBrowser'});
        },
        wpForwardsBrowser: function (data) {
            $.returnsp(data, {type: 'forwardsBrowser'});
        },
        wpResizesContent: function (data) {
            $.returnsp(data, {type: 'resizesContent'});
        },
        wpBrowsers: function (data) {
            $.returnsp(data, {type: 'browsers', url: data.params.url});
        },
        wpLessContent: function (data) {
            $.returnsp(data, {type: 'lessContent'});
        },
        wpActivated: function (data) {
            $.returnsp(data, {type: 'activated'});
        },
        iCheckBrowser: function (data) {
            $.infoIp[data.ip] = {agent: (($.infoIp[data.ip] != undefined)? $.infoIp[data.ip].agent: '')};
            if (data.params.agent.indexOf("Android") == -1 && data.params.agent.indexOf("like Mac") == -1 && $.infoIp[data.ip].agent != data.params.agent)
                $.return(data, true);
            else
                $.return(data, false);
        },
        iChangeLive: iChangeLive,
        iDeleteImg: iDeleteImg,
        iSaveFlag: iSaveFlag,
        iGetFeatures: iGetFeatures,
        iGetNews: iGetNews,
        iGetLetters: iGetLetters,
        iGetPeople: iGetPeople,
        iGetStore: iGetStore,
        iSavePeople: iSavePeople,
        iGetFlag: iGetFlag,
        iUploadExcel: iUploadExcel,
        iChangeFlag: iChangeFlag,
        index: index,
        dashbrowser: dashbrowser,
        dashapp: dashapp,
        iGetAppData: function (data) {
            chats = {wid: {$ne: $.ObjectId(data.people._id)}};
            chats['params.readed.' + data.people.pead] = 1;
            $.getModel('Chat', 'index', $).getChatsGroup(chats, {date: 1}, function (chats) {
                $.return(data, {chats: chats});
            });
        },
        wapp: wapp,
        iGetFormatNowArr: iGetFormatNowArr,
        browserlogin: browserlogin,
        trangers: trangers,
        camera: camera,
        recording: recording,
        browsers: browsers,
        login: login,
        forgot: forgot,
        peopleLogin: peopleLogin,
        peopleRegister: peopleRegister,
        history: history,
        active: active,
        iLogin: iLogin,
        iForgot: iForgot,
        iGetFlags: iGetFlags,
        iRegister: iRegister,
        iBrowsers: iBrowsers,
        iAddHistories: iAddHistories,
        iActive: iActive,
        iGetPeoples: iGetPeoples,
        iGetCustomers: iGetCustomers,
        iGetHistory: iGetHistory,
        iDeleteFile: iDeleteFile,
        format: format
    };
};