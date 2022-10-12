exports.controller = function($, req, res){
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
                                res.render('Home/View/Layout/admin', {
                                    $: $,
                                    req: req,
                                    res: res,
                                    template: 'index',
                                    page: 'dashboard',
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
                        res.render('Home/View/Layout/admin', {
                            $: $,
                            req: req,
                            res: res,
                            template: 'index',
                            page: 'dashboard',
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
    var webdesign = function () {
        $.getModel('Content', 'index', $).getContents({type: 'post', cats: $.ObjectId('59b177570fb8752ea82954b2')}, {poisition: 1}, 0, 4, function (docs) {
            res.render('Home/View/Layout/web', {
                $: $,
                req: req,
                res: res,
                page: 'home',
                slug: (typeof(req.params.slug) == "undefined")? '': '/'+req.params.slug,
                template: 'web',
                posts: docs
            });
        });
    };
    var friend = function(){
        if (req.params._id != undefined)
            $.getModel('People', 'index', $).getPeopleId($.ObjectId(req.params._id), function (people) {
                if ($.isEmptyObject(people))
                    res.redirect($.baseurls(req) + '/friend/' + $.done(req.params.lang, 'vi') + '/people/login');
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
                                res.render('Home/View/Layout/admin', {
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
            res.render('Home/View/Layout/admin', {
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
    return {
        index: index,
        webdesign: webdesign,
        friend: friend
    };
};