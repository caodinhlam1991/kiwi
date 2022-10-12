exports.controller = function($, req, res){
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
    var iGetMyCoins = function(data){
        $.getModel('People', 'index', $).getPeopleId($.ObjectId(data.people._id), function (people) {
            if(people!=null)
                $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(people._id), function (coin) {
                    if(coin != null)
                    {
                        if(people.deco == undefined)
                        {
                            people.deco = $.md5(coin._id+coin.coin+coin.wid+coin.date);
                            delete people._id;
                            $.getModel('People', 'index', $).editPeopleId($.ObjectId(coin.wid), people, function (dt) {
                                $.return(data, coin.coin);
                            });
                        }
                        else
                        {
                            if($.md5(coin._id+coin.coin+coin.wid+coin.date) == people.deco)
                            {
                                if(parseInt(coin.getedFree.split('-')[2])<parseInt($.dateTimeObj.getDateNow().split('-')[2]) || parseInt(coin.getedFree.split('-')[1])<parseInt($.dateTimeObj.getDateNow().split('-')[1]))
                                    coin.getedFree = false;
                                if(coin.getedFree == false)
                                {
                                    coin.had = {
                                        coin: coin.coin,
                                        shared: coin.shared,
                                        getedFree: coin.getedFree,
                                        gifted: coin.gifted
                                    };
                                    if(coin.coin<0)
                                        coin.coin = 0;
                                    coin.date = new Date($.dateTimeObj.getNow());
                                    coin.getedFree = $.dateTimeObj.getDateNow();
                                    coin.shared = 0;
                                    $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                                        people.deco = $.md5(coin._id+coin.coin+coin.wid+coin.date);
                                        delete people._id;
                                        $.getModel('People', 'index', $).editPeopleId($.ObjectId(coin.wid), people, function (dt) {
                                            $.return(data, coin.coin);
                                        });
                                    });
                                }
                                else
                                {
                                    
                                    $.return(data, coin.coin);
                                }
                            }
                            else
                            {
                                if(coin.coin>30000)
                                    $.return(data, coin.coin);
                                else
                                {
                                    if(parseInt(coin.getedFree.split('-')[2])<parseInt($.dateTimeObj.getDateNow().split('-')[2]) || parseInt(coin.getedFree.split('-')[1])<parseInt($.dateTimeObj.getDateNow().split('-')[1]))
                                        coin.getedFree = false;
                                    if(coin.getedFree == false)
                                    {
                                        coin.had = {
                                            coin: coin.coin,
                                            shared: coin.shared,
                                            getedFree: coin.getedFree,
                                            gifted: coin.gifted
                                        };
                                        if(coin.coin<0)
                                            coin.coin = 0;
                                        coin.date = new Date($.dateTimeObj.getNow());
                                        coin.getedFree = $.dateTimeObj.getDateNow();
                                        coin.shared = 0;
                                        $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                                            people.deco = $.md5(coin._id+coin.coin+coin.wid+coin.date);
                                            delete people._id;
                                            $.getModel('People', 'index', $).editPeopleId($.ObjectId(coin.wid), people, function (dt) {
                                                $.return(data, coin.coin);
                                            });
                                        });
                                    }
                                    else
                                        $.return(data, coin.coin);
                                }
                            }
                        }
                    }
                    else
                        if(people.deco == undefined)
                        {
                            coin = {};
                            coin.wid = $.ObjectId(people._id);
                            coin.coin = 20000;
                            coin.had = null;
                            coin.date = new Date($.dateTimeObj.getNow());
                            coin.getedFree = $.dateTimeObj.getDateNow();
                            coin.shared = 20;
                            $.getModel('Coin', 'index', $).addCoin(coin, function (cdt) {
                                people.deco = $.md5(coin._id+coin.coin+coin.wid+coin.date);
                                delete people._id;
                                $.getModel('People', 'index', $).editPeopleId($.ObjectId(coin.wid), people, function (dt) {
                                    $.return(data, coin.coin);
                                });
                            });
                        }
                        else
                            $.return(data, 0);
                });
            else
                $.return(data, 'logout');
        });
    };
    return {
        iGetMyCoins: iGetMyCoins,
        index: index,
        iSGift: function(data){
            $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.people._id), function (coin) {
                $.getModel('Content', 'index', $).getAll({type: 'post', $or:[{wid: $.ObjectId(data.people._id)}, {'params.address': data.people.pead}], cats: $.ObjectId('628d7e78e49a440004efc9ce')}, {date: -1}, {_id: 1}, function (docs) {
                    if(docs.length>=15 && coin.coin >= data.params.sGift && docs.length*10000 >= $.done(coin.gifted, 0)+data.params.sGift)
                    {
                        coin.had = {
                            coin: coin.coin,
                            shared: coin.shared,
                            getedFree: coin.getedFree,
                            gifted: $.done(coin.gifted, 0)
                        };
                        coin.coin = coin.coin - data.params.sGift;
                        if(coin.hasOwnProperty('gifted'))
                            coin.gifted += data.params.sGift;
                        else
                            coin.gifted = data.params.sGift;
                        coin.date = new Date($.dateTimeObj.getNow());
                        $.getModel('Coin', 'index', $).editCoin(coin, function (dt) {
                            $.getModel('Coin', 'index', $).getCoinsPeopleId($.ObjectId(data.params.adId), function (watts2) {
                                watts2.coin = watts2.coin + data.params.sGift;
                                watts2.date = new Date($.dateTimeObj.getNow());
                                $.getModel('Coin', 'index', $).editCoin(watts2, function (dt) {
                                    $.return(data, {isGift: true, coin: coin.coin, gifted: coin.gifted});
                                });
                            });
                        });
                    }
                    else
                        $.return(data, {isGift : false});
                });
            });
        }
    };
};