exports.controller = function($, req, res){
    var iGetAvailable = function(data){
        $.getModel('Content', 'index', $).getAll({ cats: $.ObjectId('596cc23fb945c117fc41dc3d'), type: 'post' }, { date: -1 }, { title: 1, params: 1 }, function (contents) {
            $.return(data, contents);
        });
    };
    var iGetAllPro = function(data){
        $.getModel('Content', 'index', $).getAll({ cats: $.ObjectId('596cc23fb945c117fc41dc3d'), type: 'post' }, { date: -1 }, { title: 1, group: 1, params: 1 }, function (contents) {
            $.return(data, contents);
        });
    };
    var iGetMusicPage = function(data){
        $.getModel('File', 'index', $).getAllAdv({type: 'audio', live: true}, {date: -1, name: 1}, {
            name: 1,
            mediaid: 1,
            live: 1,
            params: 1,
            user: 1,
            dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}},
            date: 1
        }, function (result) {
            result.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
            $.each(result, function (m, n) {
                result[m].name = n.name.substring(0, n.name.indexOf(".mp3"));
                if (m == 0)
                    result[m].space = 0;
                else
                    result[m].space = result[m - 1].params.duration + result[m - 1].space;
            });
            $.return(data, result);
        });
    };
    var index = function () {
        $.getModel('Content', 'index', $).getContentPath(req.params.path, function (docs) {
            if(docs!=null)
            {
                content = docs;
                switch(content.type)
                {
                    case 'post':
                        switch(String(content.cats[0]))
                        {
                            case '59b177570fb8752ea82954b2'://Giao diện
                                res.render('Content/View/Layout/themes', {
                                    $: $,
                                    req: req,
                                    res: res,
                                    page: 'theme',
                                    slug: req.params.path,
                                    path: $.baseurls(req) + '/' + req.params.path,
                                    template: 'post-themes',
                                    content: content
                                });
                                break;
                            case '62496f11e9979707cc4d81d4'://class
                                checkid($, req, res, function(){
                                    $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
                                        id: 1,
                                        name: 1,
                                        image: 1
                                    }, function (flags) {
                                        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(req.query.id), function (watts) {
                                            res.render('Content/View/Layout/game', {
                                                $: $,
                                                req: req,
                                                res: res,
                                                page: 'class',
                                                path: $.baseurls(req)+'/'+req.params.path,
                                                template: (typeof(content.params)!='undefined')? ((typeof(content.params.mau)!='undefined')? content.params.mau.detail: 'post-class'): 'post-class',
                                                content: content,
                                                flags: flags,
                                                watts: watts
                                            });
                                        });
                                    });
                                });
                                break;
                            default:
                                $.getModel('Content', 'index', $).editContent({
                                    _id: $.ObjectId(content._id),
                                    postid: content.postid,
                                    site: content.site,
                                    type: content.type,
                                    title: content.title,
                                    except: content.except,
                                    detail: content.detail,
                                    position: content.position,
                                    cats: content.cats,
                                    imgs: content.imgs,
                                    params: content.params,
                                    path: content.path,
                                    keyword: content.keyword,
                                    live: content.live,
                                    flag: content.flag,
                                    views: parseInt($.done(content.views, 0)) + 1,
                                    wid: $.ObjectId(content.wid),
                                    date: new Date(content.date)
                                }, function () {
                                    $.getModel('Content', 'index', $).getAll({type: 'term', cats: $.ObjectId('59b3ed8cce8fe51478318ffc')}, {date: 1}, {title: 1, path: 1}, function (docs) {
                                        terms = docs;
                                        switch (String(content.cats[0])) {
                                            case '59b3ed8cce8fe51478318ffc'://Tin tức
                                                $.getModel('Content', 'index', $).getContents({ type: 'post', _id: { $ne: $.ObjectId(content._id) }, cats: $.ObjectId(content.cats[1]) }, { date: -1 }, 0, 5, function (docs) {
                                                    var post = '';
                                                    $.webGet($, (($.isOf == false) ? $.config.link : $.baseurls(req)) + '/vi/content/getPost?&contentid=' + content._id, function (dt) {
                                                        post += dt;
                                                    }, function () {
                                                        res.render('Content/View/Layout/index', {
                                                            $: $,
                                                            req: req,
                                                            res: res,
                                                            page: content.path,
                                                            path: $.baseurls(req) + '/' + req.params.path,
                                                            template: 'post-news',
                                                            terms: terms,
                                                            content: content,
                                                            post: post,
                                                            relate: docs
                                                        });
                                                    });
                                                });
                                                break;
                                            case '59b4dc06a6983b232486f3c2'://Tin tức child
                                            case '559b4e759029955178cead5d0':
                                                $.getModel('Content', 'index', $).getContents({type: 'post', _id: {$ne: $.ObjectId(content._id)}, cats: $.ObjectId(content.cats[0])}, {date: -1}, 0, 5, function (docs) {
                                                    res.render('Content/View/Layout/index', {
                                                        $: $,
                                                        req: req,
                                                        res: res,
                                                        page: content.path,
                                                        path: $.baseurls(req) + '/' + req.params.path,
                                                        template: 'post-news',
                                                        terms: terms,
                                                        content: content,
                                                        relate: docs
                                                    });
                                                });
                                                break;
                                            default:
                                                $.getModel('Content', 'index', $).getContents({ type: 'post', _id: { $ne: $.ObjectId(content._id) }, cats: $.ObjectId(content.cats[1]) }, { date: -1 }, 0, 5, function (docs) {
                                                    var post = '';
                                                    $.webGet($, (($.isOf == false) ? $.config.link : $.baseurls(req)) + '/vi/content/getPost?&contentid=' + content._id, function (dt) {
                                                        post += dt;
                                                    }, function () {
                                                        res.render('Content/View/Layout/index', {
                                                            $: $,
                                                            req: req,
                                                            res: res,
                                                            page: content.path,
                                                            path: $.baseurls(req) + '/' + req.params.path,
                                                            template: 'post-news',
                                                            terms: terms,
                                                            content: content,
                                                            post: post,
                                                            relate: docs
                                                        });
                                                    });
                                                });
                                                break;
                                        }
                                    });
                                });
                                break;
                        }
                        break;
                    case 'term':
                        template = (typeof(content.params)!='undefined')? ((typeof(content.params.mau)!='undefined')? content.params.mau.detail: 'term'): 'term';
                        switch(template)
                        {
                            case 'term-classes':
                                checkid($, req, res, function(){
                                    switch (content.path) {
                                        case 'classes':
                                            $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
                                                id: 1,
                                                name: 1,
                                                image: 1
                                            }, function (flags) {
                                                postNum = 9;
                                                req.query.page = $.done(req.query.page, 1);
                                                $.getModel('Content', 'index', $).getContentsAdv({type: 'post', cats: $.ObjectId(content._id)}, {date: 1}, postNum * (req.query.page - 1), postNum, function (posts) {
                                                    $.getModel('Content', 'index', $).getAll({type: 'post', cats: $.ObjectId(content._id)}, {date: 1}, {_id: 1}, function (docs) {
                                                        totalPages = Math.ceil(docs.length / postNum);
                                                        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(req.query.id), function (coin) {
                                                            res.render('Content/View/Layout/game', {
                                                                $: $,
                                                                req: req,
                                                                res: res,
                                                                page: content.path,
                                                                path: $.baseurls(req)+'/'+req.params.path,
                                                                template: (typeof(content.params)!='undefined')? ((typeof(content.params.mau)!='undefined')? content.params.mau.detail: 'term'): 'term',
                                                                postNum: postNum,
                                                                posts: posts,
                                                                totalPages: totalPages,
                                                                content: content,
                                                                flags: flags,
                                                                watts: coin
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                            break;
                                    }
                                });
                                break;
                            case 'term-themes':
                                postNum = 10;
                                req.query.page = $.done(req.query.page, 1);
                                $.getModel('Content', 'index', $).getContents({type: 'post', cats: $.ObjectId(content._id)}, {date: 1}, postNum * (req.query.page - 1), postNum, function (docs) {
                                    posts = docs;
                                    $.getModel('Content', 'index', $).getAll({type: 'post', cats: $.ObjectId(content._id)}, {date: 1}, {_id: 1}, function (docs) {
                                        totalPages = Math.ceil(docs.length / postNum);
                                        $.getModel('Content', 'index', $).getAll({type: 'term', cats: $.ObjectId('59b177570fb8752ea82954b2')}, {date: 1}, {title: 1, path: 1}, function (docs) {
                                            terms = docs;
                                            res.render('Content/View/Layout/index', {
                                                $: $,
                                                req: req,
                                                res: res,
                                                page: content.path,
                                                path: $.baseurls(req)+'/'+req.params.path,
                                                template: template,
                                                postNum: postNum,
                                                posts: posts,
                                                totalPages: totalPages,
                                                terms: terms,
                                                content: content
                                            });
                                        });
                                    });
                                });
                                break;
                            case 'term-news':
                                postNum = 10;
                                req.query.page = $.done(req.query.page, 1);
                                $.getModel('Content', 'index', $).getContents({type: 'post', cats: $.ObjectId(content._id)}, {date: -1}, postNum * (req.query.page - 1), postNum, function (docs) {
                                    posts = docs;
                                    $.getModel('Content', 'index', $).getAll({type: 'post', cats: $.ObjectId(content._id)}, {date: 1}, {_id: 1}, function (docs) {
                                        console.log(docs);
                                        totalPages = Math.ceil(docs.length / postNum);
                                        $.getModel('Content', 'index', $).getAll({type: 'term', cats: $.ObjectId('59b3ed8cce8fe51478318ffc')}, {date: 1}, {title: 1, path: 1}, function (docs) {
                                            terms = docs;
                                            res.render('Content/View/Layout/index', {
                                                $: $,
                                                req: req,
                                                res: res,
                                                page: content.path,
                                                path: $.baseurls(req)+'/'+req.params.path,
                                                template: (typeof(content.params)!='undefined')? ((typeof(content.params.mau)!='undefined')? content.params.mau.detail: 'term'): 'term',
                                                postNum: postNum,
                                                posts: posts,
                                                totalPages: totalPages,
                                                terms: terms,
                                                content: content
                                            });
                                        });
                                    });
                                });
                                break;
                            default:
                                postNum = 10;
                                req.query.page = $.done(req.query.page, 1);
                                $.getModel('Content', 'index', $).getContents({type: 'post', cats: $.ObjectId(content._id)}, {date: 1}, postNum * (req.query.page - 1), postNum, function (docs) {
                                    posts = docs;
                                    $.getModel('Content', 'index', $).getAll({type: 'post', cats: $.ObjectId(content._id)}, {date: 1}, {_id: 1}, function (docs) {
                                        totalPages = Math.ceil(docs.length / postNum);
                                        $.getModel('Content', 'index', $).getAll({type: 'term', cats: $.ObjectId('59b3ed8cce8fe51478318ffc')}, {date: 1}, {title: 1, path: 1}, function (docs) {
                                            terms = docs;
                                            res.render('Content/View/Layout/index', {
                                                $: $,
                                                req: req,
                                                res: res,
                                                page: content.path,
                                                path: $.baseurls(req)+'/'+req.params.path,
                                                template: (typeof(content.params)!='undefined')? ((typeof(content.params.mau)!='undefined')? content.params.mau.detail: 'term'): 'term',
                                                postNum: postNum,
                                                posts: posts,
                                                totalPages: totalPages,
                                                terms: terms,
                                                content: content
                                            });
                                        });
                                    });
                                });
                                break;

                        }
                        break;
                    case 'page':
                        $.getModel('Content', 'index', $).editContent({
                            _id: $.ObjectId(content._id),
                            site: content.site,
                            type: content.type,
                            title: content.title,
                            except: content.except,
                            detail: content.detail,
                            position: content.position,
                            cats: content.cats,
                            imgs: content.imgs,
                            params: content.params,
                            path: content.path,
                            keyword: content.keyword,
                            live: content.live,
                            language: content.language,
                            views: parseInt($.done(content.views, 0)) + 1,
                            wid: $.ObjectId(content.wid),
                            date: new Date(content.date)
                        }, function () {
                            var post = '';
                            $.webGet($, (($.isOf == false) ? $.config.link : $.baseurls(req)) + '/vi/content/getPost?&contentid=' + content._id, function (dt) {
                                post += dt;
                            }, function () {
                                switch (content.path) {
                                    case 'am-nhac':
                                        $.getModel('File', 'index', $).getAllAdv({ type: 'audio', live: true }, { date: -1, name: 1 }, {
                                            name: 1,
                                            mediaid: 1,
                                            live: 1,
                                            params: 1,
                                            site: 1,
                                            user: 1,
                                            dateVN: { $dateToString: { format: "%H:%M %d/%m/%Y", date: '$date' } },
                                            date: 1
                                        }, function (result) {
                                            result.sort(function (a, b) {
                                                return new Date(b.date) - new Date(a.date);
                                            });
                                            $.each(result, function (m, n) {
                                                result[m].name = n.name.substring(0, n.name.indexOf(".mp3"));
                                                if (m == 0)
                                                    result[m].space = 0;
                                                else
                                                    result[m].space = result[m - 1].params.duration + result[m - 1].space;
                                            });
                                            $.getModel('Contact', 'index', $).getAllAdv({ type: 'subscription', contentid: $.ObjectId('5d141efa90627200046aa667') }, { date: -1 }, {
                                                live: 1,
                                                detail: 1,
                                                fullname: 1,
                                                date: 1,
                                                dateVN: { $dateToString: { format: "%H:%M %d/%m/%Y", date: '$date' } }
                                            }, function (result2) {
                                                result2.sort(function (a, b) {
                                                    return new Date(b.date) - new Date(a.date);
                                                });
                                                return res.render('Content/View/Layout/dark', {
                                                    $: $,
                                                    req: req,
                                                    res: res,
                                                    page: 'music',
                                                    path: content.path,
                                                    template: 'music',
                                                    content: content,
                                                    post: post,
                                                    audios: result,
                                                    requires: result2
                                                });
                                            });
                                        });
                                        break;
                                    case 'class':
                                        checkid($, req, res, function(){
                                            $.getModel('Content', 'index', $).getContentPath(req.params.path, function (clss) {
                                                if(!$.isEmptyObject(clss))
                                                    $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
                                                        id: 1,
                                                        name: 1,
                                                        image: 1
                                                    }, function (flags) {
                                                        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(req.query.id), function (watts) {
                                                            res.render('Content/View/Layout/game', {
                                                                $: $,
                                                                req: req,
                                                                res: res,
                                                                page: content.path,
                                                                path: $.baseurls(req)+'/'+req.params.path,
                                                                template: (typeof(content.params)!='undefined')? ((typeof(content.params.mau)!='undefined')? content.params.mau.detail: 'page-class'): 'page-class',
                                                                content: content,
                                                                flags: flags,
                                                                watts: watts
                                                            });
                                                        });
                                                    });
                                                else
                                                    res.redirect($.baseurls(req)+"/classes?id="+req.query.id);
                                            });
                                        });
                                        break;
                                    default:
                                        return res.render('Content/View/Layout/index', {
                                            $: $,
                                            req: req,
                                            res: res,
                                            page: content.path,
                                            path: $.baseurls(req) + '/' + req.params.path,
                                            template: 'page',
                                            content: content,
                                            post: post
                                        });
                                        break;
                                }
                            });
                        });
                        break;
                    default:
                        res.render('Content/View/Layout/index', {
                            $: $,
                            req: req,
                            res: res,
                            page: 'post',
                            path: $.baseurls(req)+'/'+req.params.path,
                            template: 'post',
                            content: content
                        });
                        break;
                };
            }
            else
                res.redirect($.baseurls(req));
        });
    };
    var checkid = function($, req, res, fn){
        if (!$.isEmptyObject(req.query) == true || req.query.email != undefined)
            $.getModel('People', 'index', $).getPeopleId($.ObjectId(req.query.id), function (people) {
                if(!$.isEmptyObject(people))
                    fn();
                else
                    res.redirect($.baseurls(req)+"/admin/vi/people/login");
            });
        else
            res.redirect($.baseurls(req)+"/admin/vi/people/login");
    };
    var iCreateClass = function (data) {
        $.getModel('Content', 'index', $).getAll({cats: $.ObjectId('62496f11e9979707cc4d81d4')}, {_id: 1}, {title: 1}, function (contents) {
            $.getModel('People', 'index', $).editPeople({
                _id: $.ObjectId(data.people._id),
                email: data.people.email,
                pw: data.people.pw,
                displayname: data.people.displayname,
                fullname: data.people.fullname,
                gender: data.people.gender,
                address: data.people.address,
                phone: data.people.phone,
                image: data.people.image,
                class: data.people.class,
                classes: {game: 'class-'+(contents.length+2)},
                active: data.people.active,
                contact: data.people.contact,
                flag: data.people.flag,
                parameters: data.people.parameters,
                date: new Date(data.people.date),
                birthday: new Date(data.people.birthday),
                friends: data.people.friends,
                pead: data.people.pead,
                ix: data.people.ix,
            }, function (people) {
                $.return(data, {contents: contents, people: people});
            });
        });
    };
    var address = function(){
        $.getModel('People', 'index', $).getPeoplePead(req.params.myad, function (people) {
            $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(people._id), function (watts) {
                $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
                    id: 1,
                    name: 1,
                    image: 1
                }, function (flags) {
                    postNum = 8;
                    req.query.page = $.done(req.query.page, 1);
                    if(req.params.addr == req.params.myad)
                        getAdPeNews(people, function(allnews, peoples, peAddrs, allShareNews, totalPages){
                            res.render('Content/View/Layout/gameAddress', {
                                $: $,
                                req: req,
                                res: res,
                                page: 'address',
                                path: $.baseurls(req)+'/address/'+req.params.addr+'/'+req.params.myad,
                                template: 'gameAddress',
                                postNum: postNum,
                                allnews: allnews,
                                peoples: peoples,
                                peAddrs: peAddrs,
                                allShareNews: allShareNews,
                                totalPages: totalPages,
                                flags: flags,
                                people: people,
                                pagePeople: people,
                                watts: watts
                            });
                        });
                    else
                        $.getModel('People', 'index', $).getPeoplePead(req.params.addr, function (pagePeople) {
                            getAdPeNews(pagePeople, function(allnews, peoples, peAddrs, allShareNews, totalPages){
                                $.getModel('Content', 'index', $).getAll({type: 'post', $or:[{wid: $.ObjectId(people._id)}, {'params.address': req.params.myad}], cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, {_id: 1}, function (mynews) {
                                    res.render('Content/View/Layout/gameAddress', {
                                        $: $,
                                        req: req,
                                        res: res,
                                        page: 'address',
                                        path: $.baseurls(req)+'/address/'+req.params.addr+'/'+req.params.myad,
                                        template: 'gameAddress',
                                        postNum: postNum,
                                        allnews: allnews,
                                        peoples: peoples,
                                        peAddrs: peAddrs,
                                        allShareNews: allShareNews,
                                        totalPages: totalPages,
                                        flags: flags,
                                        people: people,
                                        pagePeople: pagePeople,
                                        watts: watts,
                                        writed: mynews.length
                                    });
                                });
                            });
                        });
                });
            });
        });
    };
    var getAdPeNews = function(people, fn){
        $.getModel('Content', 'index', $).getAllFull({type: 'post', $or:[{wid: $.ObjectId(people._id)}, {'params.address': people.pead}], cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, postNum * (req.query.page - 1), postNum, function (docs) {
            allnews = docs;
            $.getModel('Content', 'index', $).getAllFullPe2({type: 'post', $or:[{wid: $.ObjectId(people._id)}, {'params.address': people.pead}], cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, postNum * (req.query.page - 1), postNum, function (docs) {
                peoples = docs;
                getPeAddrs(-1, allnews, peoples, {}, {}, function(peAddrs, allShareNews){
                    $.getModel('Content', 'index', $).getAll({type: 'post', $or:[{wid: $.ObjectId(people._id)}, {'params.address': people.pead}], cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: 1}, {_id: 1}, function (docs) {
                        totalPages = Math.ceil(docs.length / postNum);
                        if(typeof(fn) == 'function')
                            fn(allnews, peoples, peAddrs, allShareNews, totalPages);
                    });
                });
            });
        });
    };
    var article = function(){
        if(req.params.hasOwnProperty('myad'))
            $.getModel('People', 'index', $).getPeoplePead(req.params.myad, function (people) {
                $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(people._id), function (watts) {
                    articleNoPe(people, watts);
                });
            });
        else
            articleNoPe(null, null);
    };
    var articleNoPe = function(people, watts){
        $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
            id: 1,
            name: 1,
            image: 1
        }, function (flags) {
            $.getModel('Content', 'index', $).getAllFull({type: 'post', path: req.params.path}, {date: -1}, 0, 1, function (docs) {
                article = ((docs.length==1)? docs[0]: null);
                $.getModel('Content', 'index', $).getAllFullPe2({type: 'post', path: req.params.path}, {date: -1}, 0, 1, function (docs) {
                    peArticle = ((docs.length==1)? docs[0]: null);
                    getPeAddrs(-1, [article], [{people: people}], {}, {}, function(peAddrs, allShareNews){
                        res.render('Content/View/Layout/gameArticle', {
                            $: $,
                            req: req,
                            res: res,
                            page: 'address',
                            path: $.baseurls(req)+'/article/'+req.params.path,
                            template: 'gameArticle',
                            flags: flags,
                            people: people,
                            peAddrs: peAddrs,
                            allShareNews: allShareNews,
                            watts: watts,
                            article: article,
                            peArticle: peArticle,
                            title: 'Bài viết'
                        });
                    });
                });
            });
        });
    };
    var articles = function(){
        $.getModel('People', 'index', $).getPeoplePead(req.params.addr, function (people) {
            $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(people._id), function (watts) {
                $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
                    id: 1,
                    name: 1,
                    image: 1
                }, function (flags) {
                    postNum = 8;
                    req.query.page = $.done(req.query.page, 1);
                    $.getModel('Content', 'index', $).getAllFull({type: 'post', cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, postNum * (req.query.page - 1), postNum, function (docs) {
                        allnews = docs;
                        $.getModel('Content', 'index', $).getAllFullPe2({type: 'post', cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, postNum * (req.query.page - 1), postNum, function (docs) {
                            peoples = docs;
                            getPeAddrs(-1, allnews, peoples, {}, {}, function(peAddrs, allShareNews){
                                $.getModel('Content', 'index', $).getAll({type: 'post', cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: 1}, {_id: 1}, function (docs) {
                                    totalPages = Math.ceil(docs.length / postNum);
                                    res.render('Content/View/Layout/gameAddress', {
                                        $: $,
                                        req: req,
                                        res: res,
                                        page: 'address',
                                        path: $.baseurls(req)+'/game-news/'+req.params.addr,
                                        template: 'gameArticles',
                                        postNum: postNum,
                                        allnews: allnews,
                                        peoples: peoples,
                                        peAddrs: peAddrs,
                                        allShareNews: allShareNews,
                                        totalPages: totalPages,
                                        flags: flags,
                                        people: people,
                                        watts: watts
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    var articlesStatic = function(){
        $.getModel('Flag', 'index', $).getAll({flag: $.done(req.params.lang, 'vi'), active: true}, {
            id: 1,
            name: 1,
            image: 1
        }, function (flags) {
            postNum = 8;
            req.query.page = $.done(req.query.page, 1);
            $.getModel('Content', 'index', $).getAllFull({type: 'post', cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, postNum * (req.query.page - 1), postNum, function (docs) {
                allnews = docs;
                $.getModel('Content', 'index', $).getAllFullPe2({type: 'post', cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, postNum * (req.query.page - 1), postNum, function (docs) {
                    peoples = docs;
                    getPeAddrs(-1, allnews, peoples, {}, {}, function(peAddrs, allShareNews){
                        $.getModel('Content', 'index', $).getAll({type: 'post', cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: 1}, {_id: 1}, function (docs) {
                            totalPages = Math.ceil(docs.length / postNum);
                            res.render('Content/View/Layout/gameStatic', {
                                $: $,
                                req: req,
                                res: res,
                                page: 'address',
                                path: $.baseurls(req)+'/gnews',
                                template: 'gameArticlesStatic',
                                postNum: postNum,
                                allnews: allnews,
                                peoples: peoples,
                                peAddrs: peAddrs,
                                allShareNews: allShareNews,
                                totalPages: totalPages,
                                flags: flags
                            });
                        });
                    });
                });
            });
        });
    };
    var getPeAddrs = function(ix, allnews, peoples, peAddrs, allShareNews, fn){
        ix++;
        if(allnews.length>0 && allnews[ix].params.hasOwnProperty('GNShare'))
        {
            $.getModel('Content', 'index', $).getAllFull({path: allnews[ix].params.GNShare[0]}, {date: -1}, 0, 1, function (shareNews) {
                if(shareNews.length>0)
                {
                    allShareNews[ix] = shareNews[0];
                    $.getModel('People', 'index', $).getPeopleId($.ObjectId(shareNews[0].wid), function (peaddr) {
                        peAddrs[ix] = peaddr;
                        peAddrsEx(ix, allnews, peoples, peAddrs, allShareNews, fn);
                    });
                }
                else
                {
                    delete allnews[ix].params.GNShare;
                    peAddrsEx(ix, allnews, peoples, peAddrs, allShareNews, fn);
                }
            });
        }
        else
            peAddrsEx(ix, allnews, peoples, peAddrs, allShareNews, fn);
    };
    var peAddrsEx = function(ix, allnews, peoples, peAddrs, allShareNews, fn){
                    console.log(peoples);
        if(allnews.length>0 && !allnews[ix].params.hasOwnProperty('GNShare') && (peoples[ix].people==null || allnews[ix].params.address[0] != peoples[ix].people.pead))
        {
            $.getModel('People', 'index', $).getPeoplePead(allnews[ix].params.address[0], function (peaddr) {
                peAddrs[ix] = peaddr;
                    console.log(peAddrs);
                if(ix+1 < allnews.length)
                    getPeAddrs(ix, allnews, peoples, peAddrs, allShareNews, fn);
                else
                    fn(peAddrs, allShareNews);
            });
        }
        else
        {
            if(ix+1 < allnews.length)
                getPeAddrs(ix, allnews, peoples, peAddrs, allShareNews, fn);
            else
                fn(peAddrs, allShareNews);
        }
    };
    var iDelArticle = function(data){
        $.getModel('Content', 'index', $).getContentsByPath(data.params.path, function (contents) {
            delContent(contents, function () {
                $.return(data, contents);
            });
        });
    };
    var iGetArticle = /*e*/function(data){
        $.getModel('Content', 'post', $).getPostCId($.ObjectId(data.params.contentid), function (post) {
            $.return(data, post);
        });
    };
    var iSetArticle = /*e*/function(data){
        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.people._id), function (coin) {
            if(coin.coin > 1100)
            {
                coin.had = {
                    coin: coin.coin,
                    shared: coin.shared,
                    getedFree: coin.getedFree,
                    gifted: coin.gifted
                };
                coin.coin = coin.coin - 1100;
                coin.date = new Date($.dateTimeObj.getNow());
                $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                    $.getModel('Content', 'post', $).editPostCId($.ObjectId(data.params.contentid), {
                        detail: data.params.detail,
                        contentid: $.ObjectId(data.params.contentid)
                    }, function (dt) {
                        $.return(data, {isEdit: true, dt: dt, coin: coin.coin});
                    });
                });
            }
            else
                $.return(data, {isEdit: false});
        });
    };
    var iSelectGN = function(data){
        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.people._id), function (coin) {
            var cSelect = 0;
            switch(data.params.select)
            {
                case 'check':
                    cSelect = 170;
                    break;
                case 'like':
                    cSelect = 2;
                    break;
            }
            if(coin.coin > cSelect)
            {
                coin.had = {
                    coin: coin.coin,
                    shared: coin.shared,
                    getedFree: coin.getedFree,
                    gifted: coin.gifted
                };
                coin.coin = coin.coin - cSelect;
                coin.date = new Date($.dateTimeObj.getNow());
                $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                    $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params._id), function (watts) {
                        watts.had = {
                            coin: watts.coin,
                            shared: watts.shared,
                            getedFree: watts.getedFree,
                            gifted: coin.gifted
                        };
                        watts.coin = watts.coin + cSelect;
                        watts.date = new Date($.dateTimeObj.getNow());
                        $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                            $.getModel('Content', 'index', $).getContentsByPath(data.params.path, function (contents) {
                                setSelect(contents, data, true, function(){
                                    $.return(data, {st: true, coin: coin.coin, watts: watts.coin});
                                });
                            });
                        });
                    });
                });
            }
            else
                $.return(data, {st: false});
        });
    };
    var iDelSelectGN = function(data){
        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params._id), function (coin) {
            if(coin.coin > 2)
            {
                coin.had = {
                    coin: coin.coin,
                    shared: coin.shared,
                    getedFree: coin.getedFree,
                    gifted: coin.gifted
                };
                coin.coin = coin.coin - 2;
                coin.date = new Date($.dateTimeObj.getNow());
                $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                    $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.people._id), function (watts) {
                        watts.had = {
                            coin: watts.coin,
                            shared: watts.shared,
                            getedFree: watts.getedFree,
                            gifted: coin.gifted
                        };
                        watts.coin = watts.coin + 2;
                        watts.date = new Date($.dateTimeObj.getNow());
                        $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                            $.getModel('Content', 'index', $).getContentsByPath(data.params.path, function (contents) {
                                setSelect(contents, data, false, function(){
                                    $.return(data, {st: true, coin: coin.coin, watts: watts.coin});
                                });
                            });
                        });
                    });
                });
            }
            else
                $.return(data, {st: false});
        });
    };
    var setSelect = function (contents, data, selected, cb) {
        if (contents.length > 0) {
            switch(data.params.select)
            {
                case 'check':
                    if(!selected && contents[0].params.hasOwnProperty('checked'))
                    {
                        delete contents[0].params.checked[data.people.pead];
                    }
                    else
                    {
                        if(contents[0].params.hasOwnProperty('checked'))
                            contents[0].params.checked[data.people.pead] = ((data.people.displayname!='')? data.people.displayname: data.people.schoolname);
                        else
                        {
                            contents[0].params.checked = {};
                            contents[0].params.checked[data.people.pead] = ((data.people.displayname!='')? data.people.displayname: data.people.schoolname);
                        }
                    }
                    break;
                case 'like':
                    if(!selected && contents[0].params.hasOwnProperty('liked'))
                    {
                        delete contents[0].params.liked[data.people.pead];
                    }
                    else
                    {
                        if(contents[0].params.hasOwnProperty('liked'))
                            contents[0].params.liked[data.people.pead] = ((data.people.displayname!='')? data.people.displayname: data.people.schoolname);
                        else
                        {
                            contents[0].params.liked = {};
                            contents[0].params.liked[data.people.pead] = ((data.people.displayname!='')? data.people.displayname: data.people.schoolname);
                        }
                    }
                    break;
            }
            $.getModel('Content', 'index', $).editContent({
                _id: $.ObjectId(contents[0]._id),
                site: contents[0].site,
                type: contents[0].type,
                title: contents[0].title,
                except: contents[0].except,
                position: contents[0].position,
                cats: contents[0].cats,
                imgs: contents[0].imgs,
                params: contents[0].params,
                path: contents[0].path,
                keyword: contents[0].keyword,
                live: contents[0].live == 'true',
                flag: contents[0].flag,
                views: contents[0].views,
                wid: $.ObjectId(contents[0].wid),
                date: new Date(contents[0].date)
            }, function () {
                contents.shift();
                setSelect(contents, data, selected, cb);
            });
        } else
            cb();
    }
    var delContent = function (contents, cb) {
        if (contents.length > 0) {
            if (contents[0].type != 'term') {
                $.getModel('Content', 'post', $).delPostByCId($.ObjectId(contents[0]._id), function (dt) {
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
    var addPost = function(){
        $.getModel('Content', 'post', $).addPost({
            detail: req.params.detail,
            contentid: $.ObjectId(req.params.contentid),
        }, function(post){
            if(typeof(post._id) != 'undefined')
                res.send({status: true, id: post._id});
            else
                res.send({status: false, err: post});
        });
    };
    var delPost = function () {console.log(req.query.contentid);
        $.getModel('Content', 'post', $).delPostByCId($.ObjectId(req.query.contentid), function (dt) {
            res.end('ok');
        });
    };
    var setPost = function () {
        var result = '';
        $.webGet($, req.query.mSite + '/vi/content/getPost?&contentid=' + req.query.mContentId, function (dt) {
            result += dt;
        }, function () {
            $.getModel('Content', 'post', $).getPostCId($.ObjectId(req.query.contentid), function (post) {
                delete post.contentid;
                $.getModel('Content', 'post', $).editPostId($.ObjectId(post._id), {
                    detail: result,
                    contentid: $.ObjectId(req.query.contentid)
                }, function (dt) {
                    $.webGet($, req.query.mSite + '/vi/content/delPost?&contentid=' + req.query.mContentId, function (dt) {
                    
                    }, function () {
                        res.end('ok');
                    });
                });
            });
        });
    };
    var getPost = function () {
                console.log(req.query.contentid);
        $.getModel('Content', 'post', $).getPostCId($.ObjectId(req.query.contentid), function (post) {
            if(post != null){
                res.end(post.detail);
            }
            res.end(null);
        });
    };
    return {
        iGetAvailable: iGetAvailable,
        iGetAllPro: iGetAllPro,
        iGetMusicPage: iGetMusicPage,
        index: index,
        address: address,
        article: article,
        articles: articles,
        articlesStatic: articlesStatic,
        addPost: addPost,
        delPost: delPost,
        setPost: setPost,
        getPost: getPost,
        iCreateClass: iCreateClass,
        iDelArticle: iDelArticle,
        iSelectGN: iSelectGN,
        iDelSelectGN: iDelSelectGN,
        iGetArticle: iGetArticle,
        iSetArticle: iSetArticle
    };
};