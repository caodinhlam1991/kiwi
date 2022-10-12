exports.controller = function($, req, res){
    var iContact = function(data){
//                        $.getModel('User', 'index', $).getContentId(data.data._id, function (docs) {
//                        });
        $.return(data, 'abc');
    };
    var index = function(){
        res.render('Contact/View/Layout/index', {
            $: $,
            req: req,
            res: res,
            template: 'index',
            page: 'lien-he',
            path: $.baseurls(req)+'/'+req.params.slug,
            title: $.trans.gettext('Contact')
        });
    };
    var exchange = function(){
        $.getModel('Content', 'index', $).getContentPath('goc-trao-doi', function (content) {
            $.getModel('Content', 'index', $).getContentId($.ObjectId('59e0bc0ca064ab2a31c66711'), function (partner) {
                $.getModel('Content', 'index', $).getAll({cats: $.ObjectId('59e0bc0ca064ab2a31c66711')}, {date: 1}, {
                    title: 1,
                    path: 1,
                    imgs: 1
                }, function (partners) {
                    $.getModel('Content', 'index', $).getAllFull({$or: [{path: 'dia-chi'}, {path: 'dien-thoai'}, {path: 'email'}, {path: 'facebook'}, {path: 'google'}, {path: 'twitter'}], type: 'feature'}, {date: 1}, 0, 100, function (contacts) {
                        $.getModel('Content', 'index', $).getAll({cats: $.ObjectId('59e0bc0ca064ab2a31c66710')}, {date: 1}, {
                            title: 1,
                            path: 1
                        }, function (supports) {
                            $.getModel('Content', 'index', $).getContentId($.ObjectId('59e0bc0ca064ab2a31c6670f'), function (links) {
                                $.getModel('Content', 'index', $).getAll({type: 'term', cats: $.ObjectId('59e0bc0ca064ab2a31c66714')}, {position: 1}, {
                                    path: 1,
                                    title: 1
                                }, function (menus) {
                                    $.getModel('Content', 'index', $).getAll({type: 'term', cats: {$ne: $.ObjectId('59e0bc0ca064ab2a31c66714')}}, {date: -1}, {
                                        path: 1,
                                        title: 1,
                                        cats: 1
                                    }, function (terms) {
                                        postNum = 15;
                                        req.query.page = $.done(req.query.page, 1);
                                        $.getModel('Contact', 'index', $).getContactsAdv({type: 'exchange'}, {date: -1}, postNum * (req.query.page - 1), postNum, function (exchanges) {
                                            $.getModel('Contact', 'index', $).getAll({type: 'exchange'}, {date: 1}, {_id: 1}, function (totalPages) {
                                                totalPages = Math.ceil(totalPages.length / postNum);
                                                var post = '';
                                                $.webGet($, (($.isOf == false) ? $.config.link : $.baseurls(req)) + '/vi/content/getPost?&contentid=' + content.postid, function (dt) {
                                                    post += dt;
                                                }, function () {
                                                    $.getModel('Content', 'index', $).editContent({
                                                        _id: $.ObjectId(content._id),
                                                        postid: $.ObjectId(content.postid),
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
                                                        views: parseInt(content.views) + 1,
                                                        userid: $.ObjectId(content.userid),
                                                        date: content.date
                                                    }, function () {
                                                        res.render('Contact/View/Layout/index', {
                                                            $: $,
                                                            req: req,
                                                            res: res,
                                                            path: $.baseurl(req),
                                                            page: 'exchange',
                                                            template: 'exchange',
                                                            partners: partners,
                                                            partner: partner,
                                                            contacts: contacts.sort(function (a, b) {
                                                                return new Date(b.date) - new Date(a.date);
                                                            }),
                                                            supports: supports,
                                                            links: links,
                                                            menus: menus,
                                                            terms: terms,
                                                            content: content,
                                                            exchanges: exchanges,
                                                            postNum: postNum,
                                                            totalPages: totalPages,
                                                            post: post
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    var addContact = function(){
        client = new $.postmark.Client($.config.pmtokens);
        client.sendEmailWithTemplate({
            "From": $.config.femail,
            "To": req.body.email + ',' + $.config.remail,
            "ReplyTo": $.config.remail,
            "TemplateId": 20594650,
            "TemplateModel": {
                BASEURL: $.baseurls(req),
                sitename: $.config.sitename,
                SKIN: $.config.skin,
                user_name: req.body.fullname,
                u_temail: req.body.email,
                user_phone: req.body.phone,
                user_title: req.body.title,
                user_require: req.body.detail,
                supportPhone: $.config.phone
            }
        }, function (error, success) {
            if (error)
                $.return(data, $.trans.gettext('Send mail fail') + ': ' + error.message);
            else {
                client = undefined;
                $.getModel('Contact', 'index', $).addContact({
                    email: req.body.email,
                    fullname: req.body.fullname,
                    title: req.body.title,
                    phone: req.body.phone,
                    detail: req.body.detail,
                    live: false,
                    type: 'contact',
                    date: new Date($.dateTimeObj.getNow())
                }, function(){
                    res.end('Cảm ơn bạn đã lựa chọn nội thất 190 chúng tôi sẽ hồi âm bạn sớm!');
                });
            }
        });
    };
    var addExchange = function(){
        $.getModel('Contact', 'index', $).addContact({
            email: req.body.email,
            fullname: req.body.fullname,
            detail: req.body.detail,
            live: false,
            type: 'exchange',
            date: new Date($.dateTimeObj.getNow())
        });
        res.end('');
    };
    var iContact = function(data){
        client = new $.postmark.Client($.config.pmtokens);
        client.sendEmailWithTemplate({
            "From": $.config.femail,
            "To": data.params.email + ',' + $.config.remail,
            "ReplyTo": $.config.remail,
            "TemplateId": 3732341,
            "TemplateModel": {
                BASEURL: $.baseurls(req),
                sitename: $.config.sitename,
                SKIN: $.baseurls(req) + $.config.skin,
                user_name: data.params.fullname,
                user_phone: data.params.phone,
                u_temail: data.params.email,
                user_address: data.params.title,
                user_require: data.params.detail
            }
        }, function (error, success) {
            if (error)
                $.return(data, $.trans.gettext('Send mail fail') + ': ' + error.message);
            else {
                client = undefined;
                $.getModel('Contact', 'index', $).addContact({
                    email: data.params.email,
                    fullname: data.params.fullname,
                    phone: data.params.phone,
                    address: data.params.title,
                    detail: data.params.detail,
                    live: false,
                    type: 'contact',
                    date: new Date($.dateTimeObj.getNow())
                }, function (contact) {
                    $.return(data, contact);
                });
            }
        });
    };
    var iContactsSong = function(data){
        if(data.params.isLogin==1)
            $.getModel('Contact', 'index', $).addContact({
                email: data.user.email,
                fullname: data.params.displayname,
                phone: data.user.phone,
                address: data.user.address,
                detail: data.params.detail,
                contentid: $.mongoose('5d141efa90627200046aa667'),
                live: false,
                type: 'subscription',
                date: $.dateTimeObj.getNow()
            }, function (contact) {
                $.return(data, contact);
            });
        else
            $.getModel('Contact', 'index', $).addContact({
                email: 'caodinhlam91@gmail.com',
                fullname: data.params.displayname,
                detail: data.params.detail,
                contentid: $.mongoose('5d141efa90627200046aa667'),
                active: false,
                type: 'subscription',
                date: $.dateTimeObj.getNow()
            }, function (contact) {
                $.return(data, contact);
            });
    };

    return {
        index: index,
        addContact: addContact,
        exchange: exchange,
        addExchange: addExchange,
        iContact: iContact,
        iContactsSong: iContactsSong
    };
};