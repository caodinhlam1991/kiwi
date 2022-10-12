exports.controller = function($, req, res){
    var iSendGift = function(data){
        $.getModel('People', 'index', $).getPeopleOpts({email: data.people.email}, function (people) {
            people.contact[data.now] = {
                title: data.params.title,
                detail: data.params.detail,
                type: 'gift'
            };
            $.getModel('People', 'index', $).editPeople(people, function (dt) {
                $.getModel('Chat', 'index', $).addChat({
                    date: data.now,
                    status: false,
                    type: 'gift',
                    title: data.params.title,
                    detail: data.params.detail,
                    wid: $.mongoose(data.params._id)
                }, function (dt2) {
                    $.return(data, true);
                });
            });
        });
    };
    var iGetMores = function(data){
        switch(data.params.type)
        {
            case 'language':
                $.getModel('Flag', 'index', $).getFlags({language: data.params.opt, active: true}, {position: 1}, data.params.from, 10, function (languages) {
                    $.return(data, languages);
                });
                break;
        }
    };
    var iLoginFB = function(data){
        $.getModel('People', 'index', $).getPeopleByEmail(data.params.email, function (people) {
            if ($.isEmptyObject(people)) {
                client = new $.postmark.Client($.config.pmtokens);
                data.params.password = Math.floor(Math.random() * 10000);
                client.sendEmailWithTemplate({
                    "From": $.config.femail,
                    "To": data.params.email,
                    "ReplyTo": $.config.remail,
                    "TemplateId": 1315721,
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
                        "text6": $.trans.gettext('Enjoy'),
                        "text7": $.trans.gettext('Thanks'),
                        "text8": $.trans.gettext('for your trust and use services of'),
                        "baseurl": $.baseurls(req),
                        "text9": $.trans.gettext('Respect'),
                        "fblink": $.config.fblink,
                        "skin": $.baseurls(req) + $.config.skin,
                        "ttlink": $.config.ttlink,
                        "gglink": $.config.gglink
                    }
                }, function (error, success) {
                    if (error)
                        $.return(data, {status: false, msg: $.trans.gettext('Send mail fail') + ': ' + error.message});
                    else {
                        $.getModel('People', 'index', $).addPeople({
                            displayname: data.params.displayname,
                            fullname: data.params.displayname,
                            gender: true,
                            phone: data.params.phone,
                            email: data.params.email,
                            pw: $.md5(data.params.password),
                            acad: $.md5(data.params.email+data.params.password),
                            image: '',
                            class: 5,
                            active: '1',
                            language: 'vi',
                            date: $.dateTimeObj.getNow()
                        }, function (dt) {
                            $.getModel('Flag', 'index', $).getFlags({ language: dt.language, active: true }, { position: 1 }, 0, 200, function (languages) {
                                dt = $.sercurityGroups(dt);
                                $.return(data, { people: dt, languages: languages, path: $.baseurls(req) + '/hoc-vien' });
                            });
                        });
                    }
                });
            }
            else
                $.getModel('Flag', 'index', $).getFlags({language: people.language, active: true}, {position: 1}, 0, 200, function (languages) {
                    people = $.sercurityGroups(people);
                    $.return(data, {people: people, languages: languages, path: $.baseurls(req)+'/hoc-vien'});
                });
        });
    };
    var iGetVideo = function(data){
        $.getModel('People', 'index', $).getPeopleOpts({email: data.people.email, pw: data.people.pw, group: data.people.group}, function (people) {
            if(people==null)
                $.return(data, false);
            else
            {
                var groups = $.done(people.groups[0], people.groups);
                if(parseInt(data.params.lesson)>parseInt(groups[data.params._id].lesson))
                    groups[data.params._id].lesson = data.params.lesson;
                $.getModel('People', 'index', $).changeGroups(people.email, groups, function (dt) {
                    $.getModel('Content', 'index', $).getContentId($.mongoose(data.params._id), function (doc) {
                        var params = $.done(doc.params[0], doc.params);
                        people = $.sercurityGroups(people);
                        $.return(data, { people: people, video: $.done(params.video.detail[parseInt(data.params.lesson) - 1]) });
                    });
                });
            }
        });
    };
    var iLoginPeople = function (data) {
        $.getModel('People', 'index', $).getPeopleLogin(data.params.email, data.params.pw, function (people) {
            if($.isEmptyObject(people))
                $.return(data, null);
            else
                $.return(data, people);
        });
    };
    var iRegisterPeople = function(data){
        $.folow($, data.ip);
        if($.com[data.ip].doAction == true) {
            $.getModel('People', 'index', $).getPeopleByEmail(data.params.email, function (people) {
                if ($.isEmptyObject(people)) {
                    client = new $.postmark.Client('6a9d508b-a8f8-4f06-ad6b-40db7fc2eecf');
                    client.sendEmailWithTemplate({
                        "From": $.config.femail,
                        "To": data.params.email,
                        "ReplyTo": $.config.remail,
                        "TemplateId": 1315721,
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
                            "text6": $.trans.gettext('Enjoy'),
                            "text7": $.trans.gettext('Thanks'),
                            "text8": $.trans.gettext('for your trust and use services of'),
                            "baseurl": $.baseurls(req),
                            "text9": $.trans.gettext('Respect'),
                            "fblink": $.config.fblink,
                            "skin": $.baseurls(req) + $.config.skin,
                            "ttlink": $.config.ttlink,
                            "gglink": $.config.gglink
                        }
                    }, function (error, success) {
                        if (error)
                            $.return(data, {status: false, msg: $.trans.gettext('Send mail fail') + ': ' + error.message});
                        else {
                            $.getModel('People', 'index', $).addPeople({
                                displayname: data.params.displayname,
                                fullname: data.params.displayname,
                                gender: true,
                                phone: data.params.phone,
                                email: data.params.email,
                                image: '',
                                pw: $.md5(data.params.password),
                                acad: $.md5(data.params.email+data.params.password),
                                class: 5,
                                active: '1',
                                language: 'vi',
                                date: $.dateTimeObj.getNow()
                            }, function (dt) {
                                $.return(data, { status: true, msg: $.trans.gettext('Register successfully') });
                            });
                        }
                    });
                }
                else
                    $.return(data, {status: false, msg: $.trans.gettext('Email already exists')});
            });
        }
    };
    var iForgotPeople = function(data){
        $.folow($, data.ip);
        if($.com[data.ip].doAction == true) {
            $.getModel('People', 'index', $).getPeopleByEmail(data.params.email, function (people) {
                if ($.isEmptyObject(people))
                    $.return(data, $.trans.gettext('Email address not registered'));
                else {
                    $.people = people;
                    $.people.active = Math.floor((Math.random()+6)*1000);
                    client = new $.postmark.Client('5e0520fd-101d-4c3b-96cd-dc07f3dcdf31');
                    client.sendEmailWithTemplate({
                        "From": $.config.femail,
                        "To": $.people.email,
                        "ReplyTo": $.config.remail,
                        "TemplateId": 2356741,
                        "TemplateModel": {
                            "baseurl": $.baseurls(req),
                            "text1": $.trans.gettext('To use new password you need to'),
                            "text2": $.trans.gettext('click here'),
                            "active": $.md5($.people.active),
                            "email": data.params.email,
                            "password": $.people.active
                        }
                    }, function (error, success) {
                        if (error)
                            $.return(data, $.trans.gettext('Send mail fail') + ': ' + error.message);
                        else {
                            $.getModel('People', 'index', $).changeActive($.people, function (people) {
                                $.return(data, $.trans.gettext('Account info has been sent to your email'));
                            });
                        }
                    });
                }
            });
        }
    };
    var iChangeInfo = function(data){
        data.people.displayname = data.params.displayname;
        if(typeof(data.params.image)!='undefined')
        {
            //$.fs.unlink($.config.imgdir+'/post/'+data.people.image, function(err) {});
            data.people.image = data.params.image;
        }
        data.people.gender = data.params.gender;
        data.people.address = data.params.address;
        data.people.birthday = new Date($.done(data.params.birthday, data.people.birthday));
        data.people.date = new Date($.done(data.params.date, data.people.date));
        data.people.phone = data.params.phone;
        if(typeof(data.people.parameters[0])!='undefined' && data.people.parameters[0]!=null)
            data.people.parameters[0].intro = data.params.intro;
        else
            data.people.parameters = [{intro: data.params.intro}];
        data.params._id = data.people._id;
        delete data.people._id;
        $.getModel('People', 'index', $).editPeopleId($.ObjectId(data.params._id), data.people, function (people) {
            $.return(data, {st: true, people: people});
        });
    };
    var iRequire = function(data){
        $.getModel('Chat', 'index', $).addChat({
            params: data.params.imgs,
            date: data.now(),
            status: false,
            type: data.params.type,
            title: data.params.title,
            detail: data.params.detail,
            wid: $.mongoose(data.people._id)
        }, function (people) {
            $.return(data, true);
        });
    };
    var iGetComments = function(data){
        postNum = 12;
        $.getModel('Chat', 'index', $).getPeopleChat({wid: $.mongoose(data.people._id), type: 'comment'}, {date: 1}, postNum * (data.params.page - 1), postNum, function (docs) {
            $.getModel('Chat', 'index', $).getAll({wid: $.mongoose(data.people._id), type: 'comment'}, {_id: 1}, function (total) {
                $.return(data, {totalPages: Math.ceil(total.length/postNum), items: docs});
            });
        });
    };
    var iGetInbox = function(data){
        postNum = 12;
        $.getModel('Chat', 'index', $).getPeopleChat({wid: $.mongoose(data.people._id), type: 'inbox'}, {date: 1}, postNum * (data.params.page - 1), postNum, function (docs) {
            $.getModel('Chat', 'index', $).getAll({wid: $.mongoose(data.people._id), type: 'inbox'}, {_id: 1}, function (total) {
                $.return(data, {totalPages: Math.ceil(total.length/postNum), items: docs});
            });
        });
    };
    var iDelInbox = function(data){
        $.getModel('Chat', 'index', $).delChat(data.params._id, function (total) {
            $.return(data, true);
        });
    };
    var iGetPeopleCourses = function(data){
        ids = new Array();
        $.getModel('People', 'index', $).getGroups({_id: $.mongoose(data.people._id)}, function (peoples) {
            var groups = $.done(peoples[0].groups[0], peoples[0].groups);
            if(Object.keys(groups).length>0)
                $.each(groups, function(index, value){
                    if(value.status==1)
                        ids.push($.mongoose(index));
                });
            postNum = 12;
            $.getModel('Content', 'index', $).getContentPages({_id: {$in: ids}, language: data.people.language}, {date: 1}, postNum * (data.params.page - 1), postNum, {title: 1, except: 1, path: 1, imgs: 1, params: 1, 'people.fullname': 1}, function (contents) {
                $.getModel('Content', 'index', $).getAll({_id: {$in: ids}, language: data.people.language}, {_id: 1}, function (total) {
                    contents = $.sercurityParams(contents);
                    $.return(data, {totalPages: Math.ceil(total.length/postNum), items: contents});
                });
            });
        });
    };
    var iGetPeopleCoursesUR = function(data){
        ids = new Array();
        $.getModel('People', 'index', $).getGroups({_id: $.mongoose(data.people._id)}, function (peoples) {
            var groups = $.done(peoples[0].groups[0], peoples[0].groups);
            if(Object.keys(groups).length>0)
                $.each(groups, function(index, value){
                    if(value.status==1 && value.lesson == 1)
                        ids.push($.mongoose(index));
                });
            postNum = 12;
            $.getModel('Content', 'index', $).getContentPages({_id: {$in: ids}, language: data.people.language}, {date: 1}, postNum * (data.params.page - 1), postNum, {title: 1, except: 1, path: 1, imgs: 1, params: 1, 'people.fullname': 1}, function (contents) {
                $.getModel('Content', 'index', $).getAll({_id: {$in: ids}, language: data.people.language}, {_id: 1}, function (total) {
                    contents = $.sercurityParams(contents);
                    $.return(data, {totalPages: Math.ceil(total.length/postNum), items: contents});
                });
            });
        });
    };
    var iGetPeopleCoursesWR = function(data){
        ids = new Array();
        $.getModel('People', 'index', $).getGroups({_id: $.mongoose(data.people._id)}, function (peoples) {
            var groups = $.done(peoples[0].groups[0], peoples[0].groups);
            if(Object.keys(groups).length>0)
                $.each(groups, function(index, value){
                    if(value.status==1 && value.lesson != 1)
                        ids.push($.mongoose(index));
                });
            postNum = 12;
            $.getModel('Content', 'index', $).getContentPages({_id: {$in: ids}, language: data.people.language}, {date: 1}, postNum * (data.params.page - 1), postNum, {title: 1, except: 1, path: 1, imgs: 1, params: 1, 'people.fullname': 1}, function (contents) {
                $.getModel('Content', 'index', $).getAll({_id: {$in: ids}, language: data.people.language}, {_id: 1}, function (total) {
                    contents = $.sercurityParams(contents);
                    $.return(data, {totalPages: Math.ceil(total.length/postNum), items: contents});
                });
            });
        });
    };
    var iGetPeopleGift = function(data){
        $.getModel('People', 'index', $).getPeopleOpts({email: data.people.email, pw: data.people.pw, group: data.people.group}, function (people) {
            people = $.sercurityGroups(people);
            $.return(data, people);
        });
    };
    var iDelGift = function(data){
        $.getModel('People', 'index', $).getPeopleOpts({email: data.people.email, pw: data.people.pw, group: data.people.group}, function (people) {
            delete people.contact[data.params.key];
            if(Object.keys(people.contact).length==0)
                people.contact = {key: 'temp'};
            $.getModel('People', 'index', $).editPeople(people, function (dt) {
                people = $.sercurityGroups(people);
                $.return(data, people);
            });
        });
    };
    var iPay = function(data){
        $.getModel('People', 'index', $).getPeopleOpts({email: data.people.email, pw: data.people.pw, group: data.people.group}, function (people) {
            $.each(data.params.ids, function(k, v){
                data.params.ids[k] = $.mongoose(v);
            });
            $.getModel('Content', 'index', $).getAllCourse({_id: {$in: data.params.ids}, language: 'vi'}, {title: 1, except: 1, path: 1, imgs: 1, params: 1, 'people.fullname': 1}, function (contents) {
                people.groups[0] = $.done(people.groups[0], {});
                total = 0;
                title = '';
                temp = 0;
                name = people.groups[0][data.params.ids[0]].date;
                name = name.replace(/:/g, "");
                name = name.replace(/ /g, "");
                name = name.replace(/\//g, "");
                $.each(contents, function(k, v){
                    var params = $.done(v.params[0], v.params);
                    temp++;
                    countdown = new $.fn.CountDown({
                        now: new Date(),
                        years: (typeof(params['ngay-het-khuyen-mai'])!='undefined')? params['ngay-het-khuyen-mai'].detail.substring(0, 4): -1,
                        months: (typeof(params['ngay-het-khuyen-mai'])!='undefined')? params['ngay-het-khuyen-mai'].detail.substring(5, 7): -1,
                        days: (typeof(params['ngay-het-khuyen-mai'])!='undefined')? params['ngay-het-khuyen-mai'].detail.substring(8, 10): -1,
                        hours: (typeof(params['gio-het-khuyen-mai'])!='undefined')? params['gio-het-khuyen-mai'].detail: -1,
                        minutes: (typeof(params['phut-het-khuyen-mai'])!='undefined')? params['phut-het-khuyen-mai'].detail: -1
                    });
                    title += ', '+temp +'. '+v.title;
                    price = ((countdown.checkCountDown()==true)? params.price.detail-Math.floor((params.price.detail*params.promotion.detail)/100): parseInt(params.price.detail));
                    if(people.groups[0][v._id].hasOwnProperty('sale'))
                    {
                        switch(people.groups[0][v._id].sale.type)
                        {
                            case '-':
                                price -= people.groups[0][v._id].sale.value;
                                break;
                            case '%':
                                price -= (price*people.groups[0][v._id].sale.value)/100;
                        }
                    }
                    total += price;
                });
                $.payment = $.done($.payment, {});
                $.payment[people._id] = people.groups[0][data.params.ids[0]].code;
                $.return(data, 'https://www.nganluong.vn/button_payment.php?receiver=caodinhlam1991@gmail.com&product_name='+name+'&price='+total+'&return_url='+$.baseurls(req)+'/kich-hoat/'+people.email+'/'+people._id+'&comments='+title.replace(', ', ''));
            });
        });
    };
    var iSaveNote = function(data){
        $.getModel('People', 'index', $).getPeopleOpts({email: data.people.email, pw: data.people.pw, group: data.people.group}, function (people) {
            if(people!=null)
            {
                people.groups[0][data.params._id].note = data.params.note;
                $.getModel('People', 'index', $).editPeople(people, function (dt) {
                    people = $.sercurityGroups(people);
                    $.return(data, people);
                });
            }
            else
                $.return(data, false);
        });
    };
    var gift = function(){
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'gift';
                $.title = 'Quà tặng' + ' - ' + $.config.sitename;
                $.template = 'gift';
                res.render('People/View/Layout/index', {$: $});
            });
        });
    };
    var support = function(){
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'support';
                $.title = 'Yêu cầu hỗ trợ' + ' - ' + $.config.sitename;
                $.template = 'support';
                res.render('People/View/Layout/index', {$: $});
            });
        });
    };
    var comment = function(){
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'comment';
                $.title = 'Thảo luận của tôi' + ' - ' + $.config.sitename;
                $.template = 'comment';
                res.render('People/View/Layout/index', {$: $});
            });
        });
    };
    var inbox = function(){
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'inbox';
                $.title = 'Hộp thư' + ' - ' + $.config.sitename;
                $.template = 'inbox';
                res.render('People/View/Layout/index', {$: $});
            });
        });
    };
    var student = function()
    {
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'student';
                $.title = 'Học viên - ' + $.config.sitename;
                $.template = 'index';
                res.render('People/View/Layout/index', {$: $});
            });
        });
    };
    var course = function(){
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'learn';
                $.template = 'course';
                $.slug = req.params.slug;
                $.getModel('Content', 'index', $).getContentPath(req.params.slug, function (docs) {
                    $.content = docs;
                    $.title = $.content.title;
                    res.render('People/View/Layout/index', {$: $});
                });
            });
        });
    };
    var profile = function(){
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'profile';
                $.template = 'profile';
                $.title = 'Thông tin cá nhân';
                res.render('People/View/Layout/index', {$: $});
            });
        });
    };
    return {
        course: course,
        student: student,
        profile: profile,
        gift: gift,
        support: support,
        comment: comment,
        inbox: inbox,
        iSendGift: iSendGift,
        iGetMores: iGetMores,
        iLoginFB: iLoginFB,
        iGetVideo: iGetVideo,
        iLoginPeople: iLoginPeople,
        iRegisterPeople: iRegisterPeople,
        iForgotPeople: iForgotPeople,
        iChangeInfo: iChangeInfo,
        iRequire: iRequire,
        iGetComments: iGetComments,
        iGetInbox: iGetInbox,
        iDelInbox: iDelInbox,
        iGetPeopleCourses: iGetPeopleCourses,
        iGetPeopleCoursesUR: iGetPeopleCoursesUR,
        iGetPeopleCoursesWR: iGetPeopleCoursesWR,
        iGetPeopleGift: iGetPeopleGift,
        iDelGift: iDelGift,
        iPay: iPay,
        iSaveNote: iSaveNote,
        iGetInbox: iGetInbox,
        WebRegister: function(){
            if (req.params._id != undefined)
                $.getModel('People', 'index', $).getPeopleId($.ObjectId(req.params._id), function (people) {
                    if ($.isEmptyObject(people))
                        res.redirect($.baseurls(req) + '/admin');
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
                                    res.render('People/View/Layout/form', {
                                        $: $,
                                        req: req,
                                        res: res,
                                        template: 'webRegister',
                                        page: 'webRegister',
                                        title: $.trans.gettext('webRegister'),
                                        path: $.baseurls(req)+'/'+req.params.path,
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
                            res.render('People/View/Layout/form', {
                                $: $,
                                req: req,
                                res: res,
                                template: 'webRegister',
                                page: 'webRegister',
                                title: $.trans.gettext('webRegister'),
                                path: $.baseurls(req)+'/'+req.params.path,
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
        },
        iWebRegister: function(data){
            if(typeof(data.people.parameters[0])!='undefined' && data.people.parameters[0]!=null)
                data.people.parameters[0].web = data.params.webaddress;
            data.params._id = data.people._id;
            delete data.people._id;
            $.getModel('People', 'index', $).editPeopleId($.ObjectId(data.params._id), data.people, function (people) {
                client = new $.postmark.Client($.config.pmtokens);
                client.sendEmailWithTemplate({
                    "From": $.config.femail,
                    "To": data.people.email,
                    "ReplyTo": $.config.remail,
                    "TemplateId": 10969752,
                    "TemplateModel": {
                        "sitename": $.config.sitename,
                        "text1": $.trans.gettext('Register webaddress successfully'),
                        "text2": $.trans.gettext('Hello'),
                        "displayname": data.params.displayname,
                        "text3": $.trans.gettext('Your webaddress'),
                        "text4": $.trans.gettext('Email'),
                        "email": data.people.email,
                        "text5": $.trans.gettext('Webaddress'),
                        "password": data.params.webaddress,
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
                        $.return(data, {st: false, msg: $.trans.gettext('Send mail fail') + ': ' + error.message});
                    else {
                        $.return(data, {st: true, msg: data.params.webaddress});
                    }
                });
            });
        }
    };
};