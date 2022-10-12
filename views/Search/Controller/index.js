exports.controller = function($, req, res){
    var index = function(){
        $.getModel('Content', 'index', $).getContentPath('tim-kiem', function (content) {
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
                                        req.query['tu-khoa'] = $.done(req.query['tu-khoa'], '');
                                        query = {type: 'post', live: true, cats: $.ObjectId($.done(req.query['chuyen-muc'], '59e0bc0ca064ab2a31c66714'))};
                                        if(req.query['tu-khoa'].length>0)
                                        {
                                            keysLower = [];
                                            keysUpper = [];
                                            $.each(req.query['tu-khoa'].toLowerCase().replace(/ /g, ''), function(k, v){
                                                keysLower.push({ title: { '$regex': '.*' + v + '.*' } });
                                            });
                                            $.each(req.query['tu-khoa'].toUpperCase().replace(/ /g, ''), function(k, v){
                                                keysUpper.push({ title: { '$regex': '.*' + v + '.*' } });
                                            });
                                            query.$or = [
                                                { title: { '$regex': ".*" + req.query['tu-khoa'] + ".*" } },
                                                { title: { '$regex': ".*" + req.query['tu-khoa'].toLowerCase() + ".*" } },
                                                { title: { '$regex': ".*" + req.query['tu-khoa'].toUpperCase() + ".*" } },
                                                {$and: keysLower},
                                                {$and: keysUpper}
                                            ];
                                        }
                                        $.getModel('Content', 'index', $).getContents(query, {date: -1, title: 1}, postNum * (req.query.page - 1), postNum, function (contents) {
                                            $.getModel('Content', 'index', $).getAll(query, { date: -1, title: 1 }, { _id: 1 }, function (totalPages) {
                                                totalPages = (totalPages == undefined) ? 0 : Math.ceil(totalPages.length / postNum);
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
                                                        res.render('Search/View/Layout/index', {
                                                            $: $,
                                                            req: req,
                                                            res: res,
                                                            path: 'tim-kiem?&tu-khoa=' + $.done(req.query['tu-khoa'], '') + '&chuyen-muc=' + $.done(req.query['chuyen-muc'], '59e0bc0ca064ab2a31c66714'),
                                                            page: content.path,
                                                            template: 'index',
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
                                                            contents: contents,
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
    var iContact = function (data) {
        client = new $.postmark.Client($.config.pmtokens);
        client.sendEmailWithTemplate({
            "From": $.config.femail,
            "To": data.params.email,
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
                $.getModel('Contact', 'index', $).addContact({
                    fullname: data.params.fullname,
                    email: data.params.email,
                    phone: data.params.phone,
                    address: data.params.title,
                    detail: data.params.detail,
                    live: false,
                    type: 'contact',
                    date: new Date($.dateTimeObj.getNow())
                }, function(contact){
                    $.return(data, contact);
                });
            }
        });
    };
    var iFindAudio = function(data){
        keysLower = [];
        keysUpper = [];
        if(data.params.keys.length>0)
        {
            $.each(data.params.keys.toLowerCase().replace(/ /g, ''), function(k, v){
                keysLower.push({name: {'$regex': '.*'+v+'.*'}});
            });
            $.each(data.params.keys.toUpperCase().replace(/ /g, ''), function(k, v){
                keysUpper.push({name: {'$regex': '.*'+v+'.*'}});
            });
        }
        $.getModel('File', 'index', $).getAllAdv({type: 'audio', live: true,
            $or: [
                {name: {'$regex': ".*" + data.params.keys + ".*"}},
                {name: {'$regex': ".*" + data.params.keys.toLowerCase() + ".*"}},
                {name: {'$regex': ".*" + data.params.keys.toUpperCase() + ".*"}},
                {$and: keysLower},
                {$and: keysUpper}
            ]}, {date: -1, name: 1}, {
            name: 1,
            mediaid: 1,
            live: 1,
            params: 1,
            site: 1,
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
    var iPressSearch = function(data){
        keysLower = [];
        keysUpper = [];
        if(data.params.keys.length>0)
        {
            $.each(data.params.keys.toLowerCase().replace(/ /g, ''), function(k, v){
                keysLower.push({title: {'$regex': '.*'+v+'.*'}});
            });
            $.each(data.params.keys.toUpperCase().replace(/ /g, ''), function(k, v){
                keysUpper.push({title: {'$regex': '.*'+v+'.*'}});
            });
        }
        $.getModel('Content', 'index', $).getAll({type: 'post', language: ((data.user!= null)? data.user.language: 'vi'), cats: {$in: [$.ObjectId('5c0691f25c27d80004dbb93c')]},
            $or: [
                {title: {'$regex': ".*" + data.params.keys.toLowerCase() + ".*"}},
                {title: {'$regex': ".*" + data.params.keys.toUpperCase() + ".*"}},
                {$and: keysLower},
                {$and: keysUpper}
            ]}, {views: -1}, {
            title: 1,
            path: 1
        }, function (contents) {
            $.return(data, contents);
        });
    };
    return {
        index: index,
        iContact: iContact,
        iFindAudio: iFindAudio,
        iPressSearch: iPressSearch
    };
};