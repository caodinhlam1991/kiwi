exports.controller = function($, req, res){
    var iReportDate = function(data) {
        $.getModel('Bill', 'index', $).getBillsOpts({date: {$gte : new Date(data.params.fromDate), $lte : new Date(data.params.toDate+'T23:59:59')}, billType: 'sell'}, {date: 1}, {billId: 1, date: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}, products: 1, promotionVal: 1, promotionType: 1, 'user.displayname': 1, 'user.fullname': 1, 'customer.displayname': 1, 'customer.fullname': 1}, function (bills) {
            $.return(data, bills);
        });
    };
    var iReportImport = function(data) {
        $.getModel('Bill', 'index', $).getBillsImport({date: {$gte : new Date(data.params.fromDate), $lte : new Date(data.params.toDate+'T23:59:59')}, billType: 'import'}, {date: 1}, {billId: 1, date: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}, products: 1, promotionVal: 1, promotionType: 1, 'user.displayname': 1, 'user.fullname': 1, 'customer.title': 1}, function (bills) {
            $.return(data, bills);
        });
    };
    var iReportStaff = function(data) {
        $.getModel('Bill', 'index', $).getBillsOpts({userid: $.mongoose(data.params.userid),date: {$gte : new Date(data.params.fromDate), $lte : new Date(data.params.toDate+'T23:59:59')}, billType: 'sell'}, {date: 1}, {billId: 1, date: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}, products: 1, promotionVal: 1, promotionType: 1, 'user.displayname': 1, 'user.fullname': 1, 'customer.displayname': 1, 'customer.fullname': 1}, function (bills) {
            $.return(data, bills);
        });
    };
    var iReportPayHistory = function(data) {
        $.getModel('Bill', 'index', $).getBillsOpts({pid: $.mongoose(data.params.pid),date: {$gte : new Date(data.params.fromDate), $lte : new Date(data.params.toDate+'T23:59:59')}, billType: 'sell'}, {date: 1}, {billId: 1, date: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}, products: 1, promotionVal: 1, promotionType: 1, 'user.displayname': 1, 'user.fullname': 1, 'customer.displayname': 1, 'customer.fullname': 1}, function (bills) {
            $.return(data, bills);
        });
    };
    var iAddCartNPay = function(data) {
        $.getModel('User', 'index', $).getUserOpts({email: data.user.email, pw: data.user.pw, group: data.user.group}, function (user) {
            ids = new Array();
            owns = {};
            $.each(data.params.cart, function(k, v){
                if(typeof(user.groups[0]) != 'undefined' && user.groups[0] != null && user.groups[0].hasOwnProperty(k) && user.groups[0][k].status == 1)
                    owns[k] = 1;
                ids.push($.mongoose(k));
            });
            $.getModel('Content', 'index', $).getAllCourse({_id: {$in: ids}, language: 'vi'}, {title: 1, except: 1, path: 1, imgs: 1, params: 1, 'user.fullname': 1}, function (contents) {
                code = $.md5($.getFormatNow()+user.date);
                user.groups[0] = $.done(user.groups[0], {});
                total = 0;
                title = '';
                temp = 0;
                $.each(contents, function(k, v){
                    var params = $.done(v.params[0], v.params);
                    if(!owns.hasOwnProperty(v._id))
                    {
                        temp++;
                        countdown = new $.fn.CountDown({
                            now: new Date(),
                            years: (typeof(v.params['ngay-het-khuyen-mai'])!='undefined')? v.params['ngay-het-khuyen-mai'].detail.substring(0, 4): -1,
                            months: (typeof(v.params['ngay-het-khuyen-mai'])!='undefined')? v.params['ngay-het-khuyen-mai'].detail.substring(5, 7): -1,
                            days: (typeof(v.params['ngay-het-khuyen-mai'])!='undefined')? v.params['ngay-het-khuyen-mai'].detail.substring(8, 10): -1,
                            hours: (typeof(v.params['gio-het-khuyen-mai'])!='undefined')? v.params['gio-het-khuyen-mai'].detail: -1,
                            minutes: (typeof(v.params['phut-het-khuyen-mai'])!='undefined')? v.params['phut-het-khuyen-mai'].detail: -1
                        });
                        title += ', '+temp +'. '+v.title;
                        price = ((countdown.checkCountDown()==true)? v.params.price.detail-Math.floor((v.params.price.detail*v.params.promotion.detail)/100): parseInt(v.params.price.detail));
                        user.groups[0][v._id] = {
                            _id: v._id,
                            lesson: 1,
                            code: code,
                            date: $.getFormatNow()
                        };
                        $.each(data.params.cart, function(k2, v2) {
                            if(v2.hasOwnProperty('sale')) {
                                sale = {status: false, value: 0};
                                if(params.hasOwnProperty('giam-gia-600-000'))
                                    $.each(params['giam-gia-600-000'].detail, function (k3, v3) {
                                        if(v3 == v2.sale) {
                                            sale.status = true;
                                            sale.type = '-';
                                            sale.value = 600000;
                                            user.groups[0][v._id].sale = sale;
                                            price -= sale.value;
                                        }
                                    });
                                if(params.hasOwnProperty('giam-gia-10'))
                                    $.each(params['giam-gia-10'].detail, function (k3, v3) {
                                        if(v3 == v2.sale) {
                                            sale.status = true;
                                            sale.type = '%';
                                            sale.value = 10;
                                            user.groups[0][v._id].sale = sale;
                                            price = price - ((price*sale.value)/100);
                                        }
                                    });
                            }
                        });
                        user.groups[0][v._id].status = ((price>0)? 0: 1);
                        total += price;
                    }
                });
                $.getModel('User', 'index', $).editUser(user, function (contents) {
                    name = user.groups[0][ids[0]].date;
                    name = name.replace(/:/g, "");
                    name = name.replace(/ /g, "");
                    name = name.replace(/\//g, "");
                    $.payment = $.done($.payment, {});
                    $.payment[user._id] = code;
                    if (total > 0)
                        $.return(data, 'https://www.nganluong.vn/button_payment.php?receiver=caodinhlam1991@gmail.com&product_name=' + name + '&price=' + total + '&return_url=' + $.baseurls(req) + '/kich-hoat/' + user.email + '/' + user._id + '&comments=' + title.replace(', ', ''));
                    else
                        $.return(data, $.baseurls(req) + '/hoc-vien');
                });
            });
        });
    };
    var index = function() {
        $.getModel('Content', 'index', $).getAll({cats: $.mongoose('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}, function (docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.mongoose('5901ce659fa5c600047d5c5c'), function (doc) {
                $.banner = doc;
                $.page = 'cart';
                $.template = 'index';
                $.title = 'Giỏ hàng - Khatech';
                $.res.render('Cart/View/Layout/index', {$: $});
            });
        });
    };
    var iSTran = function(data) {
        $.mk = $.md5('66444'+ $.baseurls(req)+'/chuyen-khoan-thanh-cong' + 'caodinhlam1991@gmail.com' + data.params.price + 'ac6f3da45d23c6bdda3b828903af3b57');
        $.return(data, 'https://www.nganluong.vn/button_payment.php?receiver=https://www.nganluong.vn/button_payment.php?receiver=caodinhlam1991@gmail.com&product_name=MS&price=2000&return_url=https://cazs.cf/chuyen-khoan-thanh-cong&comments=Chuyển khoản đổi S&secure_code=a5551a8909fda54e5ce7466734b8bb31&product_name=MS&price=' + data.params.price + '&return_url=' + $.baseurls(req) + '/chuyen-khoan-thanh-cong&comments=Chuyển khoản đổi S&secure_code='+$.mk);
    };
    var active = function(){
        $.getModel('User', 'index', $).getUserOpts({email: $.req.params.email, _id: $.ObjectId(req.params.id)}, function (user) {
            if (!$.isEmptyObject(user)) {
                if(typeof($.payment) != 'undefined' && typeof($.payment[user._id]) != 'undefined')
                    $.getModel('User', 'index', $).getGroups({'groups.0': {$exists: true}}, function (users) {
                        if(typeof(user.groups[0]) != 'undefined')
                            $.each(user.groups[0], function (k, v) {
                                order_code = user.groups[0][v._id].date;
                                order_code = order_code.replace(/:/g, "");
                                order_code = order_code.replace(/ /g, "");
                                order_code = order_code.replace(/\//g, "");
                                if(user.groups[0][v._id].code == $.payment[user._id] && $.req.query.order_code == order_code)
                                    user.groups[0][v._id].status = 1;
                                count = 1;
                                $.each(users, function (k2, v2) {
                                    var groups = $.done(v2.groups[0], v2.groups);
                                    $.each(groups, function (k3, v3) {
                                        if (k3 == v._id && v3.status == 1)
                                            count++;
                                    });
                                });
                                $.getModel('Content', 'index', $).getContentId(v._id, function (doc) {
                                    doc.params.buys = {detail: count};
                                    $.getModel('Content', 'index', $).editContent(doc, function (doc2) { });
                                });
                            });
                        $.getModel('User', 'index', $).changeGroups(user.email, user.groups, function (doc) {
                            $.payment[user._id] = undefined;
                            delete $.payment[user._id];
                            res.redirect($.baseurls(req) + '/thanh-toan-thanh-cong');
                        });
                    });
                else
                    res.redirect($.baseurls(req));
            }
            else
                res.redirect($.baseurls(req)+'/dang-nhap');
        });
    };
    var success = function(){
        res.render('Bill/View/Layout/index', {
            $: $,
            req: req,
            res: res,
            title: 'Success',
            page: 'success',
            path: $.baseurls(req) + '/chuyen-khoan-thanh-cong',
            template: 'success',
            title: 'Thanh toán thành công'
        });
    };
    return {
        index: index,
        iSTran: iSTran,
        active: active,
        success: success
    };
};