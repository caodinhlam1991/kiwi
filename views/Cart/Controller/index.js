exports.controller = function($, req, res){
    var iGetOrderDetail = function(data) {
        if(data.user.group == 1 || data.user.group == 6)
        {
            $.getModel('Cart', 'index', $).getCartId($.ObjectId(data.params.orderid), function (cart) {
                $.return(data, cart);
            });
        }
    };
    var iGetBill = function(data) {
        $.getModel('Bill', 'index', $).getBillsOpts({billId: data.params.billId, billType: 'sell'}, {position: 1}, {
            billId : 1,
            billType : 1,
            promotionVal : 1,
            promotionType : 1,
            products : 1,
            userid : 1,
            pid : 1,
            date : {$dateToString: {format: "%H:%M:%S %d/%m/%Y", date: '$date'}}}, function (bill) {
            $.return(data, bill[0]);
        });
    };
    var iGetBillImport = function(data) {
        $.getModel('Bill', 'index', $).getBillsImport({billId: data.params.billId, billType: 'import'}, {position: 1}, {
            billId : 1,
            billType : 1,
            promotionVal : 1,
            promotionType : 1,
            products : 1,
            userid : 1,
            pid : 1,
            date: { $dateToString: { format: "%H:%M %d/%m/%Y", date: '$date' } }
        }, function (bill) {
            $.return(data, bill[0]);
        });
    };
    var iSaveBillImport = function(data) {
        $.each(data.params.products, function(k, v){
            $.getModel('Content', 'index', $).getContentId(k, function (content) {
                content.params['gia-von'].detail = v.price;
                content.params['ton-kho'].detail = parseInt(content.params['ton-kho'].detail)+parseInt(v.number);
                $.getModel('Content', 'index', $).editContent(content, function (dt) { });
            });
        });
        if (typeof (data.params._id) == 'undefined')
            $.getModel('Bill', 'index', $).addBill({
                billId: data.params.billId,
                billType: data.params.billType,
                promotionVal: data.params.promotionVal,
                promotionType: data.params.promotionType,
                products: data.params.products,
                userid: data.user._id,
                pid: data.params.pId,
                date: data.now
            }, function (dt) {
                    $.return(data, dt);
            });
        else
            $.getModel('Bill', 'index', $).editBill({
                _id: data.params._id,
                billId: data.params.billId,
                billType: data.params.billType,
                promotionVal: data.params.promotionVal,
                promotionType: data.params.promotionType,
                products: data.params.products,
                userid: data.user._id,
                pid: data.params.pId,
                date: data.now
            }, function (bill) {
                $.return(data, bill);
            });
    };
    var iSaveBillSell = function(data) {
        $.each(data.params.products, function(k, v){
            $.getModel('Content', 'index', $).getContentId(k, function (err, content) {
                content.params['ton-kho'].detail = parseInt(content.params['ton-kho'].detail)-parseInt(v.number);
                $.getModel('Content', 'index', $).editContent(content, function (dt) { });
            });
        });
        if (typeof (data.params._id) == 'undefined')
            $.getModel('Bill', 'index', $).addBill({
                billId: data.params.billId,
                billType: data.params.billType,
                promotionVal: data.params.promotionVal,
                promotionType: data.params.promotionType,
                products: data.params.products,
                userid: data.user._id,
                pid: data.params.pId,
                date: data.now
            }, function (bill) {
                $.return(data, bill);
            });
        else
            $.getModel('Bill', 'index', $).editBill({
                _id: data.params._id,
                billId: data.params.billId,
                billType: data.params.billType,
                promotionVal: data.params.promotionVal,
                promotionType: data.params.promotionType,
                products: data.params.products,
                userid: data.user._id,
                pid: data.params.pId,
                date: data.now
            }, function (bill) {
                $.return(data, bill);
            });
    };
    var iRequestPayment = function(data) {
        proInfo = {
            access_key: 'krxewedqx3zrzzr07h0w',
            secret: '05z6al4ctasw0goh9mjz3ls5xdj0omob',
            amount: 66000,
            command: 'request_transaction',
            order_id: 'dvdn66k',
            order_info: 'Dịch vụ dưới nước - 66k',
            return_url: 'http://vinhnhatrang.herokuapp.com/thanh-toan-thanh-cong'
        };
        dt = "access_key="+proInfo.access_key+"&amount="+proInfo.amount+"&command="+proInfo.command+"&order_id="+proInfo.order_id+"&order_info="+proInfo.order_info+"&return_url="+proInfo.return_url;
        dt = "access_key="+proInfo.access_key+"&amount="+proInfo.amount+"&command="+proInfo.command+"&order_id="+encodeURIComponent(proInfo.order_id)+"&order_info="+encodeURIComponent(proInfo.order_info)+"&return_url="+encodeURIComponent(proInfo.return_url)+"&signature="+$.crypto.createHmac('sha256', proInfo.secret).update(dt).digest('hex');
        $.http.get('http://api.1pay.vn/bank-charging/service/v2?&'+dt, function(rs){
            rs.headers['content-type'];
            rs.setEncoding('utf8');
            rs.on('data', function(dt){
                $.return(data, dt);
            });
            rs.on('end', function() {

            });
        });
    };
    var iAddCart = function (data) {
        $.getModel('User', 'index', $).getUserByEmail(data.params.email, function (user) {
            client = new $.postmark.Client($.config.pmtokens);
            if ($.isEmptyObject(user)) {
                pw = Math.floor(Math.random() * 10000);
                client.sendEmailWithTemplate({
                    From: $.config.femail,
                    To: data.params.email + ',' + $.config.remail,
                    ReplyTo: $.config.remail,
                    TemplateId: 14972663,
                    TemplateModel: {
                        BASEURL: $.baseurls(req),
                        SKIN: $.config.skin,
                        u_temail: data.params.email,
                        pw: pw
                    }
                }, function (error, success) {
                    if (error)
                        $.return(data, $.trans.gettext('Send mail fail') + ': ' + error.message);
                    else {
                        client = undefined;
                        $.getModel('User', 'index', $).addUser({
                            email: data.params.email,
                            pw: $.md5(pw),
                            displayname: data.params.fullname,
                            fullname: data.params.fullname,
                            phone: data.params.phone,
                            group: 5,
                            active: true,
                            language: 'vi',
                            date: new Date($.dateTimeObj.getNow())
                        }, function (user) {
                            $.getModel('Cart', 'index', $).addCart({
                                type: data.params.type,
                                userid: $.ObjectId(user._id),
                                params: {
                                    address: data.params.address,
                                    require: data.params.detail
                                },
                                live: false,
                                date: new Date($.dateTimeObj.getNow())
                            }, function (cart) {
                                line_pros = '';
                                stt = 0;
                                total = 0;
                                products = [];
                                $.each(data.params.carts, function (k, v) {
                                    products.push({
                                        cartid: $.ObjectId(cart._id),
                                        contentid: $.ObjectId(k),
                                        number: v.number
                                    });
                                    stt++;
                                    line_pros += '<tr>' +
                                    '<td style="border:1px solid #cccccc;text-align:center">' + stt + '</td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center">' +
                                    '<img style="vertical-align: middle; width: 100px" src="' + v.img + '">' +
                                    '</td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center">' +
                                    '<a target="_blank" href="' + $.baseurls(req) + '/' + v.path + '">' + v.title + '</a>' +
                                    '</td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center;">' + v.number + '<br></td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center" class="t_price">' + $.sep_price(v.price) + ' VNĐ</td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center;" class="t_price">' + $.sep_price(String(parseInt(v.price) * v.number)) + ' VNĐ</td>' +
                                    '</tr>';
                                    total += parseInt(v.price) * v.number;
                                });
                                $.getModel('Cart', 'product', $).addProducts(products, function (ps) {
                                    client = new $.postmark.Client($.config.pmtokens);
                                    client.sendEmailWithTemplate({
                                        "From": $.config.femail,
                                        "To": data.params.email + ',' + $.config.remail,
                                        "ReplyTo": $.config.remail,
                                        "TemplateId": 14971908,
                                        "TemplateModel": {
                                            BASEURL: $.baseurls(req),
                                            SKIN: $.config.skin,
                                            user_name: data.params.fullname,
                                            cartid: $.ObjectId(cart._id),
                                            user_phone: data.params.phone,
                                            user_email: data.params.email,
                                            user_address: data.params.address,
                                            type: ((data.params.type != 'bank') ? 'Khi nhận hàng' : 'Chuyển khoản qua ngân hàng'),
                                            user_require: data.params.detail,
                                            line_pros: line_pros,
                                            total: $.sep_price(String(total)),
                                            supportPhone: '0868.915.351'
                                        }
                                    }, function (error, success) {
                                        if (error)
                                            $.return(data, $.trans.gettext('Send mail fail') + ': ' + error.message);
                                        else
                                        {
                                            client = undefined;
                                            $.return(data, cart);
                                        }
                                    });
                                });
                            });
                        });
                    }
                });
            }
            else {
                $.getModel('User', 'index', $).editUser({
                    displayname: data.params.fullname,
                    fullname: data.params.fullname,
                    gender: user.gender,
                    birthday: user.birthday,
                    address: user.address,
                    phone: data.params.phone,
                    email: user.email,
                    pw: user.pw,
                    acad: user.acad,
                    image: user.image,
                    group: user.group,
                    friends: user.friends,
                    groups: user.groups,
                    active: user.active,
                    language: user.language,
                    date: new Date(user.date)
                }, function () {
                    $.getModel('Cart', 'index', $).addCart({
                        type: data.params.type,
                        userid: $.ObjectId(user._id),
                        params: {
                            address: data.params.address,
                            require: data.params.detail
                        },
                        live: false,
                        date: new Date($.dateTimeObj.getNow())
                    }, function (cart) {
                        line_pros = '';
                        stt = 0;
                        total = 0;
                        products = [];
                        $.each(data.params.carts, function (k, v) {
                            products.push({
                                cartid: $.ObjectId(cart._id),
                                contentid: $.ObjectId(k),
                                number: v.number
                            });
                            stt++;
                            line_pros += '<tr>' +
                            '<td style="border:1px solid #cccccc;text-align:center">' + stt + '</td>' +
                            '<td style="border:1px solid #cccccc;text-align:center">' +
                            '<img style="vertical-align: middle; width: 100px" src="' + v.img + '">' +
                            '</td>' +
                            '<td style="border:1px solid #cccccc;text-align:center">' +
                            '<a target="_blank" href="' + $.baseurls(req) + '/' + v.path + '">' + v.title + '</a>' +
                            '</td>' +
                            '<td style="border:1px solid #cccccc;text-align:center;">' + v.number + '<br></td>' +
                            '<td style="border:1px solid #cccccc;text-align:center" class="t_price">' + $.sep_price(String(v.price)) + ' VNĐ</td>' +
                            '<td style="border:1px solid #cccccc;text-align:center;" class="t_price">' + $.sep_price(String(parseInt(v.price) * v.number)) + ' VNĐ</td>' +
                            '</tr>';
                            total += parseInt(v.price) * v.number;
                        });
                        $.getModel('Cart', 'product', $).addProducts(products, function (ps) {
                            client = new $.postmark.Client($.config.pmtokens);
                            client.sendEmailWithTemplate({
                                "From": $.config.femail,
                                "To": data.params.email + ',' + $.config.remail,
                                "ReplyTo": $.config.remail,
                                "TemplateId": 14971908,
                                "TemplateModel": {
                                    BASEURL: $.baseurls(req),
                                    SKIN: $.config.skin,
                                    user_name: data.params.fullname,
                                    cartid: $.ObjectId(cart._id),
                                    user_phone: data.params.phone,
                                    user_email: data.params.email,
                                    user_address: data.params.address,
                                    type: ((data.params.type != 'bank') ? 'Khi nhận hàng' : 'Chuyển khoản qua ngân hàng'),
                                    user_require: data.params.detail,
                                    line_pros: line_pros,
                                    total: $.sep_price(String(total)),
                                    supportPhone: $.config.sphone
                                }
                            }, function (error, success) {
                                if (error)
                                    $.return(data, $.trans.gettext('Send mail fail') + ': ' + error.message);
                                else
                                {
                                    client = undefined;
                                    $.return(data, cart);
                                }
                            });
                        });
                    });
                });
            }
        });
    };
    var iAddToPlaylist = function(data) {
        $.getModel('Cart', 'product', $).getProductByIds($.ObjectId(data.params.cartid), $.ObjectId(data.params.contentid), function (product){
            if(product==null)
            {
                product = $.getModel('Cart', 'product', $).addProduct({
                    cartid: data.params.cartid,
                    contentid: data.params.contentid,
                    number: 1,
                    pos: 1,
                    date: $.dateTimeObj.getNow()
                });
                $.return(data, {status: true, product: product, msg: $.trans.gettext('Added this song')});
            }
            else
                $.return(data, {status: false, msg: $.trans.gettext('This song realy exist')});
        });
    };
    var iGetSongsOfPlaylist = function(data) {
        $.getModel('Cart', 'product', $).getAllRef2({cartid: $.ObjectId(data.params.cartid)}, {date: -1}, {
            file: 1,
            pos: 1,
            date: 1,
            dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}
        }).exec(function (err, songs){
            $.getCursorResult(songs, function(result){
                result.sort(function(a,b){
                    return a.pos - b.pos;
                });
                $.each(result, function(m, n){
                    result[m].file.name = n.file.name.substring(0, n.file.name.indexOf(".mp3"));
                    if(m==0)
                        result[m].file.space = 0;
                    else
                        result[m].file.space = result[m-1].file.params.duration+result[m-1].file.space;
                    result[m].file.dateVN = result[m].dateVN;
                    result[m].file.pos = result[m].pos;
                });
                $.return(data, result);
            });
        });
    };
    var iEditSongsOfPlaylist = function(data) {
        $.getModel('Cart', 'product', $).editProductByIds(data.params.songs[0], function(){
            $.getModel('Cart', 'product', $).editProductByIds(data.params.songs[1], function(){
                $.return(data, true);
            });
        });
    };
    var iDelSongOfPlaylist = function(data){
        $.getModel('Cart', 'product', $).delProduct(data.params.id);
        $.return(data, true);
    };
    var iGetPlaylists = function(data) {
        $.getModel('Cart', 'index', $).getAllAdv({type: 'audio', userid: $.ObjectId(data.user._id)}, {date: -1}, {
            userid: 1,
            params: 1,
            date: 1,
            dateVN: {$dateToString: {format: "%H:%M %d/%m/%Y", date: '$date'}}
        }).exec(function (err, playlists){
            $.getCursorResult(playlists, function(result){
                $.return(data, result.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                }));
            });
        });
    };
    var iAddPlaylist = function(data) {
        cart = $.getModel('Cart', 'index', $).addCart({
            type: 'audio',
            userid: data.user._id,
            params: {
                name: data.params.name
            },
            live: true,
            date: $.dateTimeObj.getNow()
        });
        $.return(data, cart);
    };
    var iEditPlaylist = function(data) {
        $.getModel('Cart', 'index', $).editCart({
            _id: data.params.id,
            type: 'audio',
            userid: data.user._id,
            params: {
                name: data.params.name
            },
            live: true,
            date: $.dateTimeObj.getNow()
        }, function(){});
        $.return(data, true);
    };
    var iDelPlaylist = function(data) {
        $.getModel('Cart', 'index', $).delCart(data.params.id);
        $.getModel('Cart', 'product', $).delProByCartid(data.params.id);
        $.return(data, true);
    };
    var iScan = function(data) {
        if(data.user.group == 1 || data.user.group == 6 || data.user.group == 4)
            $.getModel('Cart', 'index', $).getCartMd5(data.params.content).exec(function (err, cart) {
                $.return(data, cart);
            });
        else
            $.return(data, {});
    };
    var iUseTicket = function(data) {
        if(data.user.group == 1 || data.user.group == 6 || data.user.group == 4)
            $.getModel('Cart', 'index', $).getCartId($.ObjectId(data.params.id)).exec(function (err, cart) {
                if(cart.live==true)
                    cart.params['su-dung-ve'] = {
                        detail: data.now,
                        title: 'Sử dụng vé',
                        tool: 'date'
                    };
                else
                {
                    cart.live = true;
                    cart.params['su-dung-ve'] = {
                        detail: data.now,
                        title: 'Sử dụng vé',
                        tool: 'date'
                    };
                    cart.params['thanh-toan-tien-mat'] = {
                        detail: true,
                        title: 'Thanh toán tiền mặt',
                        opts: '<option value="true">Đã thanh toán</option><option value="false">Chưa thanh toán</option>',
                        tool: "select"
                    };
                }
                $.getModel('Cart', 'index', $).editCart(cart);
                $.return(data, true);
            });
        else
            $.return(data, {});
    };
    var index = function() {
        $.getModel('Content', 'index', $).getAll({cats: $.ObjectId('5901bdfca5818200042058cb'), type: 'term'}, {title: 1, path: 1, params: 1}).exec(function (err, docs) {
            $.terms = docs;
            $.getModel('Content', 'index', $).getContentId($.ObjectId('5901ce659fa5c600047d5c5c')).exec(function (err, doc) {
                $.banner = doc;
                $.page = 'cart';
                $.template = 'index';
                $.title = 'Giỏ hàng - Khatech';
                $.res.render('Cart/View/Layout/index', {$: $});
            });
        });
    };
    var infoBuy = function(){
        $.getModel('User', 'index', $).getUserByEmail(req.body.u_temail, function (user) {
            client = new $.postmark.Client($.config.pmtokens);
            if($.isEmptyObject(user))
            {
                pw = Math.floor(Math.random() * 10000);
                client.sendEmailWithTemplate({
                    "From": $.config.femail,
                    "To": req.body.u_temail,
                    "ReplyTo": $.config.remail,
                    TemplateId: 3736542,
                    TemplateModel: {
                        BASEURL: $.baseurls(req),
                        SKIN: $.config.skin,
                        u_temail: req.body.u_temail,
                        pw: pw
                    }
                }, function (error, success) {
                    if(error)
                        res.send({status: false, msg: $.trans.gettext('Send mail fail') + ': ' + error.message});
                    else {
                        client = undefined;
                        $.getModel('User', 'index', $).addUser({
                            email: req.body.u_temail,
                            pw: $.md5(pw),
                            fullname: req.body.user_name,
                            address: req.body.user_address,
                            phone: req.body.user_phone,
                            group: 5,
                            active: true,
                            language: 'vi',
                            date: new Date($.dateTimeObj.getNow())
                        }, function (user) {
                            $.getModel('Cart', 'index', $).addCart({
                                type: 'normal',
                                userid: $.ObjectId(user._id),
                                params: {
                                    address: req.body.user_address,
                                    require: req.body.user_require
                                },
                                live: false,
                                date: new Date($.dateTimeObj.getNow())
                            }, function (cart) {
                                line_pros = '';
                                stt = 0;
                                total = 0;
                                products = [];
                                $.each(req.body.cart, function(k, v){
                                    products.push({
                                        cartid: $.ObjectId(cart._id),
                                        contentid: $.ObjectId(k),
                                        number: v.number
                                    });
                                    stt++;
                                    line_pros += '<tr>' +
                                    '<td style="border:1px solid #cccccc;text-align:center">'+stt+'</td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center">' +
                                    '<img style="vertical-align: middle; width: 100px" src="'+ v.img_pro +'">' +
                                    '</td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center">' +
                                    '<a target="_blank" href="'+ v.img_pro +'">'+ v.name_pro +'</a>' +
                                    '</td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center;">'+ v.number +'<br></td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center" class="t_price">'+ $.sep_price(String(v.price_pro)) +' VNĐ</td>' +
                                    '<td style="border:1px solid #cccccc;text-align:center;" class="t_price">'+$.sep_price(String(parseInt(v.price_pro)*v.number))+' VNĐ</td>' +
                                    '</tr>';
                                    total += parseInt(v.price_pro)*v.number;
                                });
                                $.getModel('Cart', 'product', $).addProducts(products, function(ps){
                                    client = new $.postmark.Client($.config.pmtokens);
                                    client.sendEmailWithTemplate({
                                        "From": $.config.femail,
                                        "To": req.body.u_temail + ',' + $.config.remail,
                                        "ReplyTo": $.config.remail,
                                        TemplateId: 20620812,
                                        TemplateModel: {
                                            BASEURL: $.baseurls(req),
                                            SKIN: $.config.skin,
                                            user_name: req.body.user_name,
                                            cartid: $.ObjectId(cart._id),
                                            user_phone: req.body.user_phone,
                                            u_temail: req.body.u_temail,
                                            user_address: req.body.user_address,
                                            user_require: req.body.user_require,
                                            line_pros: line_pros,
                                            total: $.sep_price(String(total)),
	                                        supportPhone: $.config.phone
                                        }
                                    }, function (error, success) {
                                        if(error)
                                            res.send({status: false, err: $.trans.gettext('Send mail fail') + ': ' + error.message});
                                        else {
                                            client = undefined;
                                            res.send({status: true, msg: 'Cảm ơn bạn đã đặt hàng tại Nội Thất Anh Khôi, chúng tôi sẽ liên hệ đến bạn sớm nhất'});
                                        }
                                    });
                                });
                            });
                        });
                    }
                });
            }
            else
            {
                $.getModel('Cart', 'index', $).addCart({
                    type: 'normal',
                    userid: $.ObjectId(user._id),
                    params: {
                        address: req.body.user_address,
                        require: req.body.user_require
                    },
                    live: false,
                    date: new Date($.dateTimeObj.getNow())
                }, function (cart) {
                    line_pros = '';
                    stt = 0;
                    total = 0;
                    products = [];
                    $.each(req.body.cart, function(k, v){
                        products.push({
                            cartid: $.ObjectId(cart._id),
                            contentid: $.ObjectId(k),
                            number: v.number
                        });
                        stt++;
                        line_pros += '<tr>' +
                            '<td style="border:1px solid #cccccc;text-align:center">'+stt+'</td>' +
                            '<td style="border:1px solid #cccccc;text-align:center">' +
                            '<img style="vertical-align: middle; width: 100px" src="'+ v.img_pro +'">' +
                            '</td>' +
                            '<td style="border:1px solid #cccccc;text-align:center">' +
                            '<a target="_blank" href="'+ v.img_pro +'">'+ v.name_pro +'</a>' +
                            '</td>' +
                            '<td style="border:1px solid #cccccc;text-align:center;">'+ v.number +'<br></td>' +
                            '<td style="border:1px solid #cccccc;text-align:center" class="t_price">'+ $.sep_price(String(v.price_pro)) +' VNĐ</td>' +
                            '<td style="border:1px solid #cccccc;text-align:center;" class="t_price">'+$.sep_price(String(parseInt(v.price_pro)*v.number))+' VNĐ</td>' +
                            '</tr>';
                        total += parseInt(v.price_pro)*v.number;
                    });
                    $.getModel('Cart', 'product', $).addProducts(products, function(){
                        client = new $.postmark.Client($.config.pmtokens);
                        client.sendEmailWithTemplate({
                            "From": $.config.femail,
                            "To": req.body.u_temail + ',' + $.config.remail,
                            "ReplyTo": $.config.remail,
                            TemplateId: 20620812,
                            TemplateModel: {
                                BASEURL: $.baseurls(req),
                                SKIN: $.config.skin,
                                user_name: req.body.user_name,
                                cartid: $.ObjectId(cart._id),
                                user_phone: req.body.user_phone,
                                u_temail: req.body.u_temail,
                                user_address: req.body.user_address,
                                user_require: req.body.user_require,
                                line_pros: line_pros,
                                total: $.sep_price(String(total)),
	                            supportPhone: $.config.phone
                            }
                        }, function (error, success) {
                            if(error)
                                res.send({status: false, err: $.trans.gettext('Send mail fail') + ': ' + error.message});
                            else {
                                client = undefined;
                                res.send({status: true, msg: 'Cảm ơn bạn đã mua hàng tại Nội Thất Anh Khôi, chúng tôi sẽ liên hệ đến bạn sớm nhất'});
                            }
                        });
                    });
                });
            }
        });
    };
    var book = function(){
        $.getModel('Language', 'index', $).getLanguage({id: req.params.lang}).exec(function (error, language) {
            $.getModel('Content', 'index', $).getContent({path: req.params.path, language: req.params.lang}).exec(function (err, content) {
                if (content != null && content.params.hasOwnProperty('cho-phep-dat-ve') == true) {
                    query = $.parseJSON('{"type": {"$in": ["post", "term", "page"]}, "params.trinh-don-1.tool": "menu", "language": "'+req.params.lang+'"}');
                    $.getModel('Content', 'index', $).getContentsOpts(query, {"params.trinh-don-1.position": 1}, {
                        title: 1,
                        path: 1,
                        imgs: 1,
                        params: 1
                    }).exec(function (err, menu1) {
                        query = $.parseJSON('{"type": {"$in": ["post", "term", "page"]}, "params.trinh-don-2.tool": "menu", "language": "'+req.params.lang+'"}');
                        $.getModel('Content', 'index', $).getContentsOpts(query, {"params.trinh-don-2.position": 1}, {
                            title: 1,
                            path: 1,
                            imgs: 1,
                            params: 1
                        }).exec(function (err, menu2) {
                            $.getModel('Content', 'index', $).getAll({type: 'post', cats: $.ObjectId('5b437538efea3100040618db')}, {position: 1}, {
                                title: 1,
                                path: 1,
                                cats: 1,
                                imgs: 1,
                                params: 1
                            }).exec(function (err, places) {
                                query = $.parseJSON('{"type": {"$in": ["post", "term", "page"]}, "params.trinh-don-4.tool": "menu", "language": "'+req.params.lang+'"}');
                                $.getModel('Content', 'index', $).getContentsOpts(query, {"params.trinh-don-4.position": 1}, {
                                    title: 1,
                                    path: 1,
                                    imgs: 1,
                                    params: 1
                                }).exec(function (err, menu4) {
                                    $.getModel('Content', 'index', $).getContentId($.ObjectId('5b692773bb24210004ded6d9')).exec(function (err, banner1) {
                                        res.render('Cart/View/Layout/indexBook', {
                                            $: $,
                                            req: req,
                                            res: res,
                                            path: 'dat-ve/'+req.params.path,
                                            page: 'book',
                                            template: 'index',
                                            language: language,
                                            menu1: menu1,
                                            menu2: menu2,
                                            menu4: menu4,
                                            banner1: banner1,
                                            places: places,
                                            content: content
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                else if (content == null)
                    res.redirect($.baseurls(req));
                else
                    res.redirect($.baseurls(req) + '/' + req.params.path);
            });
        });
    };
    var acceptBook = function(){
        $.getModel('Content', 'index', $).getContentId(req.body.trip._id).exec(function (err, content) {
            if(content != null)
            {
                req.body.trip.params['cong-thuc-tinh-thanh-tien'] = content.params['cong-thuc-tinh-thanh-tien'];
                req.body.trip.params['tieu-de-truong-mo-ta-ve'] = content.params['tieu-de-truong-mo-ta-ve'];
                req.body.trip.params['gia-truong-mo-ta-ve'] = content.params['gia-truong-mo-ta-ve'];
                cart = $.getModel('Cart', 'index', $).addCart({
                    md5: $.md5(req.body.phone+req.body.now),
                    contentid: content._id,
                    fullname: req.body.fullname,
                    phone: req.body.phone,
                    email: req.body.email,
                    info: req.body.info,
                    require: req.body.require,
                    params: req.body.trip.params,
                    live: false,
                    date: req.body.now
                });
                res.send({
                    status: true,
                    code: cart.md5
                });
            }
            else
                res.redirect($.baseurls(req));
        });
    };
    var scanQr = function(){
        $.getModel('Language', 'index', $).getLanguage({id: req.params.lang}).exec(function (error, language) {
            res.render('Cart/View/Layout/scan', {
                $: $,
                req: req,
                res: res,
                path: 'scan',
                page: 'scan',
                template: 'scanqr',
                language: language
            });
        });
    };
    var payment = function() {
        $.getModel('Content', 'index', $).getContentsFullOpts({ type: 'post', cats: $.ObjectId('5dc5210b55ae4100041df3ae') }, {date: -1}, {
            title: 1,
            except: 1,
            path: 1,
            imgs: 1
        }, 0, 3, function (news) {
            $.getModel('Content', 'index', $).getAllF({ type: 'post', cats: $.ObjectId('5dc5210b55ae4100041df3ae') }, { date: -1 }, 0, 5, {
                title: 1,
                except: 1,
                path: 1,
                imgs: 1,
                date: {$dateToString: {format: "%d/%m/%Y", date: '$date'}},
                dateVN: '$date'
            }, function (lastNews) {
                $.getModel('Content', 'index', $).getContentsFullOpts({ type: 'post', cats: $.ObjectId('5dc51ee855ae4100041df3a0') }, {views: 1}, {
                    title: 1,
                    path: 1,
                    except: 1,
                    imgs: 1
                }, 0, 5, function (mostBikes) {
                    $.getModel('Content', 'index', $).getContentPath('thanh-toan', function (content) {
                        if(content!=null)
                        {
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
                                views: parseInt($.done(content.views, 0)) + 1,
                                userid: $.ObjectId(content.userid),
                                date: new Date(content.date)
                            }, function () {
                                return res.render('Cart/View/Layout/index', {
                                    $: $,
                                    req: req,
                                    res: res,
                                    page: 'thanh-toan',
                                    path: $.baseurl(req) + '/thanh-toan',
                                    title: $.trans.gettext('Payment'),
                                    template: 'payment',
                                    news: news,
                                    lastNews: lastNews,
                                    mostBikes: mostBikes
                                });
                            });
                        };
                    });
                });
            });
        });
    };
    var active = function(){
        $.getModel('User', 'index', $).getUserOpts({email: $.req.params.email, _id: $.ObjectId($.req.params.id)}).exec(function (err, user) {
            if (!$.isEmptyObject(user)) {
                if(typeof($.payment) != 'undefined' && typeof($.payment[user._id]) != 'undefined')
                    $.getModel('User', 'index', $).getGroups({'groups.0': {$exists: true}}).exec(function (error, users) {
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
                                $.getModel('Content', 'index', $).getContentId(v._id).exec(function (err, doc) {
                                    doc.params.buys = {detail: count};
                                    $.getModel('Content', 'index', $).editContent(doc);
                                });
                            });
                        $.getModel('User', 'index', $).changeGroups(user.email, user.groups);
                        $.payment[user._id] = undefined;
                        delete $.payment[user._id];
                        res.redirect($.baseurl(req) + '/thanh-toan-thanh-cong');
                    });
                else
                    res.redirect($.baseurl(req));
            }
            else
                res.redirect($.baseurl(req)+'/dang-nhap');
        });
    };
    var success = function(){
        $.getModel('Language', 'index', $).getLanguage({id: req.params.lang}).exec(function (error, language) {
            query = $.parseJSON('{"type": {"$in": ["post", "term", "page"]}, "params.trinh-don-1.tool": "menu", "language": "'+req.params.lang+'"}');
            $.getModel('Content', 'index', $).getContentsOpts(query, {"params.trinh-don-1.position": 1}, {
                title: 1,
                path: 1,
                imgs: 1,
                params: 1
            }).exec(function (err, menu1) {
                query = $.parseJSON('{"type": {"$in": ["post", "term", "page"]}, "params.trinh-don-2.tool": "menu", "language": "'+req.params.lang+'"}');
                $.getModel('Content', 'index', $).getContentsOpts(query, {"params.trinh-don-2.position": 1}, {
                    title: 1,
                    path: 1,
                    imgs: 1,
                    params: 1
                }).exec(function (err, menu2) {
                    $.getModel('Content', 'index', $).getAll({type: 'post', cats: $.ObjectId('5b437538efea3100040618db')}, {position: 1}, {
                        title: 1,
                        path: 1,
                        cats: 1,
                        imgs: 1,
                        params: 1
                    }).exec(function (err, places) {
                        query = $.parseJSON('{"type": {"$in": ["post", "term", "page"]}, "params.trinh-don-4.tool": "menu", "language": "'+req.params.lang+'"}');
                        $.getModel('Content', 'index', $).getContentsOpts(query, {"params.trinh-don-4.position": 1}, {
                            title: 1,
                            path: 1,
                            imgs: 1,
                            params: 1
                        }).exec(function (err, menu4) {
                            $.getModel('Content', 'index', $).getContentId($.ObjectId('5b692773bb24210004ded6d9')).exec(function (err, banner1) {
                                $.getModel('Cart', 'index', $).getCartId($.ObjectId(req.params.id)).exec(function (err, cart) {
                                    req.query.code = cart.md5;
                                    if(!cart.params.hasOwnProperty('ket-thuc-thanh-toan'))
                                    {
                                        cart.params['ket-thuc-thanh-toan'] = {detail: true};
                                        if(req.query.response_code == '00')
                                            cart.live = true;
                                        $.getModel('Cart', 'index', $).editCart(cart);
                                    }
                                    res.render('Cart/View/Layout/success', {
                                        $: $,
                                        req: req,
                                        res: res,
                                        path: 'thanh-toan-thanh-cong',
                                        page: 'success',
                                        template: 'success',
                                        language: language,
                                        menu1: menu1,
                                        menu2: menu2,
                                        menu4: menu4,
                                        banner1: banner1,
                                        places: places,
                                        query: req.query
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    return {
        iScan: iScan,
        iUseTicket: iUseTicket,
        iAddCart: iAddCart,
        infoBuy: infoBuy,
        iAddToPlaylist: iAddToPlaylist,
        iGetSongsOfPlaylist: iGetSongsOfPlaylist,
        iEditSongsOfPlaylist: iEditSongsOfPlaylist,
        iDelSongOfPlaylist: iDelSongOfPlaylist,
        iGetPlaylists: iGetPlaylists,
        iAddPlaylist: iAddPlaylist,
        iEditPlaylist: iEditPlaylist,
        iDelPlaylist: iDelPlaylist,
        index: index,
        book: book,
        acceptBook: acceptBook,
        payment: payment,
        active: active,
        success: success,
        scanQr: scanQr
    };
};