exports.controller = function ($, req, res) {
    var index = function(){
        $.slug = req.params.slug;
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.getModel('Content', 'index', $).getContentPath(req.params.slug, function (docs) {
                    $.content = docs;
                    switch($.content.type)
                    {
                        case 'post':
                            $.page = 'post';
                            $.template = 'post';
                            // get teacher of this course
                            $.getModel('User', 'index', $).getUserByEmail($.content.params[0].teacher.detail, function (user) {
                                $.teacher = user;
                                // get relate course
                                $.getModel('Content', 'index', $).getContents({cats: $.mongoose($.content.cats[0]), _id: {$ne: $.content._id}, type: 'post'}, {date: -1}, 0, 5, function (docs) {
                                    $.relate = docs;
                                    // get courses of teacher
                                    $.getModel('Content', 'index', $).getAll({'params.teacher.detail': $.content.params[0].teacher.detail, type: 'post'}, {cats: 1}, function (docs) {
                                        $._idPosts = [];
                                        terms = [];
                                        $.each(docs, function(k, v){
                                            $.each(v.cats, function(k2, v2){
                                                if(v2!='5901bdfca5818200042058cb')
                                                {
                                                    if($._idPosts.hasOwnProperty(v2))
                                                        count = $._idPosts[v2];
                                                    else
                                                    {
                                                        count = 0;
                                                        terms.push(v2);
                                                    }
                                                    $._idPosts[v2] = parseInt(count)+1;
                                                }
                                            });
                                        });
                                        //get terms of courses above
                                        $.getModel('Content', 'index', $).getAll({_id: {$in: terms}, type: 'term'}, {title: 1, path: 1}, function (docs) {
                                            $.termTeach = docs;
                                            res.render('Content/View/Layout/index', {$: $});
                                        });
                                    });
                                });
                            });
                            break;
                        case 'term':
                            $.page = 'term';
                            $.template = 'term';
                            $.path = $.baseurl(req)+'/'+$.slug;
                            req.query.page = (typeof(req.query.page)=='undefined')? 1: req.query.page;
                            $.postNum = 9;
                            if(!req.session.hasOwnProperty('where') || !req.session.hasOwnProperty('sort'))
                            {
                                req.session.where = {type: 'post'};
                                req.session.sort = {};
                            }
                            req.session.where.cats = $.mongoose($.content._id);
                            if(typeof($.temp) != 'undefined')
                            {
                                if($.temp.filter.hasOwnProperty('level'))
                                {
                                    switch($.temp.filter.level)
                                    {
                                        case 'all':
                                            if(req.session.where.hasOwnProperty('params.isPromotion.detail'))
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post', 'params.isPromotion.detail': req.session.where['params.isPromotion']};
                                            else
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post'};
                                            break;
                                        case 'basic':
                                            if(req.session.where.hasOwnProperty('params.isPromotion.detail'))
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post', 'params.isPromotion.detail': req.session.where['params.isPromotion']};
                                            else
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post'};
                                            req.session.where['params.level.detail'] = 'basic';
                                            break;
                                        case 'advance':
                                            if(req.session.where.hasOwnProperty('params.isPromotion.detail'))
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post', 'params.isPromotion.detail': req.session.where['params.isPromotion']};
                                            else
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post'};
                                            req.session.where['params.level.detail'] = 'advance';
                                            break;
                                    }
                                }
                                if($.temp.filter.hasOwnProperty('whereOpt'))
                                {
                                    switch($.temp.filter.whereOpt)
                                    {
                                        case 'buys':
                                            if(req.session.where.hasOwnProperty('params.level.detail'))
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post', 'params.level.detail': req.session.where['params.level.detail']};
                                            else
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post'};
                                            req.session.sort = {};
                                            req.session.sort['params.buys.detail'] = -1;
                                            break;
                                        case 'all':
                                            if(req.session.where.hasOwnProperty('params.level.detail'))
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post', 'params.level.detail': req.session.where['params.level.detail']};
                                            else
                                                req.session.where = {cats: $.mongoose($.content._id), type: 'post'};
                                            req.session.sort = {};
                                            req.session.sort.date = -1;
                                            break;
                                        case 'promotion':
                                            req.session.sort = {};
                                            req.session.sort.date = -1;
                                            req.session.where['params.isPromotion.detail'] = 'y';
                                            break;
                                    }
                                }
                            }
                            if(Object.keys(req.session.sort).length==0)
                                req.session.sort.date = -1;
                            $.getModel('Content', 'index', $).getCourses(req.session.where, req.session.sort, $.postNum * (req.query.page - 1), $.postNum, function (docs) {
                                $.posts = docs;
                                $.getModel('Content', 'index', $).getAll(req.session.where, req.session.sort, function (docs) {
                                    $.totalPosts = docs.length;
                                    $.totalPages = Math.ceil(docs.length / $.postNum);
                                    $.temp = undefined;
                                    $.res.render('Content/View/Layout/index', {$: $});
                                });
                            });
                            break;
                        case 'page':
                            $.page = 'page';
                            $.template = 'page';
                            res.render('Content/View/Layout/index', {$: $});
                            break;
                        default:
                            $.page = 'post';
                            $.template = 'post';
                            $.res.render('Content/View/Layout/index', {$: $});
                            break;
                    };
                });
            });
        });
    };
    var termTeacher = function() {
        $.slug = req.params.slug;
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.getModel('Content', 'index', $).getContentPath(req.params.slug, function (docs) {
                    $.content = docs;
                    $.page = 'term';
                    $.template = 'term';
                    $.path = $.baseurl(req)+'/'+$.slug;
                    req.query.page = (typeof(req.query.page)=='undefined')? 1: req.query.page;
                    $.postNum = 12;
                    $.getModel('Content', 'index', $).getContents({cats: $.mongoose($.content._id), 'params.teacher.detail': req.params.teacher.detail}, {date: -1}, $.postNum * (req.query.page - 1), $.postNum, function (docs) {
                        $.posts = docs;
                        $.getModel('Content', 'index', $).getAll({cats: $.mongoose($.content._id), 'params.teacher.detail': req.params.teacher.detail}, {_id: 1}, function (docs) {
                            $.totalPosts = docs.length;
                            $.totalPages = Math.ceil(docs.length/$.postNum);
                            $.res.render('Content/View/Layout/index', {$: $});
                        });
                    });
                });
            });
        });
    };
    var iGameClass = function(data){
        switch(data.params.data.to)
        {
            case 'walk':
                switch(data.params.data.pos)
                {
                    case 103:
                        $.getModel('People', 'index', $).getPeopleByEmail(data.params.data.people.email, function (people) {
                            if(people.classes['game']!=null)
                                data.params.data.watts = 100;
                            $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(people._id), function (watts) {
                                watts.had = {
                                    coin: watts.coin,
                                    shared: watts.shared,
                                    getedFree: watts.getedFree,
                                    gifted: watts.gifted
                                };
                                watts.coin = watts.coin + data.params.data.watts;
                                watts.date = new Date($.dateTimeObj.getNow());
                                $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                                    $.respHome({path: data.params.data.path}, {
                                        people: people,
                                        to: data.params.data.to,
                                        pos: data.params.data.pos,
                                        watts: watts.coin,
                                        aPPos: data.params.data.aPPos
                                    });
                                });
                            });
                        });
                        break;
                    case 69:
                        data.params.data.watts = -200;
                        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.people._id), function (watts) {
                            watts.had = {
                                coin: watts.coin,
                                shared: watts.shared,
                                getedFree: watts.getedFree,
                                gifted: watts.gifted
                            };
                            if(data.params.data.people.classes['game']!=null)
                                watts.coin = watts.coin + data.params.data.salary;
                            watts.coin = watts.coin + data.params.data.watts;
                            watts.date = new Date($.dateTimeObj.getNow());
                            $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                                $.respHome({path: data.params.data.path}, {
                                    people: data.params.data.people,
                                    to: data.params.data.to,
                                    pos: data.params.data.pos,
                                    watts: watts.coin,
                                    aPPos: data.params.data.aPPos,
                                    salary: 0
                                });
                            });
                        });
                        break;
                    default:
                        $.respHome({path: data.params.data.path}, data.params.data);
                        break;
                }
                break;
            case 'getInfoPlace':
                if(data.params.data.people.classes['game']!=null && data.params.data.pos!=66 && data.params.data.pos!=68 && data.params.data.pos!=70 && data.params.data.salary>=0)
                     data.params.data.salary = 0;
                $.getModel('Content', 'index', $).getContent({title: data.params.data.box, cats: $.ObjectId('625bc8611f0ff7000419ccbc')}, function (info){
                    $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.people._id), function (watts) {
                        watts.had = {
                            coin: watts.coin,
                            shared: watts.shared,
                            getedFree: watts.getedFree,
                            gifted: watts.gifted
                        };
                        $.each(data.params.data.myCities, function(k, o){
                            $.each(o, function(k2, o2){
                                if(k2==data.params.data.pos && o2>0 && k != data.params.data.cMAvr)
                                {
                                    rentInfo = {price: JSON.parse(info.except)[o2], pId: data.params.data.myCities[k].pId};
                                    watts.coin = watts.coin - rentInfo.price;
                                    return false;
                                }
                            });
                        });
                        if(data.params.data.salary>=0)
                        {
                            watts.coin = watts.coin + data.params.data.salary;
                            watts.date = new Date($.dateTimeObj.getNow());
                        }
                        $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                            if(typeof(rentInfo) != 'undefined')
                                $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(rentInfo.pId), function (pWatts) {
                                    pWatts.coin = pWatts.coin + rentInfo.price;
                                    pWatts.date = new Date($.dateTimeObj.getNow());
                                    $.getModel('Coin', 'index', $).editCoin(pWatts, function (dt) {
                                        rentInfo = undefined;
                                        $.respHome({path: data.params.data.path}, {
                                            cMAvr: data.params.data.cMAvr,
                                            myCities: data.params.data.myCities,
                                            people: data.params.data.people,
                                            to: data.params.data.to,
                                            info: info,
                                            pos: data.params.data.pos,
                                            steps: data.params.data.steps,
                                            aPPos: data.params.data.aPPos,
                                            watts: watts.coin,
                                            pWatts: pWatts,
                                            salary: data.params.data.salary
                                        });
                                    });
                                });
                            else
                                $.respHome({path: data.params.data.path}, {
                                    cMAvr: data.params.data.cMAvr,
                                    myCities: data.params.data.myCities,
                                    people: data.params.data.people,
                                    to: data.params.data.to,
                                    info: info,
                                    pos: data.params.data.pos,
                                    steps: data.params.data.steps,
                                    aPPos: data.params.data.aPPos,
                                    watts: watts.coin,
                                    pWatts: null,
                                    salary: data.params.data.salary
                                });
                        });
                    });
                });
                break;
            case 'getInfo':
                $.getModel('Content', 'index', $).getContent({title: data.params.data.box, cats: $.ObjectId('625bc8611f0ff7000419ccbc')}, function (info){
                    $.respHome({path: data.params.data.path}, {
                        cMAvr: data.params.data.cMAvr,
                        myCities: data.params.data.myCities,
                        people: data.params.data.people,
                        to: data.params.data.to,
                        info: info,
                        pos: data.params.data.pos,
                        steps: data.params.data.steps,
                        aPPos: data.params.data.aPPos
                    });
                });
                break;
            case 'shop':
            case 'buil':
            case 'sel':
                $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.people._id), function (watts) {
                    watts.had = {
                        coin: watts.coin,
                        shared: watts.shared,
                        getedFree: watts.getedFree,
                        gifted: watts.gifted
                    };
                    watts.coin = watts.coin - data.params.data.watts;
                    watts.date = new Date($.dateTimeObj.getNow());
                    $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                        $.respHome({path: data.params.data.path}, {
                            cMAvr: data.params.data.cMAvr,
                            worked: data.params.data.worked,
                            myCities: data.params.data.myCities,
                            people: data.params.data.people,
                            to: data.params.data.to,
                            pos: data.params.data.pos,
                            watts: watts.coin
                        });
                    });
                });
                break;
            case 'kPeople':
                $.getModel('Content', 'index', $).getContentPath(data.params.data.path, function (content) {
                    views = parseInt(content.views) + 1;
                    $.getModel('Content', 'index', $).editContent({
                        _id: $.ObjectId(content._id),
                        site: content.site,
                        type: content.type,
                        title: content.title,
                        except: content.except,
                        position: content.position,
                        cats: content.cats,
                        imgs: content.imgs,
                        params: content.params,
                        path: content.path,
                        keyword: content.keyword,
                        live: content.live,
                        flag: content.flag,
                        views: views,
                        wid: $.ObjectId(content.wid),
                        date: new Date(content.date)
                    }, function () {
                        $.getModel('People', 'index', $).editPeople({
                            _id: $.ObjectId(data.params.data.people._id),
                            email: data.params.data.people.email,
                            pw: data.params.data.people.pw,
                            displayname: data.params.data.people.displayname,
                            schoolname: data.params.data.people.schoolname,
                            gender: data.params.data.people.gender,
                            address: data.params.data.people.address,
                            phone: data.params.data.people.phone,
                            image: data.params.data.people.image,
                            class: data.params.data.people.class,
                            classes: {game: content.path},
                            active: data.params.data.people.active,
                            contact: data.params.data.people.contact,
                            flag: data.params.data.people.flag,
                            parameters: data.params.data.people.parameters,
                            date: new Date(data.params.data.people.date),
                            birthday: new Date(data.params.data.people.birthday),
                            friends: data.params.data.people.friends,
                            pead: data.params.data.people.pead,
                            ix: data.params.data.people.ix,
                        }, function (people) {
                            $.respHome({path: data.params.data.path}, {
                                to: 'kPeople',
                                people: people,
                                peopleLen: views,
                                cMAvr: data.params.data.cMAvr,
                                pePos: data.params.data.pePos,
                                pPos: data.params.data.pPos,
                                aPPos: data.params.data.aPPos,
                                pAll: data.params.data.pAll,
                                myCities: data.params.data.myCities
                            });
                        });
                    });
                });
                break;
            case 'cPeopleX':
                $.getModel('Content', 'index', $).getContentPath(data.params.data.path, function (content) {
                    views = parseInt(content.views) - 1;
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
                        flag: content.flag,
                        views: views,
                        wid: $.ObjectId(content.wid),
                        date: new Date(content.date)
                    }, function () {
                        data.params.data.people.classes['game'] = null;
                        $.getModel('People', 'index', $).editPeople({
                            _id: $.ObjectId(data.params.data.people._id),
                            email: data.params.data.people.email,
                            pw: data.params.data.people.pw,
                            displayname: data.params.data.people.displayname,
                            schoolname: data.params.data.people.schoolname,
                            gender: data.params.data.people.gender,
                            address: data.params.data.people.address,
                            phone: data.params.data.people.phone,
                            image: data.params.data.people.image,
                            class: data.params.data.people.class,
                            classes: {game: null},
                            active: data.params.data.people.active,
                            contact: data.params.data.people.contact,
                            flag: data.params.data.people.flag,
                            parameters: data.params.data.people.parameters,
                            date: new Date(data.params.data.people.date),
                            birthday: new Date(data.params.data.people.birthday),
                            friends: data.params.data.people.friends,
                            pead: data.params.data.people.pead,
                            ix: data.params.data.people.ix,
                        }, function (people) {
                            decoPe(data.params.data.people, function(){
                                $.respHome({path: data.params.data.path}, {
                                    to: 'cPeopleX',
                                    people: people,
                                    peopleLen: views,
                                    cMAvr: data.params.data.cMAvr,
                                    pePos: data.params.data.pePos,
                                    pPos: data.params.data.pPos,
                                    aPPos: data.params.data.aPPos,
                                    pAll: data.params.data.pAll,
                                    myCities: data.params.data.myCities
                                });
                            });
                        });
                    });
                });
                break;
            case 'cPeopleAX':
                $.getModel('People', 'index', $).editPeople({
                    _id: $.ObjectId(data.params.data.people._id),
                    email: data.params.data.people.email,
                    pw: data.params.data.people.pw,
                    displayname: data.params.data.people.displayname,
                    schoolname: data.params.data.people.schoolname,
                    gender: data.params.data.people.gender,
                    address: data.params.data.people.address,
                    phone: data.params.data.people.phone,
                    image: data.params.data.people.image,
                    class: data.params.data.people.class,
                    classes: {game: null},
                    active: data.params.data.people.active,
                    contact: data.params.data.people.contact,
                    flag: data.params.data.people.flag,
                    parameters: data.params.data.people.parameters,
                    date: new Date(data.params.data.people.date),
                    birthday: new Date(data.params.data.people.birthday),
                    friends: data.params.data.people.friends,
                    pead: data.params.data.people.pead,
                    ix: data.params.data.people.ix,
                }, function (people) {
                    decoPe(data.params.data.people, function(){
                        $.respHome({path: data.params.data.path}, {
                            to: 'cPeopleX',
                            people: people,
                            peopleLen: views,
                            cMAvr: data.params.data.cMAvr,
                            pePos: data.params.data.pePos,
                            pPos: data.params.data.pPos,
                            aPPos: data.params.data.aPPos,
                            pAll: data.params.data.pAll,
                            myCities: data.params.data.myCities
                        });
                    });
                });
                break;
            case 'thing2':
            case 'thing1':
                thing = Math.floor(Math.random() * 15) + 1;
                switch(thing)
                {
                    case 4:
                        thing = 15;
                        break;
                    case 13:
                        thing = 16;
                        break;
                    case 14:
                        thing = 17;
                        break;
                }
                $.getModel('Content', 'index', $).getContent({position: thing, cats: $.ObjectId(((data.params.data.to=='thing1')? '6258efabbdb0971a68cce450': '62591f646ab7780420d41a95'))}, function (thg){
                    thg.except = JSON.parse(thg.except);
                    if(data.params.data.to=='thing2')
                        switch(thing)
                        {
                            case 3:
                                if(data.params.data.pos>66)
                                {
                                    getSalary(data, ((data.params.data.salary>=0)? thg.except['salary']: 0), function(watts, pr){
                                        $.respHome({path: data.params.data.path}, {
                                            cMAvr: data.params.data.cMAvr,
                                            people: data.params.data.people,
                                            to: data.params.data.to,
                                            thing: thg,
                                            frontExec: thing,
                                            myCities: data.params.data.myCities,
                                            aPPos: data.params.data.aPPos,
                                            pos: data.params.data.pos,
                                            watts: watts.coin,
                                        });
                                    }, null);
                                    break;
                                }
                            case 7:
                                if(data.params.data.pos>94)
                                {
                                    getSalary(data, ((data.params.data.salary>=0)? thg.except['salary']: 0), function(watts, pr){
                                        $.respHome({path: data.params.data.path}, {
                                            cMAvr: data.params.data.cMAvr,
                                            people: data.params.data.people,
                                            to: data.params.data.to,
                                            thing: thg,
                                            frontExec: thing,
                                            myCities: data.params.data.myCities,
                                            aPPos: data.params.data.aPPos,
                                            pos: data.params.data.pos,
                                            watts: watts.coin,
                                        });
                                    }, null);
                                    break;
                                }
                            case 9:
                                if(data.params.data.pos>70)
                                {
                                    getSalary(data, ((data.params.data.salary>=0)? thg.except['salary']: 0), function(watts, pr){
                                        $.respHome({path: data.params.data.path}, {
                                            cMAvr: data.params.data.cMAvr,
                                            people: data.params.data.people,
                                            to: data.params.data.to,
                                            thing: thg,
                                            frontExec: thing,
                                            myCities: data.params.data.myCities,
                                            aPPos: data.params.data.aPPos,
                                            pos: data.params.data.pos,
                                            watts: watts.coin,
                                        });
                                    }, null);
                                    break;
                                }
                            case 11:
                                if(data.params.data.pos>81)
                                {
                                    getSalary(data, ((data.params.data.salary>=0)? thg.except['salary']: 0), function(watts, pr){
                                        $.respHome({path: data.params.data.path}, {
                                            cMAvr: data.params.data.cMAvr,
                                            people: data.params.data.people,
                                            to: data.params.data.to,
                                            thing: thg,
                                            frontExec: thing,
                                            myCities: data.params.data.myCities,
                                            aPPos: data.params.data.aPPos,
                                            pos: data.params.data.pos,
                                            watts: watts.coin,
                                        });
                                    }, null);
                                    break;
                                }
                            case 10:
                            case 15:
                            case 16://17
                                $.respHome({path: data.params.data.path}, {
                                    cMAvr: data.params.data.cMAvr,
                                    people: data.params.data.people,
                                    to: data.params.data.to,
                                    thing: thg,
                                    frontExec: thing,
                                    myCities: data.params.data.myCities,
                                    aPPos: data.params.data.aPPos,
                                    pos: data.params.data.pos
                                });
                                break;
                            default://1, 2, 18, 5, 6, 8, 12
                                pay = 0;
                                if(thg.except.hasOwnProperty('add'))
                                    pay += thg.except['add'];
                                if(thg.except.hasOwnProperty('exc'))
                                    pay -= thg.except['exc'];
                                if(thg.except.hasOwnProperty('pHomes'))
                                    $.each(data.params.data.myCities[data.params.data.cMAvr], function(k, o){
                                        if(o<7 && o>0)
                                            pay -= thg.except['pHomes'];
                                    });
                                if(thg.except.hasOwnProperty('pHotels'))
                                    $.each(data.params.data.myCities[data.params.data.cMAvr], function(k, o){
                                        if(o==7)
                                            pay -= thg.except['pHotels'];
                                    });
                                if(thg.except.hasOwnProperty('pPeoples'))
                                {
                                    credits = {price: thg.except['pPeoples']*(data.params.data.peopleLen-1)};
                                    credits[data.params.data.people._id] = false;
                                    pay += credits.price;
                                }
                                if(thg.except.hasOwnProperty('excMtr'))
                                {
                                    if(thg.except['toPos']==1)
                                        if(data.params.data.pos<93 && data.params.data.pos>77)//93
                                            data.params.data.pos = 93;
                                        else
                                            data.params.data.pos = 77;
                                    if(thg.except['toPos']==2)
                                    {
                                        if(data.params.data.pos<100 && data.params.data.pos>90)//100
                                            data.params.data.pos = 100;
                                        if(data.params.data.pos<90 && data.params.data.pos>80)//90
                                            data.params.data.pos = 90;
                                        if(data.params.data.pos<80 && data.params.data.pos>70)//80
                                            data.params.data.pos = 80;
                                        if(data.params.data.pos<70 || data.params.data.pos>100)//70
                                            data.params.data.pos = 70;
                                    }
                                    $.each(data.params.data.myCities, function(k, o){
                                        if(o.hasOwnProperty(data.params.data.pos))
                                        {
                                            if(thg.except['toPos']==1)
                                                if(o[93]>0 || o[77]>0)
                                                    pay -= thg.except['excMtr']*data.params.data.steps;
                                            if(thg.except['toPos']==2)
                                                if(o[100]>0 || o[90]>0 || o[80]>0 || o[70]>0)
                                                    pay -= thg.except['excMtr']*data.params.data.steps;
                                        }
                                    });
                                }
                                $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.people._id), function (watts) {
                                    watts.had = {
                                        coin: watts.coin,
                                        shared: watts.shared,
                                        getedFree: watts.getedFree,
                                        gifted: watts.gifted
                                    };
                                    watts.coin = watts.coin + pay;
                                    watts.date = new Date($.dateTimeObj.getNow());
                                    $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                                        if(typeof(credits) != 'undefined')
                                        {
                                            setWatts(data, 0, credits, function(credits){
                                                $.respHome({path: data.params.data.path}, {
                                                    cMAvr: data.params.data.cMAvr,
                                                    people: data.params.data.people,
                                                    to: data.params.data.to,
                                                    thing: thg,
                                                    myCities: data.params.data.myCities,
                                                    aPPos: data.params.data.aPPos,
                                                    watts: watts.coin,
                                                    credits: credits,
                                                    pos: data.params.data.pos
                                                });
                                            });
                                            credits = undefined;
                                        }
                                        else
                                            $.respHome({path: data.params.data.path}, {
                                                cMAvr: data.params.data.cMAvr,
                                                people: data.params.data.people,
                                                to: data.params.data.to,
                                                thing: thg,
                                                myCities: data.params.data.myCities,
                                                aPPos: data.params.data.aPPos,
                                                watts: watts.coin,
                                                credits: null,
                                                pos: data.params.data.pos
                                            });
                                    });
                                });
                                break;
                        }
                    else
                    {
                        th1fn = function(w, respHome){
                            switch(thing)
                            {
                                case 10:
                                case 15:
                                    $.respHome({path: data.params.data.path}, {
                                        cMAvr: data.params.data.cMAvr,
                                        people: data.params.data.people,
                                        to: data.params.data.to,
                                        thing: thg,
                                        frontExec: thing,
                                        myCities: data.params.data.myCities,
                                        aPPos: data.params.data.aPPos,
                                        pos: data.params.data.pos
                                    });
                                    break;
                                default://1, 2, 3, 8, 5, 6, 7, 9, 11, 12, 16, 18
                                    pay = 0;
                                    if(thg.except.hasOwnProperty('add'))
                                        pay += thg.except['add'];
                                    if(thg.except.hasOwnProperty('exc'))
                                        pay -= thg.except['exc'];
                                    if(thg.except.hasOwnProperty('pHomes'))
                                        $.each(data.params.data.myCities[data.params.data.cMAvr], function(k, o){
                                            if(o<7 && o>0)
                                                pay -= thg.except['pHomes'];
                                        });
                                    if(thg.except.hasOwnProperty('pHotels'))
                                        $.each(data.params.data.myCities[data.params.data.cMAvr], function(k, o){
                                            if(o==7)
                                                pay -= thg.except['pHotels'];
                                        });
                                    if(thg.except.hasOwnProperty('pPeoples'))
                                    {
                                        credits = {price: thg.except['pPeoples']*(data.params.data.peopleLen-1)};
                                        credits[data.params.data.people._id] = false;
                                        pay += credits.price;
                                    }
                                    if(thg.except.hasOwnProperty('excMtr'))
                                    {
                                        if(thg.except['toPos']==1)
                                            if(data.params.data.pos<93 && data.params.data.pos>77)//93
                                                data.params.data.pos = 93;
                                            else
                                                data.params.data.pos = 77;
                                        if(thg.except['toPos']==2)
                                        {
                                            if(data.params.data.pos<100 && data.params.data.pos>90)//100
                                                data.params.data.pos = 100;
                                            if(data.params.data.pos<90 && data.params.data.pos>80)//90
                                                data.params.data.pos = 90;
                                            if(data.params.data.pos<80 && data.params.data.pos>70)//80
                                                data.params.data.pos = 80;
                                            if(data.params.data.pos<70 || data.params.data.pos>100)//70
                                                data.params.data.pos = 70;
                                        }
                                        $.each(data.params.data.myCities, function(k, o){
                                            if(o.hasOwnProperty(data.params.data.pos))
                                            {
                                                if(thg.except['toPos']==1)
                                                    if(o[93]>0 || o[77]>0)
                                                        pay -= thg.except['excMtr']*data.params.data.steps;
                                                if(thg.except['toPos']==2)
                                                    if(o[100]>0 || o[90]>0 || o[80]>0 || o[70]>0)
                                                        pay -= thg.except['excMtr']*data.params.data.steps;
                                            }
                                        });
                                    }
                                    $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.people._id), function (watts) {
                                        watts.had = {
                                            coin: watts.coin,
                                            shared: watts.shared,
                                            getedFree: watts.getedFree,
                                            gifted: watts.gifted
                                        };
                                        watts.coin = watts.coin + pay;
                                        watts.date = new Date($.dateTimeObj.getNow());
                                        $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                                            respHome(watts);
                                        });
                                    });
                                    break;
                            }
                        };
                        if(data.params.data.pos==67 && data.params.data.people.classes['game']!=null)
                            getSalary(data, data.params.data.salary, th1fn, function(watts){
                                if(typeof(credits) != 'undefined')
                                {
                                    setWatts(data, 0, credits, function(credits){
                                        $.respHome({path: data.params.data.path}, {
                                            cMAvr: data.params.data.cMAvr,
                                            people: data.params.data.people,
                                            to: data.params.data.to,
                                            thing: thg,
                                            myCities: data.params.data.myCities,
                                            aPPos: data.params.data.aPPos,
                                            watts: watts.coin,
                                            credits: credits,
                                            pos: data.params.data.pos,
                                            salary: 0
                                        });
                                        credits = undefined;
                                    });
                                }
                                else
                                    $.respHome({path: data.params.data.path}, {
                                        cMAvr: data.params.data.cMAvr,
                                        people: data.params.data.people,
                                        to: data.params.data.to,
                                        thing: thg,
                                        myCities: data.params.data.myCities,
                                        aPPos: data.params.data.aPPos,
                                        watts: watts.coin,
                                        credits: null,
                                        pos: data.params.data.pos,
                                        salary: 0
                                    });
                            });
                        else
                            th1fn(null, function(watts){
                                if(typeof(credits) != 'undefined')
                                {
                                    setWatts(data, 0, credits, function(credits){
                                        $.respHome({path: data.params.data.path}, {
                                            cMAvr: data.params.data.cMAvr,
                                            people: data.params.data.people,
                                            to: data.params.data.to,
                                            thing: thg,
                                            myCities: data.params.data.myCities,
                                            aPPos: data.params.data.aPPos,
                                            watts: watts.coin,
                                            credits: credits,
                                            pos: data.params.data.pos
                                        });
                                    });
                                    credits = undefined;
                                }
                                else
                                    $.respHome({path: data.params.data.path}, {
                                        cMAvr: data.params.data.cMAvr,
                                        people: data.params.data.people,
                                        to: data.params.data.to,
                                        thing: thg,
                                        myCities: data.params.data.myCities,
                                        aPPos: data.params.data.aPPos,
                                        watts: watts.coin,
                                        credits: null,
                                        pos: data.params.data.pos
                                    });
                            });
                    }
                });
                break;
            case 'start':
                $.getModel('Content', 'index', $).getContentPath(data.params.data.path, function (content) {
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
                        live: true,
                        flag: content.flag,
                        views: data.params.data.playerLen,
                        wid: $.ObjectId(content.wid),
                        date: new Date(content.date)
                    }, function () {
                        $.respHome({path: data.params.data.path}, data.params.data);
                    });
                });
                break;
            case 'kExit':
                $.getModel('People', 'index', $).editPeople({
                    _id: $.ObjectId(data.params.data.people._id),
                    email: data.params.data.people.email,
                    pw: data.params.data.people.pw,
                    displayname: data.params.data.people.displayname,
                    schoolname: data.params.data.people.schoolname,
                    gender: data.params.data.people.gender,
                    address: data.params.data.people.address,
                    phone: data.params.data.people.phone,
                    image: data.params.data.people.image,
                    class: data.params.data.people.class,
                    classes: {game: null},
                    active: data.params.data.people.active,
                    contact: data.params.data.people.contact,
                    flag: data.params.data.people.flag,
                    parameters: data.params.data.people.parameters,
                    date: new Date(data.params.data.people.date),
                    birthday: new Date(data.params.data.people.birthday),
                    friends: data.params.data.people.friends,
                    pead: data.params.data.people.pead,
                    ix: data.params.data.people.ix,
                }, function (people) {
                    $.getModel('Content', 'index', $).delContentByPath(data.params.data.path, function (dt) {
                        decoPe(data.params.data.people, function(){
                            $.respHome({path: data.params.data.path}, {
                                to: 'kExit',
                                people: people
                            });
                        });
                    });
                });
                break;
            case 'sellVacc':
                $.getModel('Content', 'index', $).getContentPath(data.params.data.path, function (content) {
                    $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.people._id), function (watts) {
                        watts.had = {
                            coin: watts.coin,
                            shared: watts.shared,
                            getedFree: watts.getedFree,
                            gifted: watts.gifted
                        };
                        watts.coin = watts.coin + 39*(content.views-1);
                        watts.date = new Date($.dateTimeObj.getNow());
                        $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                            $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.pId), function (watts2) {
                                watts2.coin = watts2.coin - 39*(content.views-1);
                                watts2.date = new Date($.dateTimeObj.getNow());
                                $.getModel('Coin', 'index', $).editCoin(watts2, function (dt) {
                                    $.respHome({path: data.params.data.path}, {
                                        people: data.params.data.people,
                                        to: data.params.data.to,
                                        watts: watts.coin,
                                        watts2: watts2.coin,
                                        pId: data.params.data.pId
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case 'shopVacc':
                $.getModel('Content', 'index', $).getContentPath(data.params.data.path, function (content) {
                    $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.people._id), function (watts) {
                        watts.had = {
                            coin: watts.coin,
                            shared: watts.shared,
                            getedFree: watts.getedFree,
                            gifted: watts.gifted
                        };
                        watts.coin = watts.coin - 39*(content.views-1);
                        watts.date = new Date($.dateTimeObj.getNow());
                        $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                            $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.pId), function (watts2) {
                                watts2.coin = watts2.coin + 39*(content.views-1);
                                watts2.date = new Date($.dateTimeObj.getNow());
                                $.getModel('Coin', 'index', $).editCoin(watts2, function (dt) {
                                    $.respHome({path: data.params.data.path}, {
                                        people: data.params.data.people,
                                        to: data.params.data.to,
                                        watts: watts.coin,
                                        watts2: watts2.coin,
                                        pId: data.params.data.pId
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            default:
                $.respHome({path: data.params.data.path}, data.params.data);
                break;
        }
    }
    var decoPe = function(pe, fn){
        people = pe;
        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(people._id), function (coin) {
            people.deco = $.md5(coin._id+coin.coin+coin.wid+coin.date);
            delete people._id;
            $.getModel('People', 'index', $).editPeopleId($.ObjectId(coin.wid), {
                    email: people.email,
                    pw: people.pw,
                    displayname: people.displayname,
                    schoolname: people.schoolname,
                    gender: people.gender,
                    address: people.address,
                    phone: people.phone,
                    image: people.image,
                    class: people.class,
                    classes: people.classes,
                    active: people.active,
                    contact: people.contact,
                    flag: people.flag,
                    parameters: people.parameters,
                    date: new Date(people.date),
                    birthday: new Date(people.birthday),
                    friends: people.friends,
                    pead: people.pead,
                    ix: people.ix,
            }, function (dt) {
                if(typeof(fn)=='function')
                    fn();
            });
        });
    };
    var getSalary = function(data, salary, fn, pr){
        $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.data.people._id), function (watts) {
            watts.had = {
                coin: watts.coin,
                shared: watts.shared,
                getedFree: watts.getedFree,
                gifted: watts.gifted
            };
            if(data.params.data.people.classes['game']!=null && data.params.data.salary!=-1)
                watts.coin = watts.coin + salary;
            watts.coin = watts.coin + data.params.data.watts;
            watts.date = new Date($.dateTimeObj.getNow());
            $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                if(typeof(fn)=='function')
                    fn(watts, pr);
            });
        });
    };
    var setWatts = function(data, ix, credits, fn){
        ixTemp = -1;
        $.each(data.params.data.myCities, function(k, o){
            ixTemp++;
            if(!credits.hasOwnProperty(o.pId) && ix == ixTemp)
            {
                $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(o.pId), function (watts) {
                    watts.had = {
                        coin: watts.coin,
                        shared: watts.shared,
                        getedFree: watts.getedFree,
                        gifted: watts.gifted
                    };
                    watts.coin = watts.coin - credits.price;
                    watts.date = new Date($.dateTimeObj.getNow());
                    credits[o.pId] = watts.coin;
                    $.getModel('Coin', 'index', $).editCoin(watts, function (dt) {
                        if(Object.keys(data.params.data.myCities).length-1 > ix)
                        {
                            ix++;
                            setWatts(data, ix, credits, fn);
                        }
                        else
                            if(typeof(fn)=='function')
                                fn(credits);
                    });
                });
                return false;
            }
        })
        if(typeof(fn)=='function')
            fn(credits);
    };
    return {
        index: index,
        termTeacher: termTeacher,
        iGameClass: iGameClass
    };
};